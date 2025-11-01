import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/order-success/:orderId"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute adminOnly>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute adminOnly>
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
