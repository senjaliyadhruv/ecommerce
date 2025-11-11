import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            background: 'linear-gradient(180deg, var(--dark-bg) 0%, #0a0e1a 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            marginTop: '80px'
        }}>
            <div className="container py-5">
                <div className="row g-4">
                    {/* Brand Section */}
                    <div className="col-lg-4 col-md-6">
                        <h4 className="fw-bold mb-3 gradient-text">TechLux</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Your premier destination for cutting-edge electronics, fashion, and lifestyle products.
                            Quality products at unbeatable prices.
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            {[
                                { icon: <FaFacebook />, link: '#' },
                                { icon: <FaTwitter />, link: '#' },
                                { icon: <FaInstagram />, link: '#' },
                                { icon: <FaLinkedin />, link: '#' }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.link}
                                    className="icon-btn"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Shop', path: '/shop' },
                                { name: 'Cart', path: '/cart' },
                                { name: 'Wishlist', path: '/wishlist' }
                            ].map((link, idx) => (
                                <li key={idx} className="mb-2">
                                    <Link
                                        to={link.path}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3">Customer Service</h5>
                        <ul className="list-unstyled">
                            {[
                                'About Us',
                                'Contact Us',
                                'Shipping Policy',
                                'Returns & Refunds',
                                'Privacy Policy',
                                'Terms & Conditions'
                            ].map((item, idx) => (
                                <li key={idx} className="mb-2">
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                                    >
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-start">
                                <FaMapMarkerAlt className="me-3 mt-1" style={{ color: 'var(--primary)' }} />
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    123 Commerce Street, Suite 100<br />
                                    San Francisco, CA 94102
                                </span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <FaPhone className="me-3" style={{ color: 'var(--primary)' }} />
                                <a
                                    href="tel:+11234567890"
                                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                                >
                                    +1 (123) 456-7890
                                </a>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <FaEnvelope className="me-3" style={{ color: 'var(--primary)' }} />
                                <a
                                    href="mailto:support@techlux.com"
                                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                                >
                                    support@techlux.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '40px 0 20px' }} />

                {/* Bottom Bar */}
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                            © {currentYear} TechLux. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="PayPal"
                            style={{ height: '30px', marginRight: '15px', opacity: '0.7' }}
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                            alt="Visa"
                            style={{ height: '30px', marginRight: '15px', opacity: '0.7' }}
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                            alt="Mastercard"
                            style={{ height: '30px', opacity: '0.7' }}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;