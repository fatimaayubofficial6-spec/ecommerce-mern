# ShopSwift - Modern MERN E-commerce Website

A complete e-commerce platform with Admin Dashboard and Stripe payment integration.

## 🎯 Quick Links for Beginners

- 🎓 **[BEGINNER_GUIDE.md](./BEGINNER_GUIDE.md)** - Complete step-by-step guide for non-coders ⭐
- ✅ **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Printable checklist
- 🔧 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Fix common issues
- 🚀 **[START_HERE.md](./START_HERE.md)** - Choose your learning path
- ⚡ **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup

## Features

### User Side (E-commerce Website)
- ✅ User Registration / Login / Logout (JWT Authentication)
- ✅ Home Page with Product Grid (fetched from MongoDB)
- ✅ Product Detail Page with Add to Cart
- ✅ Shopping Cart (Add/Remove/Update quantity + Total calculation)
- ✅ Checkout with Stripe Payment (real card form, test mode)
- ✅ Order Success Page with Order ID

### Admin Dashboard (Protected)
- ✅ Admin Login (admin-only access)
- ✅ Dashboard Home with Total Sales, Orders Count, Revenue Chart
- ✅ Products Management (View/Add/Edit/Delete)
- ✅ Orders Management (View all orders with status: Pending/Paid/Shipped)
- ✅ Update Order Status

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Redux Toolkit
- **Payment**: Stripe Payment Intents
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Authentication**: JWT

## Installation

### 1. Install Dependencies

```bash
npm run install-all
```

Or install manually:

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

Create `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
```

Create `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

### 3. MongoDB Setup

- Create a MongoDB database (local or MongoDB Atlas)
- Update the `MONGO_URI` in backend `.env` file

### 4. Stripe Setup

- Create a Stripe account at https://stripe.com
- Get your API keys from the Stripe Dashboard
- Use test mode keys for development
- Update `STRIPE_SECRET_KEY` in backend `.env`
- Update `REACT_APP_STRIPE_PUBLIC_KEY` in frontend `.env`

## Running the Application

### Development Mode (Both servers)

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend server on http://localhost:3000

### Run Backend Only

```bash
npm run server
```

### Run Frontend Only

```bash
npm run client
```

### Production

```bash
# Build frontend
npm run build

# Start backend (serves frontend build)
npm start
```

## Default Admin Account

After running the server for the first time, you can create an admin account by:

1. Register a new user at http://localhost:3000/register
2. In MongoDB, update the user's `isAdmin` field to `true`
3. Login at http://localhost:3000/admin

Or use the API directly:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@shopswift.com",
    "password": "admin123"
  }'
```

Then update the user in MongoDB to set `isAdmin: true`.

## Stripe Test Cards

Use these test cards for payment testing:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0027 6000 3184

Use any future expiry date, any 3-digit CVC, and any postal code.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Payment
- `POST /api/payment/create-intent` - Create Stripe payment intent (protected)

### Admin Stats
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

## Project Structure

```
shopswift/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── payment.js
│   │   └── admin.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
└── package.json
```

## Features in Detail

### Shopping Cart
- Stored in Redux state
- Persists in localStorage
- Real-time total calculation
- Quantity management

### Payment Processing
- Stripe Payment Intents API
- Secure card payment form
- Real-time payment validation
- Order creation on successful payment

### Admin Dashboard
- Revenue analytics with charts
- Real-time statistics
- Product inventory management
- Order status tracking and updates

## License

MIT
