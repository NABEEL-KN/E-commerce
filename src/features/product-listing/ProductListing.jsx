import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Grid,
} from '@mui/material';

// Simple debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../store/api/productApi';
import { setFilters, setSearchQuery, setSortBy, setPage } from '../../store/slices/productSlice';
import ProductGrid from './ProductGrid';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import Pagination from './Pagination';

const ProductListing = () => {
  const dispatch = useDispatch();
  const {
    currentPage = 1,
    searchQuery = '',
    filters = {
      category: 'all',
      priceRange: { min: 0, max: 1000 },
      rating: false
    },
    sortBy = 'price_asc'
  } = useSelector((state) => state.products);
  const { data: allProducts = [], isLoading, error } = useGetProductsQuery({
    limit: 24,
    sortBy: sortBy || undefined
  });

  // Apply all filters
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    const matchesCategory = filters.category === 'all' || product.category.toLowerCase() === filters.category.toLowerCase();
    
    // Search filter
    const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price range filter
    const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
    
    // Rating filter
    const matchesRating = !filters.rating || product.rating.rate >= 4;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  // Apply sorting
  const products = [...filteredProducts].sort((a, b) => {
    const [field, order] = sortBy.split('_');
    
    // Handle special cases
    if (field === 'popularity') {
      return order === 'asc' 
        ? a.rating.count - b.rating.count 
        : b.rating.count - a.rating.count;
    }
    
    if (field === 'latest') {
      // Assuming products have a date field, you might need to adjust this
      return order === 'asc' 
        ? new Date(a.date) - new Date(b.date) 
        : new Date(b.date) - new Date(a.date);
    }
    
    // Default sorting (price)
    return order === 'asc' 
      ? a.price - b.price 
      : b.price - a.price;
  });

  // Debounced search to prevent excessive API calls
  const debouncedSearch = React.useCallback(
    (value) => {
      dispatch(setSearchQuery(value));
      dispatch(setPage(1));
    },
    [dispatch]
  );

  const handleSearch = (event) => {
    debounce(debouncedSearch(event.target.value), 300);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        py: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="xl">
        {/* Main Heading */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: 1,
            color: 'primary.main',
            textAlign: 'center',
            mb: 2.5,
            textShadow: '0 2px 12px rgba(60,72,88,0.08)',
          }}
        >
          ShopSmart Products
        </Typography>

        {/* Filters, Search, Sort Section */}
        <Grid container spacing={10} alignItems="stretch" sx={{ mb: 2 }}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={2} lg={2}>
            <Filters
              filters={filters}
              onFilterChange={(newFilters) => dispatch(setFilters(newFilters))}
            />
          </Grid>

          {/* Search and Sort */}
          <Grid item xs={12} md={10} lg={10}>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: 3,
                boxShadow: '0 2px 8px 0 rgba(60,72,88,0.10)',
                p: { xs: 2, md: 2.5 },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: { xs: 2, md: 3 },
                width: '100%',
                minWidth: 0,
                boxSizing: 'border-box',
                mb: 2,
              }}
            >
              <Box sx={{ flex: 2, mr: { md: 2 } }}>
                <TextField
                  fullWidth
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={handleSearch}
                  size="medium"
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '& .MuiInputBase-root': {
                      fontSize: 16,
                      fontWeight: 500,
                      bgcolor: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover': {
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(33,150,243,0.04)',
                      }
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(33,150,243,0.08)',
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <IconButton 
                        edge="start" 
                        sx={{ 
                          color: 'primary.main', 
                          mr: 1 
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ flexShrink: 0, minWidth: 160, width: { xs: '100%', md: 'auto' }, display: 'flex', alignItems: 'center' }}>
                <SortDropdown
                  value={sortBy}
                  onChange={(newSort) => dispatch(setSortBy(newSort))}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 'none',
                    fontWeight: 500,
                    minWidth: 160,
                    '& .MuiSelect-select': {
                      py: 1.2,
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Products Section */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                minHeight: 500,
                p: { xs: 1, md: 2 },
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 1px 8px 0 rgba(60,72,88,0.06)',
              }}
            >
              {isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 400,
                  }}
                >
                  <CircularProgress size={48} />
                </Box>
              ) : error ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    p: 4,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                    Error loading products
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {error}
                  </Typography>
                </Box>
              ) : (
                <>
                  <ProductGrid products={products || []} />
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Pagination />
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductListing;
