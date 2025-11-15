pipeline{
    agent any
    
    options {
        // Prevent concurrent builds
        disableConcurrentBuilds()
    }
    
    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'COMMIT_MESSAGE', value: '$.head_commit.message'],
                [key: 'PUSHER_NAME', value: '$.pusher.name']
            ],
            causeString: 'Triggered by $PUSHER_NAME',
            token: 'ecommerce-build-trigger-2024',
            printContributedVariables: true,
            printPostContent: false,
            silentResponse: false,
            regexpFilterText: '$COMMIT_MESSAGE',
            regexpFilterExpression: '^((?!\\[ci skip\\]|\\[skip ci\\]).)*$'
        )
    }
    
    stages {
        stage('Git checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/senjaliyadhruv/ecommerce.git'
            }
        }
        
        stage('Build Image'){
            steps{
                dir('frontend'){
                    sh 'docker build -t dhruv1204/frontend:${BUILD_NUMBER} .'
                }
                dir('backend'){
                    sh 'docker build -t dhruv1204/backend:${BUILD_NUMBER} .'
                }
            }
        }
        
        stage('Docker Login & image Push'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'dockerHub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]){
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh 'docker push ${DOCKER_USER}/frontend:${BUILD_NUMBER}'
                    sh 'docker push ${DOCKER_USER}/backend:${BUILD_NUMBER}'
                }
            }
        }
        
        stage('Update manifests') {
            steps {
                script {
                    dir('kubernetes'){
                        sh """
                        sed -i -e s#dhruv1204/backend.*#dhruv1204/backend:${BUILD_NUMBER}#g backend-deployment.yaml
                        sed -i -e s#dhruv1204/frontend.*#dhruv1204/frontend:${BUILD_NUMBER}#g frontend-deployment.yaml
                        """
                    }
                }
            }
        }
        
        stage('Commit & push') {
            steps {
                withCredentials([gitUsernamePassword(credentialsId: 'github-cred', gitToolName: 'Default')]) {
                    sh '''
                    git config user.email "jenkins@example.com"
                    git config user.name "Jenkins CI"
                    
                    git status
                    git add kubernetes/
                    git commit -m "Updated deployment image tags to build number ${BUILD_NUMBER} [ci skip]" || echo "No changes to commit"
                    git push origin HEAD:main
                    '''
                }
            }
        }
    }
    
    post {
        success { 
            echo "CD finished — manifests updated and pushed with tag ${BUILD_NUMBER}." 
        }
        failure { 
            echo "CD failed — check console output." 
        }
    }
}
