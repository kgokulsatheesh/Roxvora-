import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  coupon: null,
  shipping: null,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingIndex = state.items.findIndex(
        (i) => i.id === item.id && i.variantId === item.variantId
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { itemId, variantId, quantity } = action.payload;
      const item = state.items.find((i) => i.id === itemId && i.variantId === variantId);
      if (item) {
        item.quantity = Math.max(1, quantity);
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    removeFromCart: (state, action) => {
      const { itemId, variantId } = action.payload;
      state.items = state.items.filter((i) => !(i.id === itemId && i.variantId === variantId));
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.shipping = null;
      cartSlice.caseReducers.calculateTotals(state);
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    removeCoupon: (state) => {
      state.coupon = null;
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (state.coupon?.type === 'percentage') {
        state.total = state.total * (1 - state.coupon.value / 100);
      } else if (state.coupon?.type === 'fixed') {
        state.total = Math.max(0, state.total - state.coupon.value);
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    hydrateCart: (state, action) => {
      state.items = action.payload.items || [];
      state.coupon = action.payload.coupon || null;
      state.shipping = action.payload.shipping || null;
      cartSlice.caseReducers.calculateTotals(state);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCoupon,
  removeCoupon,
  setShipping,
  setLoading: setCartLoading,
  hydrateCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartCoupon = (state) => state.cart.coupon;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartLoading = (state) => state.cart.isLoading;

export default cartSlice.reducer;