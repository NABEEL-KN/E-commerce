import React from 'react';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../store/api/productApi';
import ProductCard from './ProductCard';
import { Box, Typography, Grid, Stack } from '@mui/material';

const FilteredProductsList = ({ products = [] }) => {
  const { isLoading, error } = useGetProductsQuery();
  const { 
    searchQuery = '', 
    selectedCategory = null, 
    priceRange = { min: 0, max: 10000 },
    viewMode = 'grid',
    sortOption = 'title_asc'
  } = useSelector((state) => state.filters || {});

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    // Search filter - match title or description
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    // Price filter
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;

    // Log the filtering process for debugging
    console.log('Filtering:', {
      productTitle: product.title,
      searchQuery,
      matchesSearch,
      matchesCategory,
      matchesPrice
    });

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products based on sortOption
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      default:
        return a.id - b.id;
    }
  });

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ProductCard isLoading />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          No products found
        </Typography>
        <Typography variant="body1">
          Try adjusting your filters or search criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Error State */}
      {error && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom color="error">
            Error loading products
          </Typography>
          <Typography variant="body1" color="error">
            {error.message || 'Failed to load products. Please try again later.'}
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {!error && filteredProducts.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1">
            Try adjusting your filters or search criteria.
          </Typography>
        </Box>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid 
              item 
              xs={12} 
              sm={viewMode === 'list' ? 12 : 6} 
              md={viewMode === 'list' ? 12 : 3} 
              key={index}
            >
              <ProductCard isLoading viewMode={viewMode} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Product Grid */}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <Grid container spacing={3}>
          {sortedProducts.map((product) => (
            <Grid 
              item 
              xs={12} 
              sm={viewMode === 'list' ? 12 : 6} 
              md={viewMode === 'list' ? 12 : 3} 
              key={product.id}
            >
              <ProductCard 
                product={product} 
                viewMode={viewMode} 
                isLoading={false}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FilteredProductsList;
