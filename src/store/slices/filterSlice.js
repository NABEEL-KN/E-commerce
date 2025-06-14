import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';

// Helper function to parse URL parameters
const parseUrlParams = (searchParams) => {
  const params = {};
  
  // Parse search query
  if (searchParams.get('q')) {
    params.searchQuery = searchParams.get('q');
  }
  
  // Parse category
  if (searchParams.get('category')) {
    params.selectedCategory = searchParams.get('category');
  }
  
  // Parse price range
  if (searchParams.get('minPrice') || searchParams.get('maxPrice')) {
    params.priceRange = {
      min: Number(searchParams.get('minPrice')) || 0,
      max: Number(searchParams.get('maxPrice')) || 10000
    };
  }
  
  // Parse rating
  if (searchParams.get('rating')) {
    params.minRating = Number(searchParams.get('rating'));
  }
  
  // Parse sort option
  if (searchParams.get('sort')) {
    params.sortOption = searchParams.get('sort');
  }
  
  // Parse view mode
  if (searchParams.get('view')) {
    params.viewMode = searchParams.get('view');
  }
  
  return params;
};

// Helper function to update URL parameters
const updateUrlParamsHelper = (state) => {
  if (typeof window === 'undefined') return;
  
  const searchParams = new URLSearchParams();
  
  // Add search query
  if (state.searchQuery) {
    searchParams.set('q', state.searchQuery);
  }
  
  // Add category
  if (state.selectedCategory) {
    searchParams.set('category', state.selectedCategory);
  }
  
  // Add price range
  if (state.priceRange.min > 0 || state.priceRange.max < 10000) {
    searchParams.set('minPrice', state.priceRange.min);
    searchParams.set('maxPrice', state.priceRange.max);
  }
  
  // Add rating
  if (state.minRating > 0) {
    searchParams.set('rating', state.minRating);
  }
  
  // Add sort option
  if (state.sortOption && state.sortOption !== 'title_asc') {
    searchParams.set('sort', state.sortOption);
  }
  
  // Add view mode
  if (state.viewMode && state.viewMode !== 'grid') {
    searchParams.set('view', state.viewMode);
  }
  
  // Update URL without page reload
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, '', newUrl);
};

// Initial filter state
const initialFilterState = {
  // Search and filter
  searchQuery: '',
  selectedCategory: null,
  priceRange: {
    min: 0,
    max: 10000
  },
  minRating: 0,
  
  // UI state
  viewMode: 'grid',
  sortOption: 'title_asc',
  
  // Additional filters
  filters: {},
  
  // URL params loaded flag
  _urlParamsLoaded: false
};

const initialState = initialFilterState;

// Thunk to initialize filters from URL
const initializeFiltersFromUrl = createAsyncThunk(
  'filters/initializeFromUrl',
  async (_, { getState, dispatch }) => {
    if (typeof window === 'undefined') return;
    
    const searchParams = new URLSearchParams(window.location.search);
    const params = parseUrlParams(searchParams);
    
    if (Object.keys(params).length > 0) {
      dispatch(setFilters(params));
    }
    
    return params;
  }
);

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload || '';
    },
    
    // Set selected category
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload || null;
    },
    
    // Set price range
    setPriceRange: (state, action) => {
      if (action.payload) {
        state.priceRange = {
          min: Number(action.payload.min) || 0,
          max: Number(action.payload.max) || 10000
        };
      }
    },
    
    // Set minimum rating
    setMinRating: (state, action) => {
      state.minRating = Math.min(5, Math.max(0, Number(action.payload) || 0));
    },
    
    // Set view mode (grid/list)
    setViewMode: (state, action) => {
      if (['grid', 'list'].includes(action.payload)) {
        state.viewMode = action.payload;
      }
    },
    
    // Set sort option
    setSortOption: (state, action) => {
      const validSortOptions = [
        'title_asc', 'title_desc', 'price_asc', 'price_desc'
      ];
      if (validSortOptions.includes(action.payload)) {
        state.sortOption = action.payload;
      }
    },
    
    // Set multiple filters at once
    setFilters: (state, action) => {
      if (action.payload && typeof action.payload === 'object') {
        Object.keys(action.payload).forEach(key => {
          if (key in state) {
            switch (key) {
              case 'priceRange':
                state.priceRange = {
                  min: Number(action.payload[key].min) || 0,
                  max: Number(action.payload[key].max) || 10000
                };
                break;
              case 'minRating':
                state.minRating = Math.min(5, Math.max(0, Number(action.payload[key]) || 0));
                break;
              case 'viewMode':
                if (['grid', 'list'].includes(action.payload[key])) {
                  state.viewMode = action.payload[key];
                }
                break;
              case 'sortOption':
                const validSortOptions = [
                  'title_asc', 'title_desc', 'price_asc', 'price_desc'
                ];
                if (validSortOptions.includes(action.payload[key])) {
                  state.sortOption = action.payload[key];
                }
                break;
              default:
                state[key] = action.payload[key];
            }
          }
        });
      }
    },
    
    // Reset all filters to initial state
    resetFilters: (state) => {
      const newState = { ...initialState, _urlParamsLoaded: true };
      updateUrlParamsHelper(newState);
      return newState;
    },
    
    // Action to update URL params without changing state
    updateUrlParams: (state) => {
      updateUrlParamsHelper(state);
    }
  }
});

// Export actions
export const { 
  setSearchQuery, 
  setSelectedCategory, 
  setPriceRange, 
  setMinRating,
  setViewMode,
  setSortOption,
  setFilters,
  resetFilters,
  updateUrlParams
} = filterSlice.actions;

// Memoized selectors
const selectFiltersState = (state) => state.filters;

// Selector factory for price range with memoization
export const selectPriceRange = createSelector(
  [selectFiltersState],
  (filters) => {
    // Always return the same object reference if values haven't changed
    const defaultRange = { min: 0, max: 10000 };
    if (!filters?.priceRange) return defaultRange;
    return {
      min: filters.priceRange.min || 0,
      max: filters.priceRange.max || 10000
    };
  }
);

// Other selectors
export const selectAllFilters = createSelector(
  [selectFiltersState],
  (filters) => filters
);

export const selectSearchQuery = createSelector(
  [selectFiltersState],
  (filters) => filters?.searchQuery || ''
);

export const selectSelectedCategory = createSelector(
  [selectFiltersState],
  (filters) => filters?.selectedCategory || null
);

export const selectMinRating = createSelector(
  [selectFiltersState],
  (filters) => filters?.minRating || 0
);

export const selectViewMode = createSelector(
  [selectFiltersState],
  (filters) => filters?.viewMode || 'grid'
);

export const selectSortOption = createSelector(
  [selectFiltersState],
  (filters) => filters?.sortOption || 'title_asc'
);

// Export reducer
export const filterReducer = filterSlice.reducer;
export default filterReducer;
