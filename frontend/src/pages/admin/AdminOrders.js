import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/ordersSlice';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { items: orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    dispatch(fetchAllOrders());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin"
              className="text-gray-600 hover:text-gray-800"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="text-gray-600 hover:text-gray-800"
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Orders
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Orders Management</h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono">
                        {order._id.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-semibold">{order.user?.name}</div>
                          <div className="text-sm text-gray-500">{order.user?.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {order.orderItems.length} item(s)
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
