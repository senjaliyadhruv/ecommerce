import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaArrowLeft, FaCheck, FaTruck } from 'react-icons/fa';

const API_URL = 'http://35.175.194.113:5000/api';

function ProductDetail({ addToCart, addToWishlist, isInWishlist }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [reviewForm, setReviewForm] = useState({ username: '', rating: 5, comment: '' });

    const fetchProduct = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        showToast('Added to cart! 🎉');
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/reviews`, {
                product_id: id,
                ...reviewForm
            });
            showToast('Review submitted! ⭐');
            fetchProduct();
            setReviewForm({ username: '', rating: 5, comment: '' });
        } catch (error) {
            showToast('Error submitting review');
        }
    };

    if (loading) {
        return <div className="container py-5"><div className="skeleton" style={{ height: '600px' }}></div></div>;
    }

    if (!product) {
        return <div className="container py-5 text-center"><h3>Product not found</h3></div>;
    }

    const specs = product.specifications ? JSON.parse(product.specifications) : {};

    return (
        <div className="product-detail-page">
            {toast && <div className="toast">{toast}</div>}

            <div className="container py-5">
                <Link to="/shop" className="btn btn-outline mb-4">
                    <FaArrowLeft className="me-2" /> Back to Shop
                </Link>

                <div className="row g-5">
                    {/* Product Image */}
                    <div className="col-lg-6">
                        <div className="glass-card p-4">
                            {product.is_new && <div className="badge-new">NEW</div>}
                            {product.discount_percentage > 0 && (
                                <div className="badge-discount">-{product.discount_percentage}%</div>
                            )}
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="img-fluid rounded-3"
                                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <span className="badge bg-secondary mb-3">{product.category}</span>
                            {product.brand && (
                                <span className="badge bg-dark ms-2">{product.brand}</span>
                            )}
                        </div>

                        <h1 className="display-5 fw-bold mb-3">{product.name}</h1>

                        <div className="rating mb-3">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    style={{
                                        color: i < Math.floor(product.rating) ? 'var(--warning)' : 'var(--dark-hover)',
                                        fontSize: '24px'
                                    }}
                                />
                            ))}
                            <span className="ms-2" style={{ color: 'var(--text-secondary)' }}>
                                {product.rating} ({product.review_count} reviews)
                            </span>
                        </div>

                        <div className="mb-4">
                            {product.original_price && (
                                <span className="original-price fs-4">${product.original_price}</span>
                            )}
                            <span className="price" style={{ fontSize: '42px' }}>${product.price}</span>
                        </div>

                        <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
                            {product.description}
                        </p>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span className="fw-bold fs-5">{quantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }}>
                                <FaCheck className="me-2" style={{ color: 'var(--success)' }} />
                                {product.stock} in stock
                            </span>
                        </div>

                        <div className="d-flex gap-3 mb-4">
                            <button onClick={handleAddToCart} className="btn btn-primary btn-lg flex-grow-1">
                                <FaShoppingCart className="me-2" /> Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    addToWishlist(product);
                                    showToast('Added to wishlist! ❤️');
                                }}
                                className="btn btn-outline-danger btn-lg"
                            >
                                <FaHeart />
                            </button>
                        </div>

                        <div className="glass-card p-3">
                            <FaTruck className="me-2" style={{ color: 'var(--accent)' }} />
                            <strong>Free Shipping</strong> on orders over $50
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-5">
                    <ul className="nav nav-tabs border-0 mb-4">
                        {['description', 'specifications', 'reviews'].map(tab => (
                            <li key={tab} className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                        border: 'none',
                                        color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                                        borderRadius: '12px',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="glass-card p-4">
                        {activeTab === 'description' && (
                            <div>
                                <h4 className="fw-bold mb-3">Product Description</h4>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div>
                                <h4 className="fw-bold mb-3">Technical Specifications</h4>
                                <div className="row g-3">
                                    {Object.entries(specs).map(([key, value]) => (
                                        <div key={key} className="col-md-6">
                                            <div className="d-flex justify-content-between p-3" style={{
                                                background: 'var(--dark-bg)',
                                                borderRadius: '8px'
                                            }}>
                                                <strong style={{ textTransform: 'capitalize' }}>
                                                    {key.replace(/_/g, ' ')}
                                                </strong>
                                                <span style={{ color: 'var(--text-secondary)' }}>
                                                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h4 className="fw-bold mb-4">Customer Reviews</h4>

                                {/* Review Form */}
                                <div className="mb-5 p-4" style={{ background: 'var(--dark-bg)', borderRadius: '12px' }}>
                                    <h5 className="mb-3">Write a Review</h5>
                                    <form onSubmit={handleSubmitReview}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Name"
                                                value={reviewForm.username}
                                                onChange={(e) => setReviewForm({ ...reviewForm, username: e.target.value })}
                                                required
                                                style={{
                                                    background: 'var(--dark-card)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <select
                                                className="form-select"
                                                value={reviewForm.rating}
                                                onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                                                style={{
                                                    background: 'var(--dark-card)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            >
                                                {[5, 4, 3, 2, 1].map(n => (
                                                    <option key={n} value={n}>{n} Stars</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                placeholder="Your Review"
                                                value={reviewForm.comment}
                                                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                required
                                                style={{
                                                    background: 'var(--dark-card)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    color: 'var(--text-primary)'
                                                }}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit Review</button>
                                    </form>
                                </div>

                                {/* Reviews List */}
                                <div className="row g-3">
                                    {product.reviews && product.reviews.map(review => (
                                        <div key={review.id} className="col-12">
                                            <div className="p-4" style={{
                                                background: 'var(--dark-bg)',
                                                borderRadius: '12px'
                                            }}>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <strong>{review.username}</strong>
                                                    <div className="rating">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <FaStar key={i} style={{ color: 'var(--warning)' }} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
