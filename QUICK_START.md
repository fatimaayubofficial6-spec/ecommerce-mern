# 🚀 ShopSwift - Quick Start Guide

## ⚡ 5-Minute Setup

### 1️⃣ Install Dependencies (2 minutes)
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2️⃣ Configure Environment Variables (1 minute)

**backend/.env:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopswift
JWT_SECRET=mysecretkey123456
STRIPE_SECRET_KEY=sk_test_51xxxxx
NODE_ENV=development
```

**frontend/.env:**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51xxxxx
```

### 3️⃣ Start MongoDB (local) or use MongoDB Atlas
```bash
# If using local MongoDB
mongod
```

### 4️⃣ Seed Database (30 seconds)
```bash
cd backend
npm run seed
```

Output should show:
```
✓ MongoDB Connected
✓ Data cleared
✓ Sample products created
✓ Sample users created

Admin: admin@shopswift.com / admin123
User: user@shopswift.com / user123
```

### 5️⃣ Start Application (30 seconds)
```bash
# From root directory
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin

---

## 🎯 Quick Feature Test

### Test User Flow (2 minutes)
1. ✅ Go to http://localhost:3000
2. ✅ Click on any product
3. ✅ Click "Add to Cart"
4. ✅ Login with: `user@shopswift.com` / `user123`
5. ✅ View cart → "Proceed to Checkout"
6. ✅ Fill shipping: `123 Main St`, `New York`, `10001`, `USA`
7. ✅ Card: `4242 4242 4242 4242`, Exp: `12/25`, CVC: `123`
8. ✅ Click "Pay"
9. ✅ See "Order Successful!" with Order ID

### Test Admin Flow (1 minute)
1. ✅ Logout → Login with: `admin@shopswift.com` / `admin123`
2. ✅ Click "Admin" button (yellow)
3. ✅ View dashboard stats
4. ✅ Click "Products" → Add/Edit/Delete products
5. ✅ Click "Orders" → Change order status

---

## 🔑 Default Credentials

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@shopswift.com    | admin123  |
| User  | user@shopswift.com     | user123   |

---

## 💳 Stripe Test Cards

| Type    | Card Number         | Result  |
|---------|---------------------|---------|
| Success | 4242 4242 4242 4242 | ✅ Paid  |
| Decline | 4000 0000 0000 0002 | ❌ Error |

*Use any future date, any CVC, any postal code*

---

## 📂 Key Files to Edit

### Want to add products manually?
→ `backend/seed.js` - Edit `sampleProducts` array

### Want to change colors/styling?
→ `frontend/src/components/*.js` - Edit Tailwind classes

### Want to add features?
→ `frontend/src/pages/` - Add new pages
→ `backend/routes/` - Add new API endpoints

---

## 🐛 Common Issues & Fixes

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
# Or change port
PORT=3001 npm start
```

### MongoDB connection error
```bash
# Check if MongoDB is running
mongo
# Or mongosh

# If not installed, use MongoDB Atlas (cloud)
# Update MONGO_URI in backend/.env
```

### Stripe payment fails
- ✅ Check both Stripe keys are from same account
- ✅ Use test mode keys (pk_test_ and sk_test_)
- ✅ Test card: 4242 4242 4242 4242

### Can't access admin panel
```bash
# Run this in MongoDB shell
use shopswift
db.users.updateOne(
  { email: "admin@shopswift.com" },
  { $set: { isAdmin: true } }
)
```

---

## 📦 What's Included?

✅ 12 Sample products with images
✅ 2 User accounts (admin + regular)
✅ Complete authentication system
✅ Shopping cart with localStorage
✅ Stripe payment integration
✅ Admin dashboard with charts
✅ Order management
✅ Product CRUD operations
✅ Responsive design (mobile/tablet/desktop)

---

## 🎓 Learning Path

### Beginners Start Here:
1. **See it work**: Follow 5-minute setup above
2. **Understand the code**: Read `PROJECT_STRUCTURE.md`
3. **Learn the API**: Read `API.md`
4. **Test features**: Follow `TESTING.md`

### Advanced Users:
1. **Customize**: Edit products in `seed.js`
2. **Extend**: Add features to pages
3. **Deploy**: See deployment section in `README.md`

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| Admin | http://localhost:3000/admin |
| API Docs | [API.md](./API.md) |
| Stripe Dashboard | https://dashboard.stripe.com/test |
| MongoDB Atlas | https://cloud.mongodb.com |

---

## 🆘 Need Help?

1. **Setup issues?** → Read `SETUP.md`
2. **API questions?** → Read `API.md`
3. **Testing?** → Read `TESTING.md`
4. **Code structure?** → Read `PROJECT_STRUCTURE.md`
5. **Features overview?** → Read `README.md`

---

## 🎉 Success Checklist

After setup, you should see:

- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ 12 products on home page
- ✅ Can add to cart
- ✅ Can login/register
- ✅ Can complete purchase with test card
- ✅ Admin can access dashboard
- ✅ Admin can manage products
- ✅ Admin can update order status

**If all checked, you're ready to go! 🚀**

---

## 📞 Quick Commands Reference

```bash
# Install everything
npm run install-all

# Seed database
cd backend && npm run seed

# Development (both servers)
npm run dev

# Backend only
npm run server

# Frontend only
npm run client

# Build for production
cd frontend && npm run build
```

---

**Ready to code?** Start with `frontend/src/pages/` or `backend/routes/`! 🎨

**Want to learn?** Read the code comments and documentation! 📚

**Need features?** Check `PROJECT_STRUCTURE.md` for future enhancements! 🌟
