import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  useMediaQuery,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { GridView, ViewList } from '@mui/icons-material';
import { useGetProductsQuery, useGetCategoriesQuery } from '../store/api/productApi';
import FilterSidebar from '../components/filters/FilterSidebar';
import FilteredProductsList from '../components/products/FilteredProductsList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { SORT_OPTIONS, VIEW_MODES } from '../utils/constants';
import { setViewMode, setSortOption } from '../store/slices/filterSlice';

/**
 * ProductsPage component for displaying and filtering products
 */
const ProductsPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get categories
  const { data: categories = [] } = useGetCategoriesQuery();

  // Get products
  const { 
    data: allProducts = [], 
    isLoading: isProductsLoading,
    error: productsError 
  } = useGetProductsQuery();

  // Get filter state from Redux with default values
  const { 
    searchQuery = '', 
    selectedCategory = null, 
    priceRange = { min: 0, max: 10000 },
    viewMode = 'grid',
    sortOption = 'title_asc'
  } = useSelector((state) => state.filters || {});

  // Handlers
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      dispatch(setSearchQuery(e.target.value));
    }
  };

  const handleClearFilters = () => {
    dispatch(setSearchQuery(''));
    dispatch(setFilters({ category: 'all', priceRange: { min: 0, max: 1000 }, rating: 0 }));
  };

  // Handle view mode change
  const handleViewModeChange = (event, newViewMode) => {
    dispatch(setViewMode(newViewMode));
  };

  // Handle sort change
  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  if (isProductsLoading) return <LoadingSpinner />;
  if (productsError) return <ErrorBoundary error={productsError} />;

  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link 
            underline="hover"  
            color="inherit" 
            component="a" 
            href="/"
          >
            Home
          </Link>
          <Typography color="text.primary">Products</Typography>
        </Breadcrumbs>

        {/* Filter Sidebar and Products Grid */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '0 1 100px', order: 2, mb: 3 }}>
            <Paper sx={{ p: 2 }}>
              <FilterSidebar categories={categories} />
            </Paper>
          </Box>
          <Box sx={{ flex: '1 1 0', order: 1 }}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Products</Typography>
                <Stack direction="row" spacing={2}>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewModeChange}
                    size="small"
                  >
                    <ToggleButton value={VIEW_MODES.GRID}>
                      <GridView />
                    </ToggleButton>
                    <ToggleButton value={VIEW_MODES.LIST}>
                      <ViewList />
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <FormControl size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortOption}
                      onChange={handleSortChange}
                      label="Sort By"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Box>
              <FilteredProductsList products={allProducts} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsPage;
