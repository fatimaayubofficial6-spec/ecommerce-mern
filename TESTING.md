# Testing Guide for ShopSwift

## Manual Testing Checklist

### User Authentication

#### Register New User
1. Navigate to http://localhost:3000/register
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
3. Click "Register"
4. Should redirect to home page with user logged in
5. Navbar should show "Hi, Test User" and "Logout" button

#### Login Existing User
1. Navigate to http://localhost:3000/login
2. Use credentials: user@shopswift.com / user123
3. Click "Login"
4. Should redirect to home page
5. User should remain logged in after page refresh

#### Logout
1. Click "Logout" in navbar
2. Should redirect to home page
3. Navbar should show "Login" and "Register" buttons

### Product Browsing

#### View Products
1. Navigate to home page
2. Should see grid of 12 sample products
3. Each product card should display:
   - Product image
   - Name
   - Description (truncated)
   - Price
   - Stock availability

#### View Product Detail
1. Click on any product card
2. Should navigate to /products/:id
3. Should display:
   - Full product image
   - Complete description
   - Price
   - Category
   - Stock count
   - Quantity selector
   - "Add to Cart" button

### Shopping Cart

#### Add to Cart
1. On product detail page, select quantity
2. Click "Add to Cart"
3. Should redirect to /cart
4. Product should appear in cart with correct quantity
5. Cart badge in navbar should update

#### Update Quantity
1. In cart, change quantity using dropdown
2. Item total should update
3. Order total should update
4. Changes should persist after page refresh

#### Remove from Cart
1. Click "Remove" on any cart item
2. Item should be removed
3. Total should update
4. If cart becomes empty, should show "Your cart is empty" message

### Checkout & Payment

#### Checkout Process
1. With items in cart, click "Proceed to Checkout"
2. Fill in shipping address:
   - Address: 123 Main St
   - City: New York
   - Postal Code: 10001
   - Country: USA
3. Fill in Stripe test card: 4242 4242 4242 4242
4. Expiry: Any future date (e.g., 12/25)
5. CVC: Any 3 digits (e.g., 123)
6. Click "Pay $X.XX"

#### Payment Success
1. Should process payment
2. Redirect to /order-success/:orderId
3. Should display order ID
4. Cart should be empty
5. Cart badge should show 0

#### Test Payment Decline
1. Use card: 4000 0000 0000 0002
2. Should show error message
3. Order should not be created

### Admin Dashboard

#### Admin Login
1. Logout if logged in
2. Login with: admin@shopswift.com / admin123
3. Navbar should show "Admin" button in yellow
4. Click "Admin" button

#### Dashboard Home
1. Should display 4 stat cards:
   - Total Revenue
   - Total Orders
   - Total Products
   - Total Users
2. Should show revenue chart (if orders exist)
3. Should show recent orders table

#### Products Management
1. Click "Products" in admin navigation
2. Should list all products in table
3. Test "Add Product":
   - Click "Add Product"
   - Fill in all fields with test data
   - Click "Create"
   - New product should appear in list
4. Test "Edit Product":
   - Click "Edit" on any product
   - Modify fields
   - Click "Update"
   - Changes should be saved
5. Test "Delete Product":
   - Click "Delete" on any product
   - Confirm deletion
   - Product should be removed from list

#### Orders Management
1. Click "Orders" in admin navigation
2. Should list all orders
3. Each order should show:
   - Order ID
   - Customer name and email
   - Number of items
   - Total price
   - Payment status
   - Order status dropdown
   - Date
4. Test status change:
   - Select different status from dropdown
   - Status should update immediately

### Protected Routes

#### Unauthenticated Access
1. Logout
2. Try to access:
   - /cart - should redirect to /login
   - /checkout - should redirect to /login
   - /admin - should redirect to /login

#### Non-Admin Access
1. Login as regular user (user@shopswift.com)
2. Try to access /admin
3. Should redirect to home page

### Edge Cases

#### Empty States
- Empty product list (delete all products)
- Empty cart
- No orders in admin dashboard

#### Form Validation
- Register with mismatched passwords
- Register with existing email
- Login with wrong password
- Add product with missing fields
- Checkout with empty shipping address

#### Stock Management
- Add more quantity than available stock
- Product detail page should limit quantity selector to stock

## API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@shopswift.com",
    "password": "admin123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Create Product (Admin)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Product",
    "description": "Test Description",
    "price": 99.99,
    "image": "https://via.placeholder.com/500",
    "category": "Test",
    "stock": 10
  }'
```

### Get Admin Stats
```bash
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

## Browser Testing

### Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Design
Test on different screen sizes:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1920px width

### LocalStorage Persistence
1. Add items to cart
2. Close browser tab
3. Open new tab to http://localhost:3000
4. Login with same user
5. Cart should still contain items

## Performance Testing

### Page Load Times
- Home page: < 2 seconds
- Product detail: < 1 second
- Admin dashboard: < 3 seconds

### Database Operations
- Product fetch: < 500ms
- Order creation: < 1 second
- Admin stats: < 2 seconds

## Security Testing

### JWT Token
- Try to access protected routes without token
- Try to use expired token
- Try to access admin routes with non-admin token

### Input Validation
- SQL injection attempts (should fail with MongoDB)
- XSS attempts in product name/description
- Long strings in form inputs

## Known Limitations

1. No image upload (uses external URLs)
2. No email verification
3. No password reset functionality
4. No product reviews/ratings implementation
5. No shipping cost calculation
6. No tax calculation
7. Single currency (USD only)
8. No inventory updates on order placement

## Future Testing Needs

- Unit tests with Jest
- Integration tests with Supertest
- E2E tests with Cypress or Playwright
- Load testing with Artillery
- Accessibility testing with axe
