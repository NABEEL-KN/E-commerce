import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  searchQuery: '',
  filters: {
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    rating: false
  },
  sortBy: 'price_asc',
  viewMode: 'grid'
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    }
  }
});

export const {
  setSearchQuery,
  setFilters,
  setSortBy,
  setPage,
  setViewMode
} = productSlice.actions;

export default productSlice.reducer;
