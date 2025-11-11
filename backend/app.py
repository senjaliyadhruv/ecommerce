from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# Get all products with filtering, sorting, and search
@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor(dictionary=True)
    
    # Get query parameters
    category = request.args.get('category')
    search = request.args.get('search')
    sort_by = request.args.get('sort', 'id')
    order = request.args.get('order', 'ASC')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    
    # Build query
    query = 'SELECT * FROM products WHERE 1=1'
    params = []
    
    if category and category != 'all':
        query += ' AND category = %s'
        params.append(category)
    
    if search:
        query += ' AND (name LIKE %s OR description LIKE %s)'
        search_term = f'%{search}%'
        params.extend([search_term, search_term])
    
    if min_price:
        query += ' AND price >= %s'
        params.append(float(min_price))
    
    if max_price:
        query += ' AND price <= %s'
        params.append(float(max_price))
    
    # Add sorting
    valid_sorts = ['id', 'name', 'price', 'rating', 'created_at']
    if sort_by in valid_sorts:
        query += f' ORDER BY {sort_by} {order}'
    
    cursor.execute(query, params)
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(products)

# Get single product with reviews
@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM products WHERE id = %s', (id,))
    product = cursor.fetchone()
    
    if product:
        # Get reviews for this product
        cursor.execute('SELECT * FROM reviews WHERE product_id = %s ORDER BY created_at DESC', (id,))
        reviews = cursor.fetchall()
        product['reviews'] = reviews
    
    cursor.close()
    conn.close()
    
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

# Get all categories
@app.route('/api/categories', methods=['GET'])
def get_categories():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT DISTINCT category FROM products ORDER BY category')
    categories = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(categories)

# Add review
@app.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.json
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor()
    query = '''INSERT INTO reviews (product_id, username, rating, comment, created_at) 
               VALUES (%s, %s, %s, %s, %s)'''
    values = (data['product_id'], data['username'], data['rating'], 
              data['comment'], datetime.now())
    
    try:
        cursor.execute(query, values)
        conn.commit()
        
        # Update product rating
        cursor.execute('''
            UPDATE products 
            SET rating = (SELECT AVG(rating) FROM reviews WHERE product_id = %s),
                review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = %s)
            WHERE id = %s
        ''', (data['product_id'], data['product_id'], data['product_id']))
        conn.commit()
        
        cursor.close()
        conn.close()
        return jsonify({'message': 'Review added successfully'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500

# Get featured/trending products
@app.route('/api/products/featured', methods=['GET'])
def get_featured_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM products WHERE is_featured = 1 ORDER BY rating DESC LIMIT 8')
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(products)

# Add to wishlist
@app.route('/api/wishlist', methods=['POST'])
def add_to_wishlist():
    data = request.json
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor()
    query = 'INSERT INTO wishlist (user_id, product_id, created_at) VALUES (%s, %s, %s)'
    
    try:
        cursor.execute(query, (data['user_id'], data['product_id'], datetime.now()))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Added to wishlist'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500

# Get wishlist
@app.route('/api/wishlist/<int:user_id>', methods=['GET'])
def get_wishlist(user_id):
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor(dictionary=True)
    query = '''
        SELECT p.* FROM products p
        INNER JOIN wishlist w ON p.id = w.product_id
        WHERE w.user_id = %s
    '''
    cursor.execute(query, (user_id,))
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(products)

# Create order
@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor()
    
    # Insert order
    order_query = '''INSERT INTO orders 
                     (user_name, user_email, user_phone, shipping_address, 
                      total_amount, status, created_at) 
                     VALUES (%s, %s, %s, %s, %s, %s, %s)'''
    order_values = (data['user_name'], data['user_email'], data['user_phone'],
                   data['shipping_address'], data['total_amount'], 'pending',
                   datetime.now())
    
    try:
        cursor.execute(order_query, order_values)
        order_id = cursor.lastrowid
        
        # Insert order items
        for item in data['items']:
            item_query = '''INSERT INTO order_items 
                           (order_id, product_id, quantity, price) 
                           VALUES (%s, %s, %s, %s)'''
            cursor.execute(item_query, (order_id, item['product_id'], 
                                       item['quantity'], item['price']))
        
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Order created successfully', 'order_id': order_id}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 500

# Newsletter subscription
@app.route('/api/newsletter', methods=['POST'])
def subscribe_newsletter():
    data = request.json
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = conn.cursor()
    query = 'INSERT INTO newsletter (email, subscribed_at) VALUES (%s, %s)'
    
    try:
        cursor.execute(query, (data['email'], datetime.now()))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Subscribed successfully'}), 201
    except Error as e:
        return jsonify({'error': 'Email already subscribed or invalid'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)