import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
import productsReducer from '../features/product-listing/productSlice';
import filterReducer from './slices/filterSlice';
import cartReducer, { initialState as cartInitialState } from './slices/cartSlice';

// Load cart from localStorage if available
const preloadedState = {
  cart: JSON.parse(localStorage.getItem('cart')) || cartInitialState
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productsReducer,
    filters: filterReducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['cart/loadFromLocalStorage'],
        // Ignore these paths in the state
        ignoredPaths: ['cart']
      }
    }).concat(apiSlice.middleware)
});

// Save cart to localStorage whenever it changes
store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

setupListeners(store.dispatch);
