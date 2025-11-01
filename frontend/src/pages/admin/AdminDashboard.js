import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await adminAPI.getStats();
      setStats(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
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
              className="text-blue-600 hover:text-blue-800 font-semibold"
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
              className="text-gray-600 hover:text-gray-800"
            >
              Orders
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-500 text-sm mb-2">Total Revenue</div>
            <div className="text-3xl font-bold text-green-600">
              ${stats?.totalRevenue?.toFixed(2) || '0.00'}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-500 text-sm mb-2">Total Orders</div>
            <div className="text-3xl font-bold text-blue-600">
              {stats?.totalOrders || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-500 text-sm mb-2">Total Products</div>
            <div className="text-3xl font-bold text-purple-600">
              {stats?.totalProducts || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-500 text-sm mb-2">Total Users</div>
            <div className="text-3xl font-bold text-orange-600">
              {stats?.totalUsers || 0}
            </div>
          </div>
        </div>

        {stats?.revenueByDay && stats.revenueByDay.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Revenue Trend (Last 30 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.revenueByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          
          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono">
                        {order._id.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-4">{order.user?.name}</td>
                      <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
