import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  filters: {
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    rating: false
  },
  searchQuery: '',
  sortBy: 'price_asc'
};

const productListingSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const { setFilters, setSearchQuery, setSortBy, setPage } = productListingSlice.actions;
export default productListingSlice.reducer;

// Selectors
export const selectFilteredProducts = (state) => {
  const { currentPage, filters, searchQuery, sortBy } = state.products;
  return state.products || [];
};

export const selectSortedProducts = (state) => {
  const { currentPage, filters, searchQuery, sortBy } = state.products;
  return state.products || [];
};
