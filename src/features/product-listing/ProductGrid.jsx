import React from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../../store/api/productApi';
import { useSelector } from 'react-redux';

const ProductGrid = ({ products = [] }) => {
  const { viewMode } = useSelector((state) => state.products);

  // Handle the case where products might be undefined or not an array
  const productList = Array.isArray(products) ? products : [];

  // If no products, show a message
  if (!productList.length) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 1,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          No products found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters or search criteria
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        '& .MuiGrid-item': {
          display: 'flex',
          justifyContent: 'center'
        }
      }}
    >
      {productList?.map((product) => (
        <Grid
          key={product.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            minWidth: '250px',
            maxWidth: '320px',
            width: '100%'
          }}
        >
          <ProductCard
            image={product.image || '/placeholder-image.jpg'}
            title={product.title || 'No Title'}
            price={product.price || 0}
            rating={product.rating?.rate || 0}
            reviewCount={product.rating?.count || 0}
            onAddToCart={() => console.log('Add to basket clicked for:', product.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
