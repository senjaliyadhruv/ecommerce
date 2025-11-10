CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

-- Insert sample data (images from Unsplash)
INSERT INTO products (name, description, price, image_url) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation.', 59.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
('Smartphone', 'Latest smartphone with 128GB storage and 5G support.', 499.99, 'https://images.unsplash.com/photo-1511707171634-5f89772885f2'),
('Laptop', 'Lightweight laptop with 16GB RAM and SSD storage.', 899.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a0a1'),
('Smart Watch', 'Fitness tracking smartwatch with heart rate monitor.', 129.99, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12');