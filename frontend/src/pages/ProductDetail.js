import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct: product, isLoading, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        stock: product.stock,
        quantity,
      })
    );
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-gray-700">Category: </span>
                <span className="font-semibold">{product.category}</span>
              </div>

              <div className="mb-6">
                <span className="text-gray-700">Stock: </span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>

              {product.stock > 0 && (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Quantity:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
