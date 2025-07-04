import { useState, useMemo, useEffect, useCallback } from 'react';
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
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/filters/FilterSidebar';
import FilteredProductsList from '../components/products/FilteredProductsList';
import { 
  setViewMode, 
  setSearchQuery,
  resetFilters,
  setSelectedCategory,
  setPriceRange,
  setMinRating,
  updateUrlParams,
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
  const [searchInput, setSearchInput] = useState('');
  
  const [searchParams] = useSearchParams();
  
  // Initialize filters from URL on component mount
  useEffect(() => {
    // Get all URL parameters
    const urlSearchQuery = searchParams.get('q') || '';
    const urlCategory = searchParams.get('category') || null;
    const urlMinPrice = searchParams.get('minPrice');
    const urlMaxPrice = searchParams.get('maxPrice');
    const urlRating = searchParams.get('rating');
    const urlSort = searchParams.get('sort');
    const urlView = searchParams.get('view');
    
    // Set initial search input from URL
    setSearchInput(urlSearchQuery);
    
    // Initialize filters from URL
    const filters = {};
    
    if (urlSearchQuery) filters.searchQuery = urlSearchQuery;
    if (urlCategory) filters.selectedCategory = urlCategory;
    if (urlMinPrice || urlMaxPrice) {
      filters.priceRange = {
        min: urlMinPrice ? Number(urlMinPrice) : 0,
        max: urlMaxPrice ? Number(urlMaxPrice) : 10000
      };
    }
    if (urlRating) filters.minRating = Number(urlRating);
    if (urlSort) filters.sortOption = urlSort;
    if (urlView) filters.viewMode = urlView;
    
    if (Object.keys(filters).length > 0) {
      dispatch(setFilters(filters));
    }
  }, [dispatch, searchParams]);
  
  // Debounced search handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearchQuery(value));
    }, 500),
    [dispatch]
  );
  
  // Update debounced search when searchInput changes
  useEffect(() => {
    debouncedSearch(searchInput);
    
    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch]);

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
  
  // Memoize the active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory) count++;
    if (priceRange?.min > 0 || priceRange?.max < 10000) count++;
    if (minRating > 0) count++;
    return count;
  }, [searchQuery, selectedCategory, priceRange, minRating]);
  
  // Memoize filter values to prevent unnecessary re-renders
  const filterValues = useMemo(
    () => ({
      searchQuery,
      selectedCategory,
      priceRange,
      minRating,
      sortOption
    }),
    [searchQuery, selectedCategory, priceRange, minRating, sortOption]
  );

  // Handlers
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const handleClearFilters = useCallback(() => {
    dispatch(resetFilters());
    setSearchInput('');
    
    // Update URL after a short delay
    setTimeout(() => {
      dispatch(updateUrlParams());
    }, 0);
  }, [dispatch]);

  const handleViewModeChange = (newViewMode) => {
    dispatch(setViewMode(newViewMode));
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
                  value={searchInput}
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
                    onClick={() => handleViewModeChange('grid')}
                    startIcon={<GridViewIcon />}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => handleViewModeChange('list')}
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
          <FilteredProductsList 
            products={allProducts} 
            viewMode={viewMode}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            minRating={minRating}
            sortOption={sortOption}
          />
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
        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={toggleMobileFilters}
            sx={{ py: 1.5 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default ProductsPage;