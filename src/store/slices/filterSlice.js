import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  selectedCategory: null,
  priceRange: {
    min: 0,
    max: 10000
  },
  viewMode: 'grid',
  sortOption: 'title_asc'
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = null;
      state.priceRange = initialState.priceRange;
    }
  }
});

export const { 
  setSearchQuery, 
  setSelectedCategory, 
  setPriceRange, 
  setViewMode,
  setSortOption,
  resetFilters 
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
export default filterReducer;
