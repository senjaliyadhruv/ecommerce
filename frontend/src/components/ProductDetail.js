import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-5">Product not found</div>;
    }

    return (
        <div className="container py-4">
            <Link to="/" className="btn btn-link mb-3">
                &larr; Back to Products
            </Link>
            <div className="card shadow-sm">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="img-fluid rounded-start"
                            style={{ height: '300px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p className="card-text text-muted">{product.description}</p>
                            <p className="text-primary fw-bold fs-4">${product.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;