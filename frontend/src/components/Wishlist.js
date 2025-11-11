// ============= Wishlist.js =============
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';

function Wishlist({ wishlist, removeFromWishlist, addToCart }) {
    if (wishlist.length === 0) {
        return (
            <div className="container py-5">
                <div className="empty-state">
                    <FaHeart style={{ fontSize: '100px', color: 'var(--text-secondary)' }} />
                    <h2 className="mt-4">Your wishlist is empty</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Save items you love!</p>
                    <Link to="/shop" className="btn btn-primary mt-3">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="display-5 fw-bold mb-5">My Wishlist</h1>

            <div className="row g-4">
                {wishlist.map(item => (
                    <div key={item.id} className="col-md-6 col-lg-4">
                        <div className="product-card h-100">
                            <Link to={`/product/${item.id}`}>
                                <img src={item.image_url} alt={item.name} />
                            </Link>

                            <div className="p-3">
                                <span className="badge bg-secondary mb-2">{item.category}</span>
                                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <h5 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                                        {item.name}
                                    </h5>
                                </Link>

                                <div className="price mb-3">${item.price}</div>

                                <div className="d-flex gap-2">
                                    <button
                                        onClick={() => {
                                            addToCart(item);
                                            removeFromWishlist(item.id);
                                        }}
                                        className="btn btn-primary flex-grow-1"
                                    >
                                        <FaShoppingCart className="me-2" /> Add to Cart
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="btn btn-outline-danger"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;