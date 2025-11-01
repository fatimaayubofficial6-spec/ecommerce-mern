# ShopSwift API Documentation

Base URL: `http://localhost:5000`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Token is returned on successful login/register and should be stored by the client.

## Response Format

### Success Response
```json
{
  "data": { ... },
  "_id": "...",
  "name": "..."
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

---

## Auth Routes

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "token": "jwt_token"
}
```

**Errors:**
- `400` - User already exists
- `400` - Invalid user data

---

### POST /api/auth/login
Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "token": "jwt_token"
}
```

**Errors:**
- `401` - Invalid email or password

---

### GET /api/auth/profile
Get current user profile. **[Protected]**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- `401` - Not authorized

---

## Product Routes

### GET /api/products
Get all products.

**Response:** `200 OK`
```json
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "image": "https://example.com/image.jpg",
    "category": "Electronics",
    "stock": 50,
    "rating": 4.5,
    "numReviews": 128,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /api/products/:id
Get single product by ID.

**Parameters:**
- `id` - Product ID

**Response:** `200 OK`
```json
{
  "_id": "product_id",
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 50,
  "rating": 4.5,
  "numReviews": 128,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- `404` - Product not found

---

### POST /api/products
Create new product. **[Protected, Admin Only]**

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 50
}
```

**Response:** `201 Created`
```json
{
  "_id": "product_id",
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 50,
  "rating": 0,
  "numReviews": 0,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- `401` - Not authorized
- `403` - Not authorized as admin

---

### PUT /api/products/:id
Update product. **[Protected, Admin Only]**

**Parameters:**
- `id` - Product ID

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 89.99,
  "image": "https://example.com/new-image.jpg",
  "category": "Electronics",
  "stock": 75
}
```

**Response:** `200 OK`
```json
{
  "_id": "product_id",
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 89.99,
  "image": "https://example.com/new-image.jpg",
  "category": "Electronics",
  "stock": 75,
  "rating": 4.5,
  "numReviews": 128,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

**Errors:**
- `401` - Not authorized
- `403` - Not authorized as admin
- `404` - Product not found

---

### DELETE /api/products/:id
Delete product. **[Protected, Admin Only]**

**Parameters:**
- `id` - Product ID

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "message": "Product removed"
}
```

**Errors:**
- `401` - Not authorized
- `403` - Not authorized as admin
- `404` - Product not found

---

## Order Routes

### POST /api/orders
Create new order. **[Protected]**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "image": "https://example.com/image.jpg",
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "Stripe",
  "totalPrice": 199.98,
  "paymentResult": {
    "id": "pi_stripe_payment_intent_id",
    "status": "succeeded",
    "update_time": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response:** `201 Created`
```json
{
  "_id": "order_id",
  "user": "user_id",
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "Stripe",
  "paymentResult": {...},
  "totalPrice": 199.98,
  "isPaid": true,
  "paidAt": "2024-01-01T00:00:00.000Z",
  "status": "Paid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- `400` - No order items
- `401` - Not authorized

---

### GET /api/orders
Get current user's orders. **[Protected]**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "_id": "order_id",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [...],
    "shippingAddress": {...},
    "paymentMethod": "Stripe",
    "totalPrice": 199.98,
    "isPaid": true,
    "paidAt": "2024-01-01T00:00:00.000Z",
    "status": "Paid",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Errors:**
- `401` - Not authorized

---

### GET /api/orders/all
Get all orders. **[Protected, Admin Only]**

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
[
  {
    "_id": "order_id",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [...],
    "shippingAddress": {...},
    "paymentMethod": "Stripe",
    "totalPrice": 199.98,
    "isPaid": true,
    "paidAt": "2024-01-01T00:00:00.000Z",
    "status": "Paid",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Errors:**
- `401` - Not authorized
- `403` - Not authorized as admin

---

### GET /api/orders/:id
Get single order by ID. **[Protected]**

**Parameters:**
- `id` - Order ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "_id": "order_id",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "Stripe",
  "totalPrice": 199.98,
  "isPaid": true,
  "paidAt": "2024-01-01T00:00:00.000Z",
  "status": "Paid",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- `401` - Not authorized
- `404` - Order not found

---

### PUT /api/orders/:id/status
Update order status. **[Protected, Admin Only]**

**Parameters:**
- `id` - Order ID

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "Shipped"
}
```

**Valid Status Values:**
- `Pending`
- `Paid`
- `Shipped`
- `Delivered`
- `Cancelled`

**Response:** `200 OK`
```json
{
  "_id": "order_id",
  "user": "user_id",
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "Stripe",
  "totalPrice": 199.98,
  "isPaid": true,
  "paidAt": "2024-01-01T00:00:00.000Z",
  "status": "Shipped",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

**Errors:**
- `401` - Not authorized
- `403` - Not authorized as admin
- `404` - Order not found

---

## Payment Routes

### POST /api/payment/create-intent
Create Stripe payment intent. **[Protected]**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 199.98
}
```

**Response:** `200 OK`
```json
{
  "clientSecret": "pi_xxx_secret_xxx"
}
```

**Errors:**
- `401` - Not authorized
- `500` - Stripe error

---

## Admin Routes

### GET /api/admin/stats
Get dashboard statistics. **[Protected, Admin Only]**

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "totalOrders": 42,
  "totalRevenue": 4199.58,
  "totalProducts": 12,
  "totalUsers": 25,
  "recentOrders": [
    {
      "_id": "order_id",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "totalPrice": 199.98,
      "status": "Paid",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "revenueByDay": [
    {
      "_id": "2024-01-01",
      "revenue": 599.94,
      "orders": 3
    }
  ]
}
```

**Errors:**
- `401` - Not authorized
- `403` - Not authorized as admin

---

## Error Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request (validation error) |
| 401  | Unauthorized (not logged in or invalid token) |
| 403  | Forbidden (not admin) |
| 404  | Not Found |
| 500  | Internal Server Error |

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding rate limiting middleware like `express-rate-limit`.

## CORS

CORS is enabled for all origins in development. For production, restrict to your frontend domain only.
