const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with GPS, heart rate monitoring, and 7-day battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Wearables',
    stock: 35,
    rating: 4.8,
    numReviews: 256,
  },
  {
    name: 'Leather Laptop Bag',
    description: 'Premium genuine leather laptop bag with multiple compartments for 15-inch laptops.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 25,
    rating: 4.3,
    numReviews: 89,
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with RGB lighting and programmable buttons.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Gaming',
    stock: 60,
    rating: 4.6,
    numReviews: 342,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: '360-degree sound, waterproof design, and 12-hour playtime for outdoor adventures.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Audio',
    stock: 45,
    rating: 4.4,
    numReviews: 178,
  },
  {
    name: 'USB-C Hub Multi-Port Adapter',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 80,
    rating: 4.2,
    numReviews: 95,
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical keyboard with customizable RGB lighting and tactile switches.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    category: 'Gaming',
    stock: 30,
    rating: 4.7,
    numReviews: 421,
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1591290619762-d2c6e2650a5a?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 100,
    rating: 4.1,
    numReviews: 156,
  },
  {
    name: '4K Webcam',
    description: 'Ultra HD 4K webcam with auto-focus and noise-cancelling microphone for streaming.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 20,
    rating: 4.9,
    numReviews: 278,
  },
  {
    name: 'Phone Stand Adjustable',
    description: 'Aluminum adjustable phone stand for desk, compatible with all smartphones and tablets.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 150,
    rating: 4.0,
    numReviews: 67,
  },
  {
    name: 'Smart LED Light Bulb',
    description: 'WiFi-enabled smart bulb with 16 million colors and voice control compatibility.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&h=500&fit=crop',
    category: 'Smart Home',
    stock: 200,
    rating: 4.3,
    numReviews: 234,
  },
  {
    name: 'Laptop Cooling Pad',
    description: 'Ergonomic laptop cooling pad with 5 quiet fans and adjustable height.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 55,
    rating: 4.4,
    numReviews: 112,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log('Data cleared');

    await Product.insertMany(sampleProducts);
    console.log('Sample products created');

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopswift.com',
      password: 'admin123',
      isAdmin: true,
    });

    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@shopswift.com',
      password: 'user123',
      isAdmin: false,
    });

    console.log('Sample users created');
    console.log('\nAdmin Credentials:');
    console.log('Email: admin@shopswift.com');
    console.log('Password: admin123');
    console.log('\nUser Credentials:');
    console.log('Email: user@shopswift.com');
    console.log('Password: user123');

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
