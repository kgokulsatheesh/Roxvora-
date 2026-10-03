import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((i) => i.id === item.id);
      if (!exists) {
        state.items.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((i) => i.id !== productId);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    moveToCart: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i.id === productId);
      if (item) {
        state.items = state.items.filter((i) => i.id !== productId);
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    hydrateWishlist: (state, action) => {
      state.items = action.payload || [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  moveToCart,
  setLoading: setWishlistLoading,
  hydrateWishlist,
} = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectWishlistLoading = (state) => state.wishlist.isLoading;

export default wishlistSlice.reducer;