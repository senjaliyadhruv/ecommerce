// ============= Cart.js =============
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';

function Cart({ cart, updateQuantity, removeFromCart }) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="container py-5">
                <div className="empty-state">
                    <FaShoppingBag style={{ fontSize: '100px', color: 'var(--text-secondary)' }} />
                    <h2 className="mt-4">Your cart is empty</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Add some products to get started!</p>
                    <Link to="/shop" className="btn btn-primary mt-3">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="display-5 fw-bold mb-5">Shopping Cart</h1>

            <div className="row g-4">
                <div className="col-lg-8">
                    {cart.map(item => (
                        <div key={item.id} className="glass-card p-4 mb-3">
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="img-fluid rounded-3"
                                        style={{ height: '120px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <h5 className="fw-bold mb-1">{item.name}</h5>
                                            <span className="badge bg-secondary">{item.category}</span>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="btn btn-outline-danger btn-sm"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div className="quantity-selector">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="fw-bold">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-lg-4">
                    <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
                        <h4 className="fw-bold mb-4">Order Summary</h4>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                        <div className="d-flex justify-content-between mb-4">
                            <strong className="fs-5">Total</strong>
                            <strong className="fs-5 price">${total.toFixed(2)}</strong>
                        </div>

                        <Link to="/checkout" className="btn btn-primary w-100 btn-lg mb-3">
                            Proceed to Checkout
                        </Link>

                        <Link to="/shop" className="btn btn-outline w-100">
                            Continue Shopping
                        </Link>

                        {subtotal < 50 && (
                            <div className="alert alert-info mt-3 mb-0" style={{
                                background: 'rgba(20, 184, 166, 0.1)',
                                border: '1px solid var(--accent)',
                                color: 'var(--accent)'
                            }}>
                                Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;