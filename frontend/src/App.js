import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} addToWishlist={addToWishlist} isInWishlist={isInWishlist} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} addToWishlist={addToWishlist} isInWishlist={isInWishlist} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} addToWishlist={addToWishlist} isInWishlist={isInWishlist} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;