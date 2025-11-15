// ============= Navbar.js =============
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStore, FaBars } from 'react-icons/fa';
import { useState } from 'react';

function Navbar({ cartCount }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <FaStore className="me-2" style={{ fontSize: '28px', color: 'var(--primary)' }} />
                    <span className="fw-bold fs-4 gradient-text">TechLux TechLus</span>
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FaBars />
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link px-3 fw-semibold" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3 fw-semibold" to="/shop">Shop</Link>
                        </li>
                    </ul>

                    <div className="d-flex gap-3">
                        <Link to="/wishlist" className="icon-btn">
                            <FaHeart />
                        </Link>
                        <Link to="/cart" className="icon-btn position-relative">
                            <FaShoppingCart />
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
