import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, setSearchQuery, setSort } from './productListingSlice';
import {
  Grid,
  Box,
  Paper,
  TextField,
  IconButton,
  Divider,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortDropdown from './SortDropdown'; // Assuming you have this component
import ProductCard from './ProductCard';   // Assuming you have this component

const ProductListing = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    filters,
    sort,
    searchQuery
  } = useSelector((state) => state.products);

  // Fetch products on mount or when filters/search change
  useEffect(() => {
    dispatch(fetchProducts({
      page: 1,
      limit: 100,
      category: filters.category,
      searchQuery
    }));
  }, [dispatch, filters.category, searchQuery]);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Filter logic (rating and price)
  const filteredProducts = products.filter((product) => {
    const matchesRating = product.rating?.rate >= filters.rating;
    const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
    return matchesRating && matchesPrice;
  });

  // Optional sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    return 0;
  });

  return (
    <Grid container spacing={2}>
      {/* Search + Sort Bar */}
      <Grid item xs={12} md={9} lg={9.5}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: 'background.paper',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.100',
            boxShadow: '0 4px 24px 0 rgba(60,72,88,0.10)',
            p: { xs: 1.5, md: 2 },
            mb: 2,
            width: '100%',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 8px 32px 0 rgba(60,72,88,0.13)',
            },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search products, brands, or categories…"
            value={searchQuery}
            onChange={handleSearch}
            size="medium"
            sx={{
              bgcolor: 'grey.50',
              borderRadius: 2,
              boxShadow: '0 1px 4px 0 rgba(60,72,88,0.06)',
              '& .MuiInputBase-root': {
                fontSize: 17,
                fontWeight: 500,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              mr: { md: 2 },
            }}
            InputProps={{
              startAdornment: (
                <IconButton edge="start" sx={{ color: 'primary.main', mr: 1 }}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', md: 'block' }, mx: 1 }}
          />
          <Box sx={{ minWidth: 180 }}>
            <SortDropdown
              value={sort}
              onChange={(newSort) => dispatch(setSort(newSort))}
              sx={{
                bgcolor: 'grey.50',
                borderRadius: 2,
                boxShadow: '0 1px 4px 0 rgba(60,72,88,0.06)',
                fontWeight: 500,
                '& .MuiSelect-select': {
                  py: 1.2,
                  px: 2,
                },
              }}
            />
          </Box>
        </Paper>
      </Grid>

      {/* Product Grid */}
      <Grid item xs={12}>
        {loading ? (
          <Typography>Loading products...</Typography>
        ) : sortedProducts.length === 0 ? (
          <Typography>No products found. Try adjusting your filters or search.</Typography>
        ) : (
          <Grid container spacing={2}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductListing;
