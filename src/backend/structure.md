
# E-Commerce Admin Panel Backend Structure

## Directory Structure

```
backend/
├── api/                    # API endpoints
│   ├── auth/               # Authentication endpoints
│   │   ├── login.php       # User login
│   │   ├── logout.php      # User logout
│   │   └── refresh.php     # Refresh JWT token
│   ├── products/           # Product endpoints
│   │   ├── index.php       # List all products
│   │   ├── create.php      # Create new product
│   │   ├── show.php        # Get single product
│   │   ├── update.php      # Update product
│   │   └── delete.php      # Delete product
│   ├── categories/         # Category endpoints
│   │   ├── index.php       # List all categories
│   │   ├── create.php      # Create new category
│   │   └── update.php      # Update category
│   ├── orders/             # Order endpoints
│   │   ├── index.php       # List all orders
│   │   ├── show.php        # Get single order
│   │   └── update.php      # Update order status
│   └── users/              # User endpoints
│       ├── index.php       # List all users
│       ├── create.php      # Create new user
│       ├── show.php        # Get single user
│       └── update.php      # Update user
├── config/                 # Configuration files
│   ├── database.php        # Database connection
│   └── jwt.php             # JWT configuration
├── core/                   # Core functionality
│   ├── Router.php          # API router
│   ├── Database.php        # Database connection class
│   ├── Response.php        # API response handler
│   └── Auth.php            # Authentication handler
├── models/                 # Data models
│   ├── User.php            # User model
│   ├── Product.php         # Product model
│   ├── Category.php        # Category model
│   └── Order.php           # Order model
├── utils/                  # Utility functions
│   ├── JwtHandler.php      # JWT token functions
│   ├── Validator.php       # Input validator
│   └── Logger.php          # Error logging
├── vendor/                 # Composer dependencies
├── .htaccess               # Apache config
├── index.php               # Main entry point
└── composer.json           # PHP dependencies
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'viewer') NOT NULL DEFAULT 'viewer',
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

### Products Table
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    regular_price DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    stock_quantity INT NOT NULL DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    category_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

### Product Images Table
```sql
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address TEXT NOT NULL,
    billing_address TEXT,
    payment_method VARCHAR(100) NOT NULL,
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
```

### Customers Table
```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    total_spent DECIMAL(10, 2) DEFAULT 0,
    total_orders INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Authentication Flow with JWT

1. User submits login credentials (email/password)
2. PHP backend validates credentials against database
3. If valid, generates JWT with:
   - User ID
   - User role
   - Expiration time
4. Token is signed with a secret key and returned to client
5. Frontend stores JWT in localStorage/sessionStorage
6. For each subsequent request:
   - Client includes JWT in Authorization header
   - Backend validates JWT signature and expiration
   - If valid, processes the request, otherwise returns 401 Unauthorized
7. JWT refresh flow:
   - When token is near expiration, client calls refresh endpoint
   - If refresh token is valid, new JWT is issued

## API Endpoints Structure

```
POST   /api/auth/login           # Authenticate user and get JWT
POST   /api/auth/refresh         # Refresh JWT token
POST   /api/auth/logout          # Invalidate current token

GET    /api/products             # List all products with pagination
POST   /api/products             # Create new product
GET    /api/products/{id}        # Get single product details
PUT    /api/products/{id}        # Update product
DELETE /api/products/{id}        # Delete product

GET    /api/categories           # List all categories
POST   /api/categories           # Create new category
PUT    /api/categories/{id}      # Update category
DELETE /api/categories/{id}      # Delete category

GET    /api/orders               # List all orders with filtering
GET    /api/orders/{id}          # Get single order details
PUT    /api/orders/{id}          # Update order status

GET    /api/users                # List all users (admin only)
POST   /api/users                # Create new user (admin only)
GET    /api/users/{id}           # Get user details
PUT    /api/users/{id}           # Update user

GET    /api/dashboard/stats      # Get dashboard statistics
GET    /api/dashboard/sales      # Get sales data for charts
```

## State Management and API Integration

### React to PHP API Integration

1. **API Service Layer:**
   - Create API service files for each resource (products, orders, etc.)
   - Use Axios for HTTP requests
   - Handle JWT in request interceptors
   - Add response interceptors for error handling

2. **React Query for State Management:**
   - Use React Query for data fetching, caching, and synchronization
   - Implement optimistic updates for better UX
   - Handle loading, error, and success states

3. **Authentication Flow:**
   - Store JWT in localStorage or secure HTTP-only cookies
   - Use auth context to manage user state
   - Implement token refresh logic
   - Protected routes with auth guards

4. **Real-time Updates:**
   - Implement polling with React Query for orders notifications
   - Optional: WebSockets for real-time dashboards
