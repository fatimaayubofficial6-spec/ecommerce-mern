# 🎓 Complete Beginner's Guide to Running ShopSwift

**Don't worry if you're not a coder!** This guide will walk you through **everything** step by step.

---

## 📋 What You'll Need (5 things)

1. **A computer** (Windows, Mac, or Linux)
2. **Internet connection**
3. **30 minutes of your time**
4. **An email address** (for signing up to services)
5. **A phone** (optional, for some verifications)

---

## 🚀 Part 1: Install Required Software (15 minutes)

### Step 1: Install Node.js

**What is Node.js?** It's software that lets you run this website on your computer.

#### For Windows:
1. Go to: https://nodejs.org
2. Click the big green button that says **"Download for Windows"**
3. Wait for the file to download (it's about 30 MB)
4. Double-click the downloaded file
5. Click **"Next"** on everything (keep all default settings)
6. Click **"Finish"** when done
7. **Restart your computer** (important!)

#### For Mac:
1. Go to: https://nodejs.org
2. Click the big green button that says **"Download for Mac"**
3. Open the downloaded file
4. Follow the installation wizard
5. **Restart your computer**

#### For Linux:
Open Terminal and paste these commands:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### ✅ Check if Node.js is Installed:
1. **Windows**: Press `Windows Key + R`, type `cmd`, press Enter
2. **Mac**: Press `Command + Space`, type `terminal`, press Enter
3. **Linux**: Open Terminal

Type this and press Enter:
```bash
node --version
```

You should see something like `v18.17.0` or `v20.10.0`. If you do, **you're good!** ✅

---

### Step 2: Install MongoDB (Your Database)

**What is MongoDB?** It's where all your products, orders, and user data will be stored.

#### 🌟 EASIEST OPTION: Use MongoDB Atlas (Cloud - FREE)

This is **recommended** because it's easier and free!

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with your email (it's free!)
3. After signing up, you'll see a page asking you to **"Build a Database"**
4. Choose **"M0 FREE"** option (it says "Forever Free")
5. Click **"Create"**
6. Choose a cloud provider (AWS is fine) and a region close to you
7. Click **"Create Cluster"** (this takes 3-5 minutes)

**While waiting, set up security:**

8. You'll see a popup asking for a **username and password**:
   - Username: `shopswift`
   - Password: `shopswift123` (remember this!)
   - Click **"Create User"**

9. Scroll down and click **"Add My Current IP Address"**
10. Click **"Finish and Close"**

**Get Your Connection String:**

11. Click **"Connect"** button
12. Click **"Connect your application"**
13. You'll see a long text starting with `mongodb+srv://...`
14. Click the **"Copy"** button
15. **Paste this somewhere safe** (Notepad or Notes app)
16. In that text, replace `<password>` with `shopswift123`

Your final connection string should look like:
```
mongodb+srv://shopswift:shopswift123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Save this! You'll need it in Step 5!**

---

## 💳 Part 2: Set Up Stripe (Payment Processing) (10 minutes)

**What is Stripe?** It lets customers pay with credit cards safely.

### Step 1: Create a Stripe Account

1. **Go to:** https://stripe.com
2. Click **"Sign up"** (top right)
3. Enter your email and create a password
4. Click **"Create account"**
5. **Check your email** and verify your account

### Step 2: Get Your API Keys

1. After logging in, you'll see the Stripe Dashboard
2. On the left menu, look for **"Developers"**
3. Click on **"Developers"**, then click **"API keys"**

You'll see **two keys**:

#### 🔑 Publishable Key (starts with `pk_test_`)
- This is your **PUBLIC** key (safe to share)
- It looks like: `pk_test_51Hq7x8Dy9QO9P8aaaaaaaaaaaaaabbbbbbbbbb`
- Click the **"Copy"** button next to it
- **Paste it in Notepad** with label "Stripe Public Key"

#### 🔐 Secret Key (starts with `sk_test_`)
- This is your **SECRET** key (keep it private!)
- It looks like: `sk_test_51Hq7x8Dy9QO9P8cccccccccccccddddddddd`
- Click **"Reveal test key"** first
- Then click the **"Copy"** button
- **Paste it in Notepad** with label "Stripe Secret Key"

**💡 IMPORTANT:** Make sure both keys say `test` in them. These are test keys for development!

---

## 📥 Part 3: Download and Set Up the Project (5 minutes)

### Step 1: Download the Project

If you received this as a ZIP file:
1. **Right-click** the ZIP file
2. Click **"Extract All"** (Windows) or **"Unzip"** (Mac)
3. Choose a location (like Desktop or Documents)

If you have Git:
```bash
git clone [your-repository-url]
```

### Step 2: Open Terminal/Command Prompt in the Project Folder

#### Windows:
1. Open the extracted folder
2. Hold **Shift** and **Right-click** in empty space
3. Click **"Open PowerShell window here"** or **"Open Command Prompt here"**

#### Mac:
1. Open **Terminal**
2. Type `cd ` (with a space after cd)
3. **Drag the project folder** into the Terminal window
4. Press **Enter**

#### Linux:
1. Right-click in the project folder
2. Click **"Open Terminal Here"**

---

## ⚙️ Part 4: Install Dependencies (5 minutes)

In the terminal/command prompt window you just opened, type these commands **one by one** and press Enter after each:

```bash
npm install
```

Wait for it to finish (you'll see lots of text scrolling). This might take 2-3 minutes.

Then type:
```bash
cd backend
npm install
```

Wait for it to finish again.

Then type:
```bash
cd ../frontend
npm install
```

Wait for it to finish once more.

Then go back to the main folder:
```bash
cd ..
```

**✅ You've successfully installed everything!**

---

## 🔧 Part 5: Configure Your Settings (3 minutes)

Now we'll add your MongoDB and Stripe keys to the project.

### Step 1: Configure Backend

1. **Open the project folder** in File Explorer (Windows) or Finder (Mac)
2. Go to the **`backend`** folder
3. Find a file called **`.env.example`**
4. **Right-click** on it and select **"Open with Notepad"** (or TextEdit on Mac)
5. You'll see something like this:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopswift
JWT_SECRET=your_jwt_secret_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NODE_ENV=development
```

6. **Replace** the `MONGO_URI` line with your MongoDB connection string from Part 2
7. **Replace** the `STRIPE_SECRET_KEY` with your Stripe Secret Key (the one starting with `sk_test_`)
8. The `JWT_SECRET` can be any random text (like `mysuper secretkey12345`)

It should now look like:
```
PORT=5000
MONGO_URI=mongodb+srv://shopswift:shopswift123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=mysuper secretkey12345
STRIPE_SECRET_KEY=sk_test_51Hq7x8Dy9QO9P8cccccccccccccddddddddd
NODE_ENV=development
```

9. Click **File → Save As**
10. Change the filename to **`.env`** (remove the `.example` part)
11. Make sure "File type" is **"All Files"**
12. Click **"Save"**

### Step 2: Configure Frontend

1. Go to the **`frontend`** folder
2. Find **`.env.example`**
3. Open it with Notepad or TextEdit
4. You'll see:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
```

5. **Replace** the `REACT_APP_STRIPE_PUBLIC_KEY` with your Stripe Publishable Key (the one starting with `pk_test_`)

It should look like:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51Hq7x8Dy9QO9P8aaaaaaaaaaaaaabbbbbbbbbb
```

6. Click **File → Save As**
7. Change the filename to **`.env`**
8. Make sure "File type" is **"All Files"**
9. Click **"Save"**

---

## 🌱 Part 6: Add Sample Products (2 minutes)

Let's add some products to your store!

In your terminal/command prompt (still in the project folder), type:

```bash
cd backend
npm run seed
```

You should see something like:
```
✓ MongoDB Connected
✓ Data cleared
✓ Sample products created
✓ Sample users created

Admin: admin@shopswift.com / admin123
User: user@shopswift.com / user123
```

**✅ Perfect! Your database now has 12 products and 2 users!**

Then go back to the main folder:
```bash
cd ..
```

---

## 🎉 Part 7: Run Your Website! (1 minute)

This is it! Time to see your website!

In the terminal, type:
```bash
npm run dev
```

You'll see text like:
```
> Backend server running on port 5000
> Frontend server starting...
> Compiled successfully!
```

**✅ Your website is now running!**

---

## 🌐 Part 8: Open Your Website in Browser

1. **Open your web browser** (Chrome, Firefox, Safari, Edge)
2. Type this in the address bar:
```
http://localhost:3000
```
3. Press **Enter**

**🎊 CONGRATULATIONS!** You should see your e-commerce website!

---

## 👤 Part 9: Test Your Website (5 minutes)

### Test as a Regular User:

1. Click **"Register"** in the top right
2. Create an account:
   - Name: Your Name
   - Email: your.email@example.com
   - Password: test123
   - Confirm Password: test123
3. Click **"Register"**
4. You're now logged in! Browse products and add them to cart.

### Test Checkout:

1. Add a product to your cart
2. Click **"Cart"** in the navigation
3. Click **"Proceed to Checkout"**
4. Fill in shipping address:
   - Address: 123 Main Street
   - City: New York
   - Postal Code: 10001
   - Country: USA
5. For payment, use this **TEST CARD**:
   - Card Number: `4242 4242 4242 4242`
   - Expiry Date: Any future date (like `12/25`)
   - CVC: Any 3 digits (like `123`)
   - Postal Code: Any 5 digits (like `12345`)
6. Click **"Pay"**
7. You should see **"Order Successful!"** 🎉

### Test as Admin:

1. **Logout** (click Logout in top right)
2. Click **"Login"**
3. Use these credentials:
   - Email: `admin@shopswift.com`
   - Password: `admin123`
4. Click **"Login"**
5. You'll see a yellow **"Admin"** button - click it!
6. You can now:
   - View dashboard with statistics
   - Add/Edit/Delete products
   - View and manage all orders
   - Change order status

---

## 🛑 How to Stop the Website

When you're done testing:

1. Go to the terminal/command prompt window
2. Press **Ctrl + C** (or **Command + C** on Mac)
3. Type `Y` and press Enter if asked
4. The website will stop running

To start it again later, just type:
```bash
npm run dev
```

---

## ❓ Common Problems & Solutions

### Problem: "Port 3000 is already in use"

**Solution:**
1. Close any other programs running on your computer
2. Restart your computer
3. Try running `npm run dev` again

### Problem: "MongoDB connection error"

**Solution:**
1. Check your `backend/.env` file
2. Make sure your MongoDB connection string is correct
3. Make sure you replaced `<password>` with your actual password
4. Check if your IP address is allowed in MongoDB Atlas (go to Network Access in MongoDB Atlas)

### Problem: "Stripe payment not working"

**Solution:**
1. Make sure you're using the TEST card: `4242 4242 4242 4242`
2. Check that both Stripe keys in `.env` files start with `test`
3. Make sure you copied the complete key (they're very long!)

### Problem: "npm: command not found"

**Solution:**
1. You need to install Node.js (go back to Part 1, Step 1)
2. After installing, restart your computer
3. Try again

### Problem: "Cannot find module"

**Solution:**
1. Delete the `node_modules` folders (in root, backend, and frontend)
2. Run the install commands again:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

---

## 📚 What Each File Does (Simple Explanation)

- **backend/** - The "brain" of your website (handles data, payments, etc.)
- **frontend/** - What users see (the actual website design)
- **package.json** - List of tools the website needs
- **.env** - Your secret settings (passwords, API keys)
- **README.md** - Documentation for developers
- **node_modules/** - All the tools installed (this folder is HUGE!)

---

## 🎓 Next Steps (Optional)

### Want to customize products?

1. Edit `backend/seed.js` file
2. Find the `sampleProducts` array
3. Change product names, prices, descriptions
4. Run `npm run seed` again

### Want to change colors?

1. Open any file in `frontend/src/pages/` or `frontend/src/components/`
2. Look for `className="..."` 
3. Change colors like:
   - `bg-blue-600` → `bg-green-600` (changes background to green)
   - `text-red-500` → `text-purple-500` (changes text to purple)

### Want to add your own products?

1. Login as admin
2. Click the yellow "Admin" button
3. Go to "Products"
4. Click "Add Product"
5. Fill in the form
6. Click "Create"

---

## 💡 Tips for Non-Coders

1. **Don't panic if you see errors!** Most errors are just typos in the `.env` files.
2. **Copy and paste carefully** - API keys are very long and easy to mistype
3. **Always use the TEST Stripe keys** (the ones with `test` in them)
4. **Save your work** - The `.env` files are important!
5. **Ask for help** - If stuck, Google the error message or ask a developer friend

---

## 🎉 You Did It!

**Congratulations!** You've successfully set up and run a complete e-commerce website!

You now have:
- ✅ A working online store
- ✅ User registration and login
- ✅ Shopping cart
- ✅ Real payment processing (test mode)
- ✅ Admin dashboard
- ✅ Order management

**This is a huge achievement, especially for a non-coder!** 🎊

---

## 📞 Need More Help?

- **Read:** `START_HERE.md` for overview
- **Read:** `QUICK_START.md` for faster setup
- **Read:** `TESTING.md` for more test scenarios
- **Check:** `API.md` if you want to understand the technical side

---

## 🔒 Important Security Notes

**NEVER share these publicly:**
- ❌ Your `.env` files
- ❌ Your Stripe secret key
- ❌ Your MongoDB connection string

**For production (real website):**
- Get a real domain name
- Use production Stripe keys
- Secure your MongoDB database
- Use HTTPS (not HTTP)
- Change all passwords to strong ones

---

**Thank you for using ShopSwift!** 🚀

If this guide helped you, give yourself a pat on the back - you just set up a professional e-commerce platform! 🎉
