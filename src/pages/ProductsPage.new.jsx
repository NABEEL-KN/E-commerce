import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Drawer,
  useMediaQuery,
  IconButton,
  Divider,
  Button,
  Stack,
  TextField,
  InputAdornment,
  CircularProgress,
  Paper,
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useGetProductsQuery, useGetCategoriesQuery } from '../store/api/productApi';
import FilterSidebar from '../components/filters/FilterSidebar';
import FilteredProductsList from '../components/products/FilteredProductsList';
import { 
  setViewMode, 
  setSearchQuery,
  resetFilters,
  setSelectedCategory,
  setPriceRange,
  setMinRating,
  selectViewMode,
  selectSearchQuery,
  selectSelectedCategory,
  selectPriceRange,
  selectMinRating,
  selectSortOption
} from '../store/slices/filterSlice';

/**
 * ProductsPage component for displaying and filtering products
 */
const ProductsPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  // Get products
  const { 
    data: allProducts = [], 
    isLoading: isProductsLoading,
    error: productsError 
  } = useGetProductsQuery();

  // Get filter state from Redux
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const priceRange = useSelector(selectPriceRange);
  const minRating = useSelector(selectMinRating);
  const viewMode = useSelector(selectViewMode);
  const sortOption = useSelector(selectSortOption);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory) count++;
    if (priceRange?.min > 0 || priceRange?.max < 10000) count++;
    if (minRating > 0) count++;
    return count;
  }, [searchQuery, selectedCategory, priceRange, minRating]);

  // Handlers
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      dispatch(setViewMode(newViewMode));
    }
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  // Function to remove a specific filter
  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search':
        dispatch(setSearchQuery(''));
        break;
      case 'category':
        dispatch(setSelectedCategory(null));
        break;
      case 'price':
        dispatch(setPriceRange({ min: 0, max: 10000 }));
        break;
      case 'rating':
        dispatch(setMinRating(0));
        break;
      default:
        break;
    }
  };

  // Get unique categories for the filter
  const uniqueCategories = useMemo(() => {
    if (!allProducts.length) return [];
    return [...new Set(allProducts.map(product => {
      return typeof product.category === 'object' ? product.category.name : product.category;
    }))].filter(Boolean);
  }, [allProducts]);

  // Show loading state
  if (isProductsLoading || isCategoriesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (productsError) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>
          Failed to load products. Please try again later.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Generate breadcrumbs
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="2" color="text.primary">
      Products
    </Typography>,
  ];

  // Generate filter chips
  const filterChips = [];
  
  if (searchQuery) {
    filterChips.push({
      key: 'search',
      label: `Search: "${searchQuery}"`,
      onDelete: () => removeFilter('search')
    });
  }
  
  if (selectedCategory) {
    filterChips.push({
      key: 'category',
      label: `Category: ${selectedCategory}`,
      onDelete: () => removeFilter('category')
    });
  }
  
  if (priceRange?.min > 0 || priceRange?.max < 10000) {
    filterChips.push({
      key: 'price',
      label: `Price: $${priceRange.min} - $${priceRange.max}`,
      onDelete: () => removeFilter('price')
    });
  }
  
  if (minRating > 0) {
    filterChips.push({
      key: 'rating',
      label: `${minRating}+ Stars`,
      onDelete: () => removeFilter('rating')
    });
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Our Products
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          {breadcrumbs}
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3}>
        {/* Sidebar - Desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ p: 2, position: 'sticky', top: 100, borderRadius: 2 }}>
              <FilterSidebar categories={uniqueCategories} />
            </Paper>
          </Grid>
        )}

        {/* Main Content */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          {/* Search and Filter Bar */}
          <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={toggleMobileFilters}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  Filters
                  {activeFilterCount > 0 && (
                    <Box 
                      component="span" 
                      sx={{
                        ml: 1,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                      }}
                    >
                      {activeFilterCount}
                    </Box>
                  )}
                </Button>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => handleViewModeChange(null, 'grid')}
                    startIcon={<GridViewIcon />}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => handleViewModeChange(null, 'list')}
                    startIcon={<ViewListIcon />}
                  >
                    List
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Active Filters */}
          {filterChips.length > 0 && (
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              {filterChips.map((chip) => (
                <Chip
                  key={chip.key}
                  label={chip.label}
                  onDelete={chip.onDelete}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
              <Button 
                size="small" 
                onClick={handleClearFilters}
                sx={{ textTransform: 'none' }}
              >
                Clear all
              </Button>
            </Box>
          )}

          {/* Products Grid */}
          <FilteredProductsList products={allProducts} />
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileFiltersOpen}
        onClose={toggleMobileFilters}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '90%',
            maxWidth: 400,
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={toggleMobileFilters}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <FilterSidebar categories={uniqueCategories} />
      </Drawer>
    </Container>
  );
};

export default ProductsPage;
