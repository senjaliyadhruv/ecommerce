import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://54.146.193.153:5000/api/products')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container py-4">
            <h1 className="text-center mb-5 fw-bold">Our Products</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {products.map((product) => (
                    <div key={product.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-muted">
                                    {product.description.substring(0, 100)}...
                                </p>
                                <p className="text-primary fw-bold">${product.price}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="btn btn-primary"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
