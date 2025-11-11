import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const API_URL = 'http://34.66.149.113:5000/api';

function Checkout({ cart, clearCart }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            user_name: formData.user_name,
            user_email: formData.user_email,
            user_phone: formData.user_phone,
            shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
            total_amount: total,
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            await axios.post(`${API_URL}/orders`, orderData);
            setOrderPlaced(true);
            clearCart();
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        }
    };

    if (orderPlaced) {
        return (
            <div className="container py-5">
                <div className="text-center" style={{ animation: 'fadeIn 0.5s ease' }}>
                    <FaCheckCircle style={{ fontSize: '100px', color: 'var(--success)' }} />
                    <h1 className="display-4 fw-bold mt-4 mb-3">Order Placed Successfully!</h1>
                    <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                        Thank you for your purchase. You'll receive a confirmation email shortly.
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>Redirecting to home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="display-5 fw-bold mb-5">Checkout</h1>

            <div className="row g-5">
                <div className="col-lg-7">
                    <div className="glass-card p-4">
                        <h4 className="fw-bold mb-4">Shipping Information</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Full Name"
                                        required
                                        value={formData.user_name}
                                        onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        required
                                        value={formData.user_email}
                                        onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg"
                                        placeholder="Phone"
                                        required
                                        value={formData.user_phone}
                                        onChange={(e) => setFormData({ ...formData, user_phone: e.target.value })}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Address"
                                        required
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="City"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="State"
                                        required
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="ZIP"
                                        required
                                        value={formData.zip}
                                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                        style={{
                                            background: 'var(--dark-bg)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
                                Place Order - ${total.toFixed(2)}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
                        <h4 className="fw-bold mb-4">Order Summary</h4>

                        <div className="mb-4">
                            {cart.map(item => (
                                <div key={item.id} className="d-flex justify-content-between mb-3 pb-3" style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <div className="d-flex gap-3">
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <div>
                                            <div className="fw-semibold">{item.name}</div>
                                            <small style={{ color: 'var(--text-secondary)' }}>
                                                Qty: {item.quantity}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                        <div className="d-flex justify-content-between mb-3">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Shipping</span>
                            <span className="text-success fw-bold">FREE</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Tax</span>
                            <span>${(total * 0.1).toFixed(2)}</span>
                        </div>

                        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                        <div className="d-flex justify-content-between">
                            <strong className="fs-4">Total</strong>
                            <strong className="fs-4 price">${(total * 1.1).toFixed(2)}</strong>
                        </div>

                        <div className="alert alert-info mt-4 mb-0" style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid var(--primary)',
                            color: 'var(--text-primary)',
                            borderRadius: '12px'
                        }}>
                            <small>🔒 Secure checkout. Your information is protected.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;