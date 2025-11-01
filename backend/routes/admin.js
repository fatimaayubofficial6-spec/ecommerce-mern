const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.find({ isPaid: true });
    
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const revenueByDay = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: { $gte: last30Days }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      recentOrders,
      revenueByDay,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
