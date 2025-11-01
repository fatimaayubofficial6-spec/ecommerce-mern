import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Successful!
        </h1>

        <p className="text-gray-600 mb-2">
          Thank you for your purchase.
        </p>
        
        <p className="text-gray-600 mb-6">
          Your order ID is:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <code className="text-blue-600 font-mono text-sm break-all">
            {orderId}
          </code>
        </div>

        <p className="text-gray-600 mb-6">
          You will receive an email confirmation shortly.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
