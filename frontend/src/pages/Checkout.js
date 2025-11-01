import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { selectCartTotal, saveShippingAddress, clearCart } from '../redux/slices/cartSlice';
import { createOrder } from '../redux/slices/ordersSlice';
import { paymentAPI } from '../services/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { items, shippingAddress } = useSelector((state) => state.cart);
  const total = useSelector(selectCartTotal);
  
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const shippingData = { address, city, postalCode, country };
      dispatch(saveShippingAddress(shippingData));

      const { data } = await paymentAPI.createIntent(total);
      const clientSecret = data.clientSecret;

      const cardElement = elements.getElement(CardElement);
      
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        const orderData = {
          orderItems: items.map(item => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
          })),
          shippingAddress: shippingData,
          paymentMethod: 'Stripe',
          totalPrice: total,
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
          },
        };

        const resultAction = await dispatch(createOrder(orderData));
        
        if (createOrder.fulfilled.match(resultAction)) {
          dispatch(clearCart());
          navigate(`/order-success/${resultAction.payload._id}`);
        } else {
          setError('Failed to create order');
        }
      }
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Shipping Address
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Payment Information
                  </h2>
                  <div className="p-4 border border-gray-300 rounded-lg">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Test card: 4242 4242 4242 4242, any future date, any CVC
                  </p>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
