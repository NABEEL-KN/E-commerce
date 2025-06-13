import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Paper,
  Skeleton,
} from '@mui/material';
import { ShoppingBag, Favorite, LocalShipping, Support } from '@mui/icons-material';
import { useGetProductsQuery } from '../store/api/productApi';
import ProductCard from '../components/products/ProductCard';
import FilterSidebar from '../components/filters/FilterSidebar';
import FilteredProductsList from '../components/products/FilteredProductsList';

/**
 * HomePage component - Landing page for ShopSmart
 */
const HomePage = () => {
  // Fetch featured products using RTK Query
  const { data: products, isLoading } = useGetProductsQuery();
  
  // Categories - in a real app, these might come from an API
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Jewelry" },
    { id: 3, name: "Men's Clothing" },
    { id: 4, name: "Women's Clothing" }
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        {/* Increase the priority of the hero background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.4)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Welcome to ShopSmart
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Your one-stop destination for quality products at competitive prices.
                Discover our wide range of products and enjoy a seamless shopping experience.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/products"
                sx={{ mt: 2, alignSelf: 'flex-start' }}
              >
                Shop Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Grid with Filters */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '0 1 300px', order: 2, mb: 3 }}>
            <Paper sx={{ p: 2 }}>
              <FilterSidebar categories={categories} />
            </Paper>
          </Box>
          <Box sx={{ flex: '1 1 0', order: 1 }}>
            <Paper sx={{ p: 2 }}>
              <FilteredProductsList />
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2">
              Featured Products
            </Typography>
            <Button component={RouterLink} to="/products" variant="outlined">
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {isLoading
              ? Array.from(new Array(4)).map((_, index) => (
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <ProductCard loading={true} />
                  </Grid>
                ))
              : products?.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <LocalShipping color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Free Shipping
              </Typography>
              <Typography variant="body2" color="text.secondary">
                On orders over $50
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Support color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get help when you need it
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <ShoppingBag color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Secure Checkout
              </Typography>
              <Typography variant="body2" color="text.secondary">
                100% secure payment
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Favorite color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Easy Returns
              </Typography>
              <Typography variant="body2" color="text.secondary">
                30 day return policy
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
