import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaArrowRight, FaFire, FaBolt, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';

const API_URL = 'http://34.66.149.113:5000/api';

function Home({ addToCart, addToWishlist, isInWishlist }) {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/featured`);
            setFeaturedProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        showToast('Added to cart! 🎉');
    };

    const handleAddToWishlist = (product) => {
        addToWishlist(product);
        showToast('Added to wishlist! ❤️');
    };

    return (
        <div className="home-page">
            {toast && <div className="toast">{toast}</div>}

            {/* Hero Section */}
            <section className="hero-section py-5" style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h1 className="display-3 fw-bold mb-4" style={{ animation: 'fadeIn 0.6s ease' }}>
                                Discover <span className="gradient-text">Premium</span><br />
                                Tech & Lifestyle
                            </h1>
                            <p className="lead mb-4" style={{ color: 'var(--text-secondary)', animation: 'fadeIn 0.8s ease' }}>
                                Elevate your everyday with our curated selection of cutting-edge electronics, fashion, and home essentials.
                            </p>
                            <div className="d-flex gap-3" style={{ animation: 'fadeIn 1s ease' }}>
                                <Link to="/shop" className="btn btn-primary btn-lg">
                                    Shop Now <FaArrowRight className="ms-2" />
                                </Link>
                                <Link to="/shop" className="btn btn-outline btn-lg">
                                    Explore Deals
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div style={{ animation: 'float 3s ease-in-out infinite' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
                                    alt="Hero"
                                    className="img-fluid rounded-4"
                                    style={{ boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5" style={{ background: 'var(--dark-bg)' }}>
                <div className="container">
                    <div className="row g-4">
                        {[
                            { icon: <FaTruck />, title: 'Free Shipping', desc: 'On orders over $50' },
                            { icon: <FaShieldAlt />, title: 'Secure Payment', desc: '100% protected' },
                            { icon: <FaUndo />, title: 'Easy Returns', desc: '30-day guarantee' },
                            { icon: <FaBolt />, title: 'Fast Delivery', desc: '2-3 business days' }
                        ].map((feature, idx) => (
                            <div key={idx} className="col-md-6 col-lg-3">
                                <div className="glass-card p-4 text-center h-100" style={{ animation: `fadeIn ${0.5 + idx * 0.1}s ease` }}>
                                    <div className="fs-1 mb-3" style={{ color: 'var(--primary)' }}>
                                        {feature.icon}
                                    </div>
                                    <h5 className="fw-bold mb-2">{feature.title}</h5>
                                    <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-5">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <div>
                            <h2 className="display-5 fw-bold mb-2">
                                <FaFire className="me-3" style={{ color: 'var(--danger)' }} />
                                Trending Now
                            </h2>
                            <p style={{ color: '#a0aec0' }}>Discover our most popular products</p>
                        </div>
                        <Link to="/shop" className="btn btn-outline d-none d-md-block">
                            View All <FaArrowRight className="ms-2" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="row g-4">
                            {[...Array(4)].map((_, idx) => (
                                <div key={idx} className="col-md-6 col-lg-3">
                                    <div className="skeleton" style={{ height: '400px' }}></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="row g-4">
                            {featuredProducts.slice(0, 8).map((product, idx) => (
                                <div key={product.id} className="col-md-6 col-lg-3" style={{ animation: `fadeIn ${0.3 + idx * 0.1}s ease` }}>
                                    <div className="product-card h-100">
                                        {product.is_new && <div className="badge-new">NEW</div>}
                                        {product.discount_percentage > 0 && (
                                            <div className="badge-discount">-{product.discount_percentage}%</div>
                                        )}

                                        <Link to={`/product/${product.id}`}>
                                            <img src={product.image_url} alt={product.name} />
                                        </Link>

                                        <div className="p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <span className="badge bg-secondary">{product.category}</span>
                                                <button
                                                    onClick={() => handleAddToWishlist(product)}
                                                    className="icon-btn"
                                                    style={{ background: isInWishlist(product.id) ? 'var(--danger)' : 'var(--dark-card)' }}
                                                >
                                                    <FaHeart style={{ color: isInWishlist(product.id) ? 'white' : 'var(--text-secondary)' }} />
                                                </button>
                                            </div>

                                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                                <h5 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                                    {product.name}
                                                </h5>
                                            </Link>

                                            <div className="rating mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        style={{ color: i < Math.floor(product.rating) ? 'var(--warning)' : 'var(--dark-hover)' }}
                                                    />
                                                ))}
                                                <span className="ms-2" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                                    ({product.review_count})
                                                </span>
                                            </div>

                                            <div className="d-flex align-items-center mb-3">
                                                {product.original_price && (
                                                    <span className="original-price">${product.original_price}</span>
                                                )}
                                                <span className="price">${product.price}</span>
                                            </div>

                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="btn btn-primary w-100"
                                            >
                                                <FaShoppingCart className="me-2" /> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-5">
                        <Link to="/shop" className="btn btn-primary btn-lg">
                            Explore More Products <FaArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-5" style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="display-5 fw-bold mb-3">Stay Updated</h2>
                            <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Subscribe to get special offers, free giveaways, and exclusive deals
                            </p>
                            <div className="input-group input-group-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    style={{
                                        background: 'var(--dark-card)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                                <button className="btn btn-primary px-4">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;