# ✅ ShopSwift Setup Checklist

Print this page and check off each item as you complete it!

---

## 🎯 Pre-Setup (Things You Need)

- [ ] Computer with internet connection
- [ ] 30 minutes of free time
- [ ] Email address for signups
- [ ] Notepad or text editor open (to save keys)

---

## 💻 Software Installation

- [ ] Downloaded Node.js from nodejs.org
- [ ] Installed Node.js
- [ ] Restarted computer
- [ ] Verified Node.js works (typed `node --version` in terminal)

---

## 🗄️ MongoDB Setup

- [ ] Signed up at mongodb.com/cloud/atlas
- [ ] Created a FREE cluster (M0)
- [ ] Created database user (username: `shopswift`, password: `shopswift123`)
- [ ] Added my IP address to allowed list
- [ ] Copied connection string
- [ ] Replaced `<password>` with actual password in connection string
- [ ] Saved connection string in Notepad

**My MongoDB Connection String:**
```
mongodb+srv://shopswift:[PASSWORD]@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 💳 Stripe Setup

- [ ] Signed up at stripe.com
- [ ] Verified email address
- [ ] Went to Developers → API Keys
- [ ] Copied Publishable Key (starts with `pk_test_`)
- [ ] Copied Secret Key (starts with `sk_test_`)
- [ ] Saved both keys in Notepad

**My Stripe Keys:**
- **Publishable Key:** `pk_test_...`
- **Secret Key:** `sk_test_...`

---

## 📥 Project Setup

- [ ] Downloaded/extracted project folder
- [ ] Opened terminal in project folder
- [ ] Ran `npm install` (in root folder)
- [ ] Ran `cd backend && npm install`
- [ ] Ran `cd ../frontend && npm install`
- [ ] Went back to root: `cd ..`

---

## ⚙️ Configuration

### Backend Configuration
- [ ] Opened `backend/.env.example`
- [ ] Changed MONGO_URI to my connection string
- [ ] Changed STRIPE_SECRET_KEY to my secret key
- [ ] Changed JWT_SECRET to a random password
- [ ] Saved as `backend/.env` (removed .example)

### Frontend Configuration
- [ ] Opened `frontend/.env.example`
- [ ] Changed REACT_APP_STRIPE_PUBLIC_KEY to my publishable key
- [ ] Saved as `frontend/.env` (removed .example)

---

## 🌱 Database Seeding

- [ ] Ran `cd backend`
- [ ] Ran `npm run seed`
- [ ] Saw success message with admin/user credentials
- [ ] Went back: `cd ..`

**Default Login Credentials:**
- **Admin:** admin@shopswift.com / admin123
- **User:** user@shopswift.com / user123

---

## 🚀 Running the Application

- [ ] Ran `npm run dev`
- [ ] Saw "Compiled successfully!" message
- [ ] Opened browser to http://localhost:3000
- [ ] Website loads successfully

---

## 🧪 Testing (Optional but Recommended)

### User Test
- [ ] Registered a new account
- [ ] Logged in successfully
- [ ] Viewed products on home page
- [ ] Clicked on a product to see details
- [ ] Added product to cart
- [ ] Viewed cart
- [ ] Proceeded to checkout
- [ ] Filled shipping address
- [ ] Used test card: 4242 4242 4242 4242
- [ ] Completed payment
- [ ] Saw "Order Successful!" page

### Admin Test
- [ ] Logged out
- [ ] Logged in with admin@shopswift.com / admin123
- [ ] Saw yellow "Admin" button
- [ ] Clicked Admin button
- [ ] Viewed dashboard with stats
- [ ] Went to Products page
- [ ] Added a new product
- [ ] Edited an existing product
- [ ] Went to Orders page
- [ ] Changed an order status

---

## 🎉 Success!

If you checked all the boxes above, **CONGRATULATIONS!** 🎊

Your e-commerce website is fully functional!

---

## 📝 Important Information (Save This!)

**MongoDB Connection:**
```
[Write your full connection string here]
```

**Stripe Test Keys:**
- Publishable: `[Write here]`
- Secret: `[Write here]`

**Admin Login:**
- Email: admin@shopswift.com
- Password: admin123

**Test Credit Card:**
- Number: 4242 4242 4242 4242
- Expiry: 12/25 (any future date)
- CVC: 123 (any 3 digits)

**Local URLs:**
- Website: http://localhost:3000
- API: http://localhost:5000
- Admin: http://localhost:3000/admin

---

## 🔧 Troubleshooting Quick Reference

| Problem | Quick Fix |
|---------|-----------|
| "Port in use" | Close other apps, restart computer |
| "MongoDB error" | Check .env file, verify connection string |
| "Stripe error" | Verify both keys are `test` keys |
| "npm not found" | Install Node.js, restart computer |
| Website won't load | Check terminal for errors, verify npm run dev is running |

---

## 🎯 To Stop the Website

1. Go to terminal window
2. Press `Ctrl + C` (or `Cmd + C` on Mac)
3. Type `Y` if asked
4. Done!

## 🎯 To Start Again Later

1. Open terminal in project folder
2. Type: `npm run dev`
3. Wait for "Compiled successfully!"
4. Open browser to http://localhost:3000

---

## 📞 Help Resources

- **Beginner Guide:** BEGINNER_GUIDE.md (detailed walkthrough)
- **Quick Start:** QUICK_START.md (5-minute version)
- **Full Setup:** SETUP.md (technical details)
- **Testing:** TESTING.md (test scenarios)
- **API Docs:** API.md (for developers)

---

## 🌟 Next Steps (After Setup)

- [ ] Customize products in seed.js
- [ ] Change website colors (Tailwind classes)
- [ ] Add your own products via admin panel
- [ ] Test different user flows
- [ ] Read documentation for customization
- [ ] Plan production deployment

---

**Date Completed:** _______________

**Notes:**
```
[Write any notes, issues you faced, or customizations you want to make]





```

---

**🎊 You're now a ShopSwift owner! Happy selling!** 🛍️
