
# E-Commerce Admin Panel

A comprehensive E-commerce Admin Panel with React frontend and PHP/MySQL backend.

## Project Structure

### Frontend (React)
```
src/
├── components/             # Reusable UI components
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── ui/                 # UI components from shadcn
│   └── theme-provider.tsx  # Theme management
├── hooks/                  # Custom React hooks
├── layouts/                # Layout components
├── lib/                    # Utility functions
├── pages/                  # Page components
│   ├── products/           # Product-related pages
│   ├── orders/             # Order-related pages
│   ├── customers/          # Customer-related pages
│   ├── analytics/          # Analytics pages
│   └── settings/           # Settings pages
└── backend/                # Backend structure docs (for reference)
```

### Backend (PHP/MySQL)
```
backend/
├── api/                    # API endpoints
│   ├── auth/               # Authentication endpoints
│   ├── products/           # Product endpoints
│   ├── categories/         # Category endpoints
│   ├── orders/             # Order endpoints
│   └── users/              # User endpoints
├── config/                 # Configuration files
├── core/                   # Core functionality
├── models/                 # Data models
├── utils/                  # Utility functions
└── index.php               # Main entry point
```

## Database Schema

The database includes tables for:
- Users/Admins
- Products
- Categories
- Product Images
- Orders
- Order Items
- Customers

## Features

- JWT Authentication
- Dashboard with key metrics
- Product management
- Order processing
- Customer management
- Analytics and reporting
- System settings
- Dark/light theme
- Responsive design

## Authentication Flow

1. User submits credentials
2. Backend validates and returns JWT
3. Frontend stores token and includes it in subsequent requests
4. Backend validates token on each protected route

## State Management

- React Query for data fetching and caching
- Context API for global state
- JWT for authentication state

## Getting Started

### Prerequisites
- Node.js and npm
- PHP 7.4+
- MySQL/MariaDB

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
1. Set up a PHP server (Apache/Nginx)
2. Import database schema from `backend/schema.sql`
3. Configure database connection in `backend/config/database.php`

## Demo Credentials
- Email: admin@example.com
- Password: password

## Technologies Used

### Frontend
- React
- TypeScript
- TailwindCSS
- Shadcn UI
- React Query
- Recharts for data visualization
- React Router

### Backend
- PHP
- MySQL
- JWT for authentication
