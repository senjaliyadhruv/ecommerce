# 🛍️ TechLux - Modern E-Commerce Platform

A stunning, feature-rich full-stack e-commerce application with a modern dark theme, advanced filtering, cart management, wishlist functionality, and smooth animations.

## ✨ Features

### Frontend Features

-   🎨 **Modern Dark Theme** with glassmorphism effects
-   🔍 **Advanced Search & Filtering** by category, price, and rating
-   🛒 **Shopping Cart** with quantity management
-   ❤️ **Wishlist Functionality** to save favorite products
-   ⭐ **Product Reviews & Ratings** system
-   📱 **Fully Responsive** design for all devices
-   🎭 **Smooth Animations** and transitions
-   🔄 **Grid/List View Toggle** for products
-   🚀 **Fast & Intuitive** user experience

### Backend Features

-   🔌 **RESTful API** with Flask
-   🗄️ **MySQL Database** integration
-   🔎 **Advanced Filtering** and sorting
-   📊 **Order Management** system
-   💌 **Newsletter Subscription**
-   🔒 **CORS Enabled** for cross-origin requests

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── app.py                 # Flask application with all API routes
│   ├── .env                   # Database configuration
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js          # Navigation bar component
│   │   │   ├── Home.js            # Homepage with featured products
│   │   │   ├── Shop.js            # Shop page with filters
│   │   │   ├── ProductDetail.js   # Detailed product view
│   │   │   ├── Cart.js            # Shopping cart
│   │   │   ├── Wishlist.js        # Wishlist management
│   │   │   ├── Checkout.js        # Checkout form
│   │   │   ├── Footer.js          # Footer component
│   │   │   └── ScrollToTop.js     # Utility component
│   │   │
│   │   ├── App.js             # Main application component
│   │   ├── App.css            # Global styles with dark theme
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Additional global styles
│   │
│   ├── package.json           # Node dependencies
│   └── .gitignore
│
└── db.sql                     # Database schema and sample data
```

## 🚀 Installation & Setup

### Prerequisites

-   Python 3.8+
-   Node.js 16+
-   MySQL 8.0+

### 1️⃣ Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and import schema
source db.sql

# Or manually
mysql -u root -p ecommerce < db.sql
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

The backend will run on `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Backend Configuration (.env)

Update `backend/.env` with your MySQL credentials:

```env
DB_HOST=your_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=ecommerce
```

### Frontend API Configuration

If your backend runs on a different host/port, update the `API_URL` in:

-   `src/components/Home.js`
-   `src/components/Shop.js`
-   `src/components/ProductDetail.js`
-   `src/components/Checkout.js`

## 📦 Dependencies

### Backend

-   Flask 3.1.2 - Web framework
-   flask-cors 6.0.1 - CORS support
-   mysql-connector-python 9.5.0 - MySQL driver
-   python-dotenv 1.2.1 - Environment variables

### Frontend

-   React 18.2.0 - UI library
-   React Router DOM 6.11.0 - Routing
-   Axios 1.4.0 - HTTP client
-   Bootstrap 5.3.3 - UI framework
-   React Icons 4.11.0 - Icon library
-   React Bootstrap 2.10.5 - Bootstrap components

## 🎨 Design Features

### Color Palette

-   Primary: `#6366f1` (Indigo)
-   Secondary: `#ec4899` (Pink)
-   Accent: `#14b8a6` (Teal)
-   Background: `#0f172a` (Dark Blue)
-   Cards: `#1e293b` (Slate)

### Animations

-   Fade in effects on page load
-   Smooth hover transitions
-   Card elevation on hover
-   Skeleton loading states
-   Toast notifications

## 🔐 Security Notes

**⚠️ IMPORTANT**: The `.env` file contains sensitive credentials and should NEVER be committed to version control in production.

For production deployment:

1. Remove `.env` from the repository
2. Use environment variables on your hosting platform
3. Change all default passwords
4. Enable HTTPS
5. Implement proper authentication

## 🌐 API Endpoints

### Products

-   `GET /api/products` - Get all products (with filters)
-   `GET /api/products/:id` - Get single product with reviews
-   `GET /api/products/featured` - Get featured products
-   `GET /api/categories` - Get all categories

### Reviews

-   `POST /api/reviews` - Add a product review

### Wishlist

-   `POST /api/wishlist` - Add to wishlist
-   `GET /api/wishlist/:userId` - Get user's wishlist

### Orders

-   `POST /api/orders` - Create new order

### Newsletter

-   `POST /api/newsletter` - Subscribe to newsletter

## 📱 Pages & Routes

-   `/` - Homepage with featured products
-   `/shop` - All products with filtering
-   `/product/:id` - Product detail page
-   `/cart` - Shopping cart
-   `/wishlist` - Saved products
-   `/checkout` - Checkout form

## 🎯 Future Enhancements

-   User authentication & profiles
-   Product comparison
-   Advanced analytics dashboard
-   Email notifications
-   Social sharing
-   Product recommendations
-   Multi-language support
-   Dark/Light theme toggle

## 🐛 Troubleshooting

### Common Issues

**Backend not connecting to database:**

-   Check MySQL is running
-   Verify credentials in `.env`
-   Ensure database exists

**Frontend not fetching data:**

-   Check backend is running on port 5000
-   Verify API_URL in components
-   Check browser console for CORS errors

**Port already in use:**

-   Change Flask port in `app.py`: `app.run(port=5001)`
-   Change React port: `PORT=3001 npm start`

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📞 Support

For issues or questions, please create an issue in the repository.

---

Made with ❤️ by [Your Name]

**Happy Coding! 🚀**
