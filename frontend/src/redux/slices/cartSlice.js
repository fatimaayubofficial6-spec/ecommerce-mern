import { createSlice } from '@reduxjs/toolkit';

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: cartItems,
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find((x) => x._id === item._id);

      if (existItem) {
        state.items = state.items.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.items.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateCartItemQty: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((x) => x._id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQty,
  clearCart,
  saveShippingAddress,
} = cartSlice.actions;

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
