import { createSlice } from '@reduxjs/toolkit';
import { productApi } from '../api/productApi';

const initialState = {
  currentPage: 1,
  searchQuery: '',
  filters: {
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    rating: false
  },
  sortBy: 'price_asc',
  viewMode: 'grid', // 'grid' or 'list'
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
      state.currentPage = 1;
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        // Optional: Add any additional state updates when products are fetched
      }
    );
  },
});

export const {
  setFilters,
  setSearchQuery,
  setSortBy,
  setPage,
  setViewMode,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
