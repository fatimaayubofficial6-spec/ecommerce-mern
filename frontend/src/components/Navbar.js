import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { selectCartItemsCount } from '../redux/slices/cartSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector(selectCartItemsCount);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            ShopSwift
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/cart" className="hover:text-blue-200 transition relative">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <span className="text-blue-200">
                  Hi, {user.name}
                </span>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
