import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaSearch, FaFilter, FaTh, FaThList } from 'react-icons/fa';

const API_URL = 'http://54.146.193.153:5000/api';

function Shop({ addToCart, addToWishlist, isInWishlist }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [viewMode, setViewMode] = useState('grid');
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [selectedCategory, searchTerm, sortBy, priceRange]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            setCategories(['all', ...response.data.map(c => c.category)]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                category: selectedCategory !== 'all' ? selectedCategory : undefined,
                search: searchTerm || undefined,
                sort: sortBy,
                min_price: priceRange[0],
                max_price: priceRange[1]
            };
            const response = await axios.get(`${API_URL}/products`, { params });
            setProducts(response.data);
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
        <div className="shop-page">
            {toast && <div className="toast">{toast}</div>}

            <div className="container py-5">
                {/* Page Header */}
                <div className="mb-5">
                    <h1 className="display-4 fw-bold mb-3">Shop All Products</h1>
                    <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                        Discover amazing products at unbeatable prices
                    </p>
                </div>

                <div className="row">
                    {/* Sidebar Filters */}
                    <div className="col-lg-3 mb-4">
                        <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
                            <h5 className="fw-bold mb-4">
                                <FaFilter className="me-2" /> Filters
                            </h5>

                            {/* Search */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Search</label>
                                <div className="search-container">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)',
                                            paddingRight: '40px'
                                        }}
                                    />
                                    <FaSearch style={{
                                        position: 'absolute',
                                        right: '15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-secondary)'
                                    }} />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Category</label>
                                <div className="d-flex flex-column gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`filter-chip text-start ${selectedCategory === category ? 'active' : ''}`}
                                            style={{ textTransform: 'capitalize' }}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                                </label>
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max="3000"
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    style={{ accentColor: 'var(--primary)' }}
                                />
                            </div>

                            {/* Sort By */}
                            <div>
                                <label className="form-label fw-semibold">Sort By</label>
                                <select
                                    className="form-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{
                                        background: 'var(--dark-bg)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <option value="id">Featured</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="rating">Rating</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="col-lg-9">
                        {/* Toolbar */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                                Showing <strong>{products.length}</strong> products
                            </p>
                            <div className="d-flex gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    style={{ background: viewMode === 'grid' ? 'var(--primary)' : 'var(--dark-card)' }}
                                >
                                    <FaTh />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`icon-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    style={{ background: viewMode === 'list' ? 'var(--primary)' : 'var(--dark-card)' }}
                                >
                                    <FaThList />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="row g-4">
                                {[...Array(6)].map((_, idx) => (
                                    <div key={idx} className={viewMode === 'grid' ? 'col-md-4' : 'col-12'}>
                                        <div className="skeleton" style={{ height: '400px' }}></div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="empty-state">
                                <FaSearch style={{ fontSize: '80px', color: 'var(--text-secondary)' }} />
                                <h3 className="mt-4">No products found</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className={`row g-4 ${viewMode === 'list' ? 'row-cols-1' : 'row-cols-1 row-cols-md-2 row-cols-lg-3'}`}>
                                {products.map((product, idx) => (
                                    <div key={product.id} className="col" style={{ animation: `fadeIn ${0.3 + idx * 0.05}s ease` }}>
                                        <div className={`product-card h-100 ${viewMode === 'list' ? 'd-flex flex-row' : ''}`}>
                                            {product.is_new && <div className="badge-new">NEW</div>}
                                            {product.discount_percentage > 0 && (
                                                <div className="badge-discount">-{product.discount_percentage}%</div>
                                            )}

                                            <Link to={`/product/${product.id}`} style={{ flex: viewMode === 'list' ? '0 0 300px' : 'auto' }}>
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    style={{ height: viewMode === 'list' ? '100%' : '280px' }}
                                                />
                                            </Link>

                                            <div className="p-3" style={{ flex: 1 }}>
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <span className="badge bg-secondary">{product.category}</span>
                                                    <button
                                                        onClick={() => handleAddToWishlist(product)}
                                                        className="icon-btn"
                                                        style={{
                                                            background: isInWishlist(product.id) ? 'var(--danger)' : 'var(--dark-card)'
                                                        }}
                                                    >
                                                        <FaHeart style={{
                                                            color: isInWishlist(product.id) ? 'white' : 'var(--text-secondary)'
                                                        }} />
                                                    </button>
                                                </div>

                                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                                    <h5 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                                        {product.name}
                                                    </h5>
                                                </Link>

                                                {viewMode === 'list' && (
                                                    <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                                                        {product.description.substring(0, 150)}...
                                                    </p>
                                                )}

                                                <div className="rating mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            style={{
                                                                color: i < Math.floor(product.rating)
                                                                    ? 'var(--warning)'
                                                                    : 'var(--dark-hover)'
                                                            }}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;