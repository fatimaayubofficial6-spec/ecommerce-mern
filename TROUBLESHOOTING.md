# 🔧 ShopSwift Troubleshooting Guide

**Having problems?** Don't worry! This guide will help you fix common issues.

---

## 🆘 Quick Diagnosis

### Is your problem here?

1. **Can't install Node.js** → [Go to Section A](#section-a-nodejs-installation-issues)
2. **Terminal/Command Prompt errors** → [Go to Section B](#section-b-terminal-errors)
3. **MongoDB connection problems** → [Go to Section C](#section-c-mongodb-issues)
4. **Stripe payment not working** → [Go to Section D](#section-d-stripe-issues)
5. **Website won't start** → [Go to Section E](#section-e-website-startup-issues)
6. **Website loads but looks broken** → [Go to Section F](#section-f-display-issues)
7. **Can't login or register** → [Go to Section G](#section-g-authentication-issues)
8. **Admin panel not accessible** → [Go to Section H](#section-h-admin-access-issues)

---

## Section A: Node.js Installation Issues

### ❌ Problem: "node: command not found" or "node is not recognized"

**What this means:** Node.js is not installed or not in your PATH.

**Solution:**

1. **Check if Node.js is actually installed:**
   - Windows: Go to `C:\Program Files\nodejs\` - is there a `node.exe` file?
   - Mac: Open Terminal and type `which node`
   - Linux: Open Terminal and type `which node`

2. **If Node.js is installed but not recognized:**
   - **Restart your computer** (this is the #1 fix!)
   - After restart, try `node --version` again

3. **If still not working:**
   - **Uninstall Node.js completely**
   - **Restart computer**
   - **Download and install again** from https://nodejs.org
   - Choose the **LTS version** (left button, usually)
   - **Restart computer again**

4. **Verify it works:**
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers.

---

### ❌ Problem: "npm: command not found"

**What this means:** npm (Node Package Manager) didn't install with Node.js.

**Solution:**

1. Node.js and npm come together. If npm is missing:
   - Uninstall Node.js
   - Restart computer
   - Install Node.js again
   - During installation, make sure "npm package manager" is checked

2. **For Windows users:**
   - Run installer as Administrator (right-click → Run as administrator)

---

## Section B: Terminal Errors

### ❌ Problem: "Cannot find module" errors

**What this means:** Project dependencies aren't installed.

**Solution:**

```bash
# Delete old installations
rm -rf node_modules
rm -rf backend/node_modules
rm -rf frontend/node_modules

# On Windows, use:
# rmdir /s node_modules
# rmdir /s backend\node_modules
# rmdir /s frontend\node_modules

# Install everything fresh
npm install
cd backend
npm install
cd ../frontend
npm install
cd ..
```

---

### ❌ Problem: "EACCES: permission denied" (Mac/Linux)

**What this means:** You need admin permissions.

**Solution:**

Add `sudo` before the command:
```bash
sudo npm install
```

Enter your computer password when asked.

**Better solution** (fixes it permanently):
```bash
sudo chown -R $USER /usr/local/lib/node_modules
sudo chown -R $USER /usr/local/bin
```

---

### ❌ Problem: "Port 3000 is already in use"

**What this means:** Another program is using port 3000.

**Solution:**

**Windows:**
```bash
# Find what's using the port
netstat -ano | findstr :3000

# Kill it (replace PID with the number you see)
taskkill /PID [number] /F
```

**Mac/Linux:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

**Easier solution:**
- Restart your computer
- Close all applications
- Try again

---

### ❌ Problem: "Port 5000 is already in use"

**Solution:** Same as above, but use `:5000` instead of `:3000`

---

## Section C: MongoDB Issues

### ❌ Problem: "MongoNetworkError" or "Connection refused"

**What this means:** Can't connect to MongoDB.

**Solution:**

1. **Check your connection string in `backend/.env`:**
   - Open `backend/.env` file
   - Look at the `MONGO_URI` line
   - Make sure it's all on ONE line (no line breaks)
   - Make sure you replaced `<password>` with your actual password

2. **Verify your connection string format:**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - `username` should be `shopswift`
   - `password` should be `shopswift123` (or whatever you set)
   - Should start with `mongodb+srv://`
   - Should end with `mongodb.net/?retryWrites=true&w=majority`

3. **Check MongoDB Atlas settings:**
   - Go to https://cloud.mongodb.com
   - Log in to your account
   - Click "Network Access" on the left
   - Make sure your IP address is in the list
   - If not, click "Add IP Address" → "Add Current IP Address"

4. **Test your connection:**
   - Go to MongoDB Atlas
   - Click "Connect"
   - Click "Connect your application"
   - Copy the connection string again
   - Replace the one in your `.env` file

---

### ❌ Problem: "Authentication failed"

**What this means:** Wrong username or password in connection string.

**Solution:**

1. **Double-check your password:**
   - In your connection string, find `:password@`
   - Make sure the password between `:` and `@` is correct
   - It should be `shopswift123` if you followed the guide

2. **Reset the password:**
   - Go to MongoDB Atlas
   - Click "Database Access" (left sidebar)
   - Find your user
   - Click "Edit"
   - Click "Edit Password"
   - Set a new password (remember it!)
   - Click "Update User"
   - Update the password in your `backend/.env` file

---

### ❌ Problem: "IP address not whitelisted"

**What this means:** Your IP isn't allowed to connect.

**Solution:**

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click "Network Access" on the left
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (for development only!)
5. Click "Confirm"
6. Wait 2-3 minutes for changes to apply
7. Try again

---

## Section D: Stripe Issues

### ❌ Problem: Payment form doesn't show

**What this means:** Stripe public key is wrong or missing.

**Solution:**

1. **Check `frontend/.env` file:**
   - Open the file
   - Find `REACT_APP_STRIPE_PUBLIC_KEY=`
   - Make sure there's a key after the `=`
   - The key should start with `pk_test_`

2. **Get a fresh key:**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy the "Publishable key" again
   - Replace it in `frontend/.env`
   - Make sure there are no spaces before or after the key

3. **Restart the application:**
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

---

### ❌ Problem: "Payment failed" error

**What this means:** Backend can't connect to Stripe.

**Solution:**

1. **Check `backend/.env` file:**
   - Open the file
   - Find `STRIPE_SECRET_KEY=`
   - The key should start with `sk_test_`
   - Make sure it's the complete key (they're very long!)

2. **Verify both keys are from the same account:**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Make sure both keys are in "Test mode" (toggle on top right)
   - Copy both keys fresh
   - Update both `.env` files

3. **Use the correct test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (like `12/25`)
   - CVC: Any 3 digits (like `123`)

---

### ❌ Problem: Payment succeeds but order not created

**What this means:** Database issue after payment.

**Solution:**

1. Check browser console for errors:
   - Press F12 in your browser
   - Look at the "Console" tab
   - Look for red error messages

2. Check MongoDB connection (see Section C)

3. Try again with a fresh registration

---

## Section E: Website Startup Issues

### ❌ Problem: "npm run dev" does nothing

**Solution:**

1. **Make sure you're in the correct folder:**
   ```bash
   # You should be in the main project folder, not backend or frontend
   # Check with:
   ls
   # You should see: backend/ frontend/ package.json
   ```

2. **If in wrong folder:**
   ```bash
   cd ..  # Go up one level
   ```

3. **Try installing again:**
   ```bash
   npm install
   ```

---

### ❌ Problem: "Failed to compile" errors

**What this means:** Code syntax errors or missing files.

**Solution:**

1. **Look at the error message** - it usually tells you which file has the problem

2. **Common fixes:**
   ```bash
   # Delete and reinstall frontend dependencies
   cd frontend
   rm -rf node_modules
   npm install
   cd ..
   ```

3. **Make sure all files exist:**
   - Check that `frontend/src/App.js` exists
   - Check that `frontend/src/index.js` exists
   - Check that `frontend/public/index.html` exists

---

### ❌ Problem: Backend starts but frontend doesn't

**Solution:**

Open two separate terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

---

## Section F: Display Issues

### ❌ Problem: Website loads but has no styling (ugly text)

**What this means:** Tailwind CSS not loading.

**Solution:**

1. **Check if `frontend/src/index.css` exists**

2. **Reinstall Tailwind:**
   ```bash
   cd frontend
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   cd ..
   ```

3. **Restart the dev server:**
   - Stop with Ctrl+C
   - Run `npm run dev` again

---

### ❌ Problem: Images not showing

**What this means:** Image URLs are broken or blocked.

**Solution:**

1. **Check internet connection** - images come from external URLs

2. **If specific products have broken images:**
   - Login as admin
   - Edit the product
   - Use a different image URL from:
     - https://unsplash.com
     - https://placeholder.com
     - Any valid image URL

---

## Section G: Authentication Issues

### ❌ Problem: Can't register new user

**What this means:** Backend or database issue.

**Solution:**

1. **Check backend console** for errors

2. **Verify MongoDB is connected:**
   - Look for "MongoDB Connected" in terminal
   - If not, see Section C

3. **Check if email already exists:**
   - Try a different email address
   - Or run `npm run seed` again to reset database

---

### ❌ Problem: Can't login

**Possible causes:**

**Wrong password:**
- Try registering a new account
- Or use default user: `user@shopswift.com` / `user123`

**Backend not running:**
- Check terminal - should see "Server running on port 5000"
- If not, restart with `npm run dev`

**Database not seeded:**
```bash
cd backend
npm run seed
cd ..
```

---

### ❌ Problem: Login succeeds but immediately logs out

**Solution:**

1. **Check browser localStorage:**
   - Press F12
   - Go to "Application" or "Storage" tab
   - Look for localStorage
   - Clear all data
   - Try logging in again

2. **Check JWT_SECRET in `backend/.env`:**
   - Make sure it exists and has a value
   - Should be at least 10 characters

---

## Section H: Admin Access Issues

### ❌ Problem: Can't access /admin page

**What this means:** User is not marked as admin.

**Solution:**

1. **Use the default admin account:**
   - Email: `admin@shopswift.com`
   - Password: `admin123`

2. **If that doesn't work, reseed database:**
   ```bash
   cd backend
   npm run seed
   cd ..
   ```

3. **Manually make your account admin:**
   - Go to MongoDB Atlas: https://cloud.mongodb.com
   - Click "Browse Collections"
   - Find the "users" collection
   - Find your user
   - Click "Edit Document"
   - Change `"isAdmin": false` to `"isAdmin": true`
   - Click "Update"

---

### ❌ Problem: Admin button doesn't show

**Solution:**

1. Logout completely
2. Clear browser cache (Ctrl+Shift+Delete)
3. Login with `admin@shopswift.com` / `admin123`
4. Refresh the page

---

## 🆘 Still Having Problems?

### Step-by-Step Debugging Process:

1. **Check if backend is running:**
   - Look at terminal
   - Should see "Server running on port 5000"
   - Open http://localhost:5000 in browser
   - Should see: `{"message":"ShopSwift API is running..."}`

2. **Check if frontend is running:**
   - Should see "Compiled successfully!" in terminal
   - Open http://localhost:3000
   - Should see website

3. **Check browser console:**
   - Press F12
   - Look at "Console" tab
   - Red errors? Read what they say!

4. **Check both .env files exist:**
   - `backend/.env` should exist
   - `frontend/.env` should exist
   - Both should have values (not just templates)

5. **Nuclear option (start fresh):**
   ```bash
   # Stop everything
   # Delete all node_modules
   rm -rf node_modules backend/node_modules frontend/node_modules
   
   # Delete package-lock files
   rm package-lock.json backend/package-lock.json frontend/package-lock.json
   
   # Install everything fresh
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   
   # Reseed database
   cd backend && npm run seed && cd ..
   
   # Start fresh
   npm run dev
   ```

---

## 📞 Getting Help

If nothing works:

1. **Copy the exact error message**
2. **Google it** - someone else probably had this issue
3. **Check these files are correct:**
   - `backend/.env` - has all 5 variables filled
   - `frontend/.env` - has both variables filled
4. **Take a screenshot of the error**
5. **Ask for help** with the screenshot and error message

---

## ✅ Health Check Command

Run this to check if everything is OK:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check if backend .env exists
ls backend/.env

# Check if frontend .env exists  
ls frontend/.env

# Try to connect to MongoDB
cd backend
npm run seed
cd ..

# Start the app
npm run dev
```

If all of these work, you're good! 🎉

---

## 🔄 Fresh Start Procedure

If you want to start completely from scratch:

1. **Delete project folder**
2. **Re-download/clone project**
3. **Follow BEGINNER_GUIDE.md from step 1**
4. **Take it slow, check each step**

---

## 💡 Prevention Tips

**To avoid issues:**

1. ✅ Always copy-paste API keys (don't type them)
2. ✅ Don't edit code files unless you know what you're doing
3. ✅ Keep `.env.example` files - don't delete them
4. ✅ Don't commit/push `.env` files to Git
5. ✅ Restart computer if something feels "stuck"
6. ✅ Read error messages carefully - they usually tell you what's wrong
7. ✅ Test with default admin account before creating your own

---

**Remember:** 90% of problems are typos in `.env` files or forgetting to restart after changes! 🎯
