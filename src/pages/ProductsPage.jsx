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
} from '@mui/material';
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
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  // Get products
  const { 
    data: allProducts = [], 
    isLoading: isProductsLoading,
    error: productsError 
  } = useGetProductsQuery();

  // Get filter state
  const { 
    searchQuery, 
    selectedCategory, 
    priceRange,
    viewMode,
    sortOption
  } = useSelector((state) => state.filters);

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
          <Box sx={{ flex: '0 1 300px', order: 2, mb: 3 }}>
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
                    onChange={handleSortChange}
                  >
                    <MenuItem value={SORT_OPTIONS.FEATURED}>Featured</MenuItem>
                    <MenuItem value={SORT_OPTIONS.PRICE_LOW_TO_HIGH}>Price: Low to High</MenuItem>
                    <MenuItem value={SORT_OPTIONS.PRICE_HIGH_TO_LOW}>Price: High to Low</MenuItem>
                    <MenuItem value={SORT_OPTIONS.RATING}>Top Rated</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Search Products"
                  variant="outlined"
                  defaultValue={storeSearchQuery}
                  onKeyDown={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Paper>
            </Grid>
          )}

          {/* Products Grid */}
          <Grid item xs={12} md={!isMobile ? 9 : 12}>
            {/* View Controls */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2 
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </Typography>
              
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
                size="small"
              >
                <ToggleButton value={VIEW_MODES.GRID} aria-label="grid view">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value={VIEW_MODES.LIST} aria-label="list view">
                  <ListViewIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }}
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </Paper>
            ) : (
              <Grid 
                container 
                spacing={2} 
                columns={viewMode === VIEW_MODES.GRID ? { xs: 12, sm: 12, md: 12 } : { xs: 12 }}
              >
                {paginatedProducts.map((product) => (
                  <Grid 
                    item 
                    key={product.id} 
                    xs={12}
                    sm={viewMode === VIEW_MODES.GRID ? 6 : 12}
                    md={viewMode === VIEW_MODES.GRID ? 4 : 12}
                    lg={viewMode === VIEW_MODES.GRID ? 3 : 12}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <Box sx={{ width: 280, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="mobile-category-select-label">Category</InputLabel>
              <Select
                labelId="mobile-category-select-label"
                id="mobile-category-select"
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="mobile-sort-select-label">Sort By</InputLabel>
              <Select
                labelId="mobile-sort-select-label"
                id="mobile-sort-select"
                value={sortOption}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value={SORT_OPTIONS.FEATURED}>Featured</MenuItem>
                <MenuItem value={SORT_OPTIONS.PRICE_LOW_TO_HIGH}>Price: Low to High</MenuItem>
                <MenuItem value={SORT_OPTIONS.PRICE_HIGH_TO_LOW}>Price: High to Low</MenuItem>
                <MenuItem value={SORT_OPTIONS.RATING}>Top Rated</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              margin="normal"
              label="Search Products"
              variant="outlined"
              defaultValue={storeSearchQuery}
              onKeyDown={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              onClick={toggleDrawer}
              sx={{ mt: 2 }}
            >
              Apply Filters
            </Button>
            
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={handleClearFilters}
              sx={{ mt: 1 }}
            >
              Clear All
            </Button>
          </Box>
        </Drawer>
      </Container>
    </ErrorBoundary>
  );
};

export default ProductsPage;
