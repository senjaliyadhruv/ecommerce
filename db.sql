-- ============================================
-- TechLux E-Commerce Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS newsletter;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS products;

-- ============================================
-- Products Table
-- ============================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount_percentage INT DEFAULT 0,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    stock INT DEFAULT 100,
    rating DECIMAL(3, 2) DEFAULT 4.5,
    review_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT 0,
    is_new BOOLEAN DEFAULT 0,
    specifications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_rating (rating),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Reviews Table
-- ============================================
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    username VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Wishlist Table
-- ============================================
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Orders Table
-- ============================================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (user_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Order Items Table
-- ============================================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Newsletter Table
-- ============================================
CREATE TABLE newsletter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Insert Sample Products
-- ============================================

-- Electronics Category
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category, brand, stock, rating, review_count, is_featured, is_new, specifications) VALUES
('Sony WH-1000XM5 Headphones', 'Industry-leading noise cancellation with premium sound quality. 30-hour battery life and crystal-clear call quality. Multi-point connection allows seamless switching between devices.', 349.99, 399.99, 13, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'Electronics', 'Sony', 45, 4.8, 234, 1, 1, '{"battery": "30 hours", "wireless": true, "noise_cancellation": true, "weight": "250g", "bluetooth": "5.2"}'),

('iPhone 15 Pro Max', 'The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system with 5x optical zoom. Features the most powerful iPhone chip ever with console-quality gaming.', 1199.99, 1299.99, 8, 'https://images.unsplash.com/photo-1592286927505-c82d7a61d43e?w=800', 'Electronics', 'Apple', 28, 4.9, 567, 1, 1, '{"storage": "256GB", "camera": "48MP", "display": "6.7 inch", "chip": "A17 Pro", "5g": true}'),

('MacBook Pro 16"', 'Supercharged by M3 Max chip with stunning Liquid Retina XDR display. Perfect for creative professionals with up to 22 hours of battery life and advanced thermal architecture.', 2499.99, 2799.99, 11, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'Electronics', 'Apple', 15, 4.9, 423, 1, 1, '{"ram": "32GB", "storage": "1TB SSD", "display": "16.2 inch", "processor": "M3 Max", "ports": "Thunderbolt 4"}'),

('Samsung Galaxy Watch 6', 'Advanced health tracking with sleep coaching, body composition, and heart rate monitoring. Elegant design with customizable watch faces and fitness tracking features.', 299.99, 349.99, 14, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800', 'Electronics', 'Samsung', 67, 4.6, 189, 1, 0, '{"battery": "40 hours", "water_resistant": true, "display": "AMOLED", "sensors": "Advanced health", "gps": true}'),

('iPad Air M2', 'Powerful M2 chip with stunning 10.9-inch Liquid Retina display. Perfect for creativity and productivity with Apple Pencil and Magic Keyboard support.', 599.99, 699.99, 14, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', 'Electronics', 'Apple', 52, 4.8, 312, 1, 1, '{"storage": "128GB", "display": "10.9 inch", "chip": "M2", "pencil": "Apple Pencil support", "5g": true}'),

('Wireless Keyboard Pro', 'Mechanical switches with RGB backlighting. Bluetooth 5.0 with multi-device connectivity. Premium build quality with aluminum frame and PBT keycaps.', 89.99, 119.99, 25, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', 'Electronics', 'TechKeys', 76, 4.7, 289, 0, 1, '{"switches": "Mechanical", "rgb": true, "battery": "2000mAh", "connectivity": "Bluetooth 5.0", "hotswap": true}'),

('4K Webcam Pro', 'Professional 4K streaming camera with auto-focus and built-in stereo microphones. Perfect for content creators with advanced light correction and background blur.', 129.99, 159.99, 19, 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800', 'Electronics', 'StreamTech', 58, 4.8, 234, 1, 1, '{"resolution": "4K 30fps", "fov": "90 degrees", "autofocus": true, "microphone": "Stereo", "mount": "Universal"}'),

('Gaming Mouse RGB', 'Professional gaming mouse with 16000 DPI sensor and customizable RGB lighting. 8 programmable buttons with ergonomic design for extended gaming sessions.', 69.99, 89.99, 22, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800', 'Electronics', 'GamePro', 112, 4.6, 456, 0, 0, '{"dpi": "16000", "buttons": "8", "rgb": true, "polling_rate": "1000Hz", "weight": "95g"}');

-- Fashion Category
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category, brand, stock, rating, review_count, is_featured, is_new, specifications) VALUES
('Premium Leather Jacket', 'Genuine leather jacket with modern fit. Timeless style meets contemporary design for any occasion. Features YKK zippers and quilted lining for comfort.', 189.99, 249.99, 24, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 'Fashion', 'StyleCraft', 34, 4.7, 156, 1, 0, '{"material": "Genuine Leather", "fit": "Modern", "care": "Professional clean", "lining": "Quilted"}'),

('Designer Sunglasses', 'UV400 protection with polarized lenses. Fashion-forward design with lightweight titanium frame. Comes with premium case and cleaning cloth.', 159.99, 199.99, 20, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', 'Fashion', 'LuxVision', 89, 4.5, 203, 0, 0, '{"uv_protection": "UV400", "material": "Titanium", "lens": "Polarized", "warranty": "2 years"}'),

('Luxury Watch Collection', 'Swiss movement with sapphire crystal and stainless steel band. Water-resistant to 100m with date display and luminous hands.', 899.99, 1199.99, 25, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800', 'Fashion', 'ChronoLux', 23, 4.9, 287, 1, 1, '{"movement": "Swiss Automatic", "water_resistance": "100m", "material": "Stainless Steel", "crystal": "Sapphire"}');

-- Home & Living Category
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category, brand, stock, rating, review_count, is_featured, is_new, specifications) VALUES
('Modern Floor Lamp', 'Elegant arc design with dimmable LED. Perfect ambient lighting for contemporary spaces. Features touch controls and memory function.', 129.99, 169.99, 24, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800', 'Home', 'LuminaHome', 41, 4.6, 124, 0, 0, '{"type": "LED", "dimmable": true, "height": "180cm", "style": "Modern", "warranty": "3 years"}'),

('Smart Air Purifier', 'HEPA H13 filter removes 99.97% of particles. App-controlled with air quality monitoring and auto mode. Whisper-quiet operation at 22dB.', 249.99, 299.99, 17, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'Home', 'PureAir', 38, 4.7, 198, 1, 1, '{"filter": "HEPA H13", "coverage": "400 sq ft", "smart": true, "noise": "22dB", "cadr": "300"}'),

('Desk Organizer Set', 'Premium bamboo desk organizer with multiple compartments. Eco-friendly and stylish workspace solution with cable management.', 39.99, 54.99, 27, 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800', 'Home', 'EcoSpace', 145, 4.5, 178, 0, 0, '{"material": "Bamboo", "compartments": "6", "eco_friendly": true, "dimensions": "30x20x15cm"}');

-- Sports & Fitness Category
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category, brand, stock, rating, review_count, is_featured, is_new, specifications) VALUES
('Yoga Mat Premium', 'Extra thick 6mm TPE material with alignment lines. Non-slip surface for all yoga styles. Includes carrying strap and storage bag.', 49.99, 69.99, 29, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800', 'Sports', 'ZenFit', 125, 4.5, 445, 0, 0, '{"thickness": "6mm", "material": "TPE", "size": "183x61cm", "non_slip": true, "eco_friendly": true}'),

('Fitness Tracker Pro', 'Advanced fitness tracking with GPS, heart rate, and sleep monitoring. 14-day battery life with water resistance to 50m. Includes guided workouts.', 179.99, 229.99, 22, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800', 'Sports', 'FitTech', 94, 4.6, 567, 1, 1, '{"gps": true, "battery": "14 days", "waterproof": "50m", "display": "AMOLED", "sensors": "Heart rate, SpO2"}');

-- ============================================
-- Insert Sample Reviews
-- ============================================
INSERT INTO reviews (product_id, username, rating, comment) VALUES
(1, 'John Doe', 5, 'Best headphones I ever owned! The noise cancellation is incredible and battery life is amazing.'),
(1, 'Sarah Smith', 5, 'Worth every penny. Sound quality is exceptional and very comfortable for long flights.'),
(1, 'Mike Chen', 4, 'Great headphones but a bit pricey. However, the quality justifies the cost.'),
(2, 'Mike Johnson', 5, 'Amazing phone! Camera is outstanding and the performance is blazing fast.'),
(2, 'Emma Wilson', 5, 'The titanium design feels premium and the battery lasts all day with heavy use.'),
(3, 'Emily Davis', 5, 'Perfect for video editing. The M3 Max chip is a beast and the display is stunning!'),
(3, 'Alex Brown', 5, 'Best laptop I have ever used for development. Compiles code incredibly fast.'),
(4, 'Chris Wilson', 4, 'Great smartwatch, very accurate health tracking and looks elegant.'),
(8, 'Lisa Anderson', 5, 'Beautiful watch! Gets compliments everywhere I go. Swiss movement is superb.'),
(8, 'David Lee', 5, 'Excellent craftsmanship. The automatic movement is mesmerizing to watch.');

-- ============================================
-- Update Product Ratings Based on Reviews
-- ============================================
UPDATE products p
SET rating = (SELECT AVG(rating) FROM reviews WHERE product_id = p.id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = p.id)
WHERE p.id IN (SELECT DISTINCT product_id FROM reviews);

-- ============================================
-- Verification Queries (Optional)
-- ============================================
-- SELECT * FROM products;
-- SELECT * FROM reviews;
-- SELECT COUNT(*) as total_products FROM products;
-- SELECT category, COUNT(*) as count FROM products GROUP BY category;