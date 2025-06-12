import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const ProductGrid = () => {
  const { products, loading, error, filters } = useSelector((state) => state.products);

  // Debug logging
  console.log('Products:', products);
  console.log('Filters:', filters);

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 1
        }}
      >
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Error loading products
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 1
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Filter products based on price and rating
  const filteredProducts = products.filter((product) => {
    const meetsPrice = product.price <= filters.priceRange.max;
    const meetsRating = !filters.rating || product.rating?.rate >= 0; // Changed to 0 to show all products
    return meetsPrice && meetsRating;
  });

  if (!filteredProducts || filteredProducts.length === 0) {
    console.log('No products found');
    const EmptyState = () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 1
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          No products found
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Try adjusting your filters or search criteria
        </Typography>
      </Box>
    );

    return <EmptyState />;
  }

  console.log('Rendering products:', filteredProducts.length);
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {filteredProducts.map((product) => {
        console.log('Product:', product);
        return (
          <Grid
            key={product.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch'
            }}
          >
            <ProductCard
              id={product.id}
              title={product.title || 'Loading...'}
              image={product.image || 'https://via.placeholder.com/200'}
              price={product.price || 0}
              rating={product.rating?.rate || 0}
              onAddToCart={() => console.log(`Add ${product.id} to cart`)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number
    })
  })),
  loading: PropTypes.bool.isRequired
};

export default ProductGrid;
