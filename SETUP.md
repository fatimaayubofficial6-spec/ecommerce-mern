# ShopSwift - Complete Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Stripe account (for payment processing)

## Step-by-Step Setup

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download from mongodb.com

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/shopswift`)

### 3. Stripe Setup

1. Go to https://stripe.com and create an account
2. Go to Developers > API keys
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Copy your **Secret key** (starts with `sk_test_`)

### 4. Environment Variables

#### Backend Environment (.env in backend folder)

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopswift
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopswift

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NODE_ENV=development
```

#### Frontend Environment (.env in frontend folder)

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key_here
```

### 5. Seed Database with Sample Data

```bash
cd backend
npm run seed
```

This will create:
- 12 sample products
- Admin user: `admin@shopswift.com` / `admin123`
- Regular user: `user@shopswift.com` / `user123`

### 6. Run the Application

#### Option A: Run Both Servers Concurrently (Recommended)

```bash
# From root directory
npm run dev
```

This will start:
- Backend API on http://localhost:5000
- Frontend React app on http://localhost:3000

#### Option B: Run Servers Separately

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin (login with admin credentials)

## Testing Payment

Use these Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`

Use:
- Any future expiry date (e.g., 12/25)
- Any 3-digit CVC (e.g., 123)
- Any postal code (e.g., 12345)

## User Accounts

### Admin Account
- **Email**: admin@shopswift.com
- **Password**: admin123
- **Access**: Full access to admin dashboard

### Regular User Account
- **Email**: user@shopswift.com
- **Password**: user123
- **Access**: Shopping features only

## API Endpoints

### Authentication
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
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Payment
- `POST /api/payment/create-intent` - Create Stripe payment intent (protected)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill
lsof -ti:5000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Connection Error

1. Check if MongoDB is running: `mongo` or `mongosh`
2. Verify MONGO_URI in backend/.env
3. For Atlas, check network access settings (allow your IP)

### Stripe Payment Not Working

1. Verify REACT_APP_STRIPE_PUBLIC_KEY in frontend/.env
2. Verify STRIPE_SECRET_KEY in backend/.env
3. Make sure keys are from the same Stripe account
4. Use test mode keys (pk_test_ and sk_test_)

### Cannot Access Admin Dashboard

1. Make sure you're logged in with admin account
2. Check that isAdmin field is true in MongoDB:
   ```bash
   mongosh
   use shopswift
   db.users.updateOne(
     { email: "admin@shopswift.com" },
     { $set: { isAdmin: true } }
   )
   ```

## Production Deployment

### Backend (Node.js)

1. Set NODE_ENV=production in .env
2. Use production MongoDB URI
3. Use production Stripe keys
4. Deploy to Heroku, Railway, or DigitalOcean

### Frontend (React)

1. Update REACT_APP_API_URL to production backend URL
2. Build: `npm run build`
3. Deploy to Vercel, Netlify, or AWS S3

### Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use production MongoDB with authentication
- [ ] Use production Stripe keys
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS for all connections
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization

## Support

For issues or questions:
- Check the README.md for feature documentation
- Review API endpoints documentation above
- Check MongoDB and Stripe dashboard for errors

## License

MIT
