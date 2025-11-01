import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading products...</div>
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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to ShopSwift
        </h1>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
