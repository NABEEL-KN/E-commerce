import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Paper,
  styled,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import {
  ShoppingCart,
  FavoriteBorder,
  Favorite,
  AddShoppingCart,
  Star as StarIcon,
  LocalShipping
} from '@mui/icons-material';
import { products } from '../data/products';

// Styled components
const ProductCardStyled = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  position: 'relative',
  background: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    '& .quick-view': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '& .product-image': {
      transform: 'scale(1.05)',
    },
  },
}));

const ProductImage = styled('div')(({ image, theme }) => ({
  paddingTop: '100%',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundImage: `url(${image})`,
  position: 'relative',
  backgroundColor: theme.palette.grey[50],
  transition: 'transform 0.5s ease',
  width: '100%',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    mixBlendMode: 'soft-light',
  },
  '&.product-image': {
    transition: 'transform 0.5s ease',
  },
}));

const DiscountBadge = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '12px',
  right: '12px',
  backgroundColor: theme.palette.error.main,
  color: '#fff',
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '0.7rem',
  fontWeight: 700,
  zIndex: 2,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
}));

const QuickViewButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '-40px',
  left: 0,
  right: 0,
  width: '80%',
  margin: '0 auto',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '0.75rem',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  opacity: 0,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  [`${ProductCardStyled}:hover &`]: {
    bottom: '20px',
    opacity: 1,
  }
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
          borderRadius: 0,
          boxShadow: theme.shadows[10],
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              py: { xs: 8, md: 12 },
              px: { xs: 2, sm: 4 },
              maxWidth: { md: '50%' },
              minHeight: { xs: '60vh', md: '70vh' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              component="h1" 
              variant={isMobile ? 'h4' : 'h3'} 
              color="#fff" 
              gutterBottom
              sx={{
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Summer Sale Collection 2023
            </Typography>
            <Typography 
              variant={isMobile ? 'h6' : 'h5'} 
              color="#f5f5f5" 
              paragraph
              sx={{
                mb: 3,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              Discover amazing products at unbeatable prices. Limited time offers!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? 'medium' : 'large'}
                component={RouterLink}
                to="/products"
                startIcon={<ShoppingCart />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)',
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Featured Products Section */}
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '4px',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '2px',
              },
            }}
          >
            Featured Products
          </Typography>
        </Box>

        {/* Product Grid */}
        <Grid container spacing={3} sx={{ py: 4 }}>
          {products.slice(0, 12).map((product) => {
            const hasDiscount = Math.random() > 0.7;
            const originalPrice = hasDiscount ? (product.price * 1.3).toFixed(2) : null;
            
            return (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', height: '100%' }}>
                <ProductCardStyled className={hasDiscount ? 'has-discount' : ''}>
                  <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
                    <ProductImage 
                      className="product-image"
                      image={product.image} 
                      title={product.name} 
                      sx={{ 
                        borderRadius: '8px 8px 0 0',
                        margin: '8px',
                        width: 'calc(100% - 16px)',
                        backgroundSize: 'contain',
                      }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        '&:hover': {
                          backgroundColor: '#fff',
                          transform: 'scale(1.1)',
                        },
                        width: 34,
                        height: 34,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {wishlist.includes(product.id) ? (
                        <Favorite fontSize="small" color="error" sx={{ fontSize: '1.1rem' }} />
                      ) : (
                        <FavoriteBorder fontSize="small" color="action" sx={{ fontSize: '1.1rem' }} />
                      )}
                    </IconButton>

                    {hasDiscount && (
                      <DiscountBadge>
                        -30%
                      </DiscountBadge>
                    )}
                  </Box>

                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    p: 2,
                    '&:last-child': { pb: 2.5 },
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'background.paper',
                    borderRadius: '0 0 8px 8px',
                    height: '100%',
                    boxSizing: 'border-box',
                  }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        mb: 0.75,
                        color: 'primary.main',
                        opacity: 0.8,
                      }}
                    >
                      {product.category}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1.5,
                        fontSize: '1rem',
                        lineHeight: 1.4,
                        color: 'text.primary',
                        letterSpacing: '-0.2px',
                        minHeight: '2.8em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {product.title}
                    </Typography>
                    
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box display="flex" alignItems="center" mr={1}>
                        <StarIcon 
                          fontSize="small" 
                          sx={{ 
                            color: theme => theme.palette.mode === 'dark' ? '#ffd700' : '#ff9800',
                            mr: 0.5,
                            fontSize: '1rem',
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600,
                            color: theme => theme.palette.mode === 'dark' ? '#ffd700' : '#ff9800',
                          }}
                        >
                          {product.rating.rate.toFixed(1)}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          ml: 0.5,
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                          opacity: 0.8,
                        }}
                      >
                        ({product.rating.count} reviews)
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      mt: 'auto',
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)',
                      },
                    }}>
                      {hasDiscount && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Typography 
                            variant="caption" 
                            sx={{
                              textDecoration: 'line-through',
                              color: 'text.secondary',
                              fontSize: '0.8rem',
                              opacity: 0.7,
                              mr: 1,
                            }}
                          >
                            ${originalPrice}
                          </Typography>
                          <Chip 
                            label="SAVE 30%" 
                            size="small" 
                            color="error"
                            sx={{ 
                              height: '18px',
                              fontSize: '0.6rem',
                              fontWeight: 700,
                              '& .MuiChip-label': { px: 1 },
                            }}
                          />
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700, 
                            color: hasDiscount ? 'error.main' : 'primary.main',
                            fontSize: '1.15rem',
                            lineHeight: 1.2,
                            display: 'flex',
                            alignItems: 'center',
                            fontFeatureSettings: '"tnum"',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </Typography>
                        {!hasDiscount && (
                          <Box component="span" sx={{ 
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            color: 'success.main',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            px: 1,
                            py: 0.5,
                            borderRadius: '4px',
                          }}>
                            <LocalShipping fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                            Free Shipping
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </ProductCardStyled>
              </Grid>
            );
          })}
        </Grid>

        <Box textAlign="center" mt={6}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={RouterLink}
            to="/products"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <LocalShipping fontSize="large" color="primary" />,
                title: 'Free Shipping',
                description: 'Free delivery on all orders over $50',
              },
              {
                icon: <Favorite fontSize="large" color="primary" />,
                title: 'Quality Products',
                description: '100% authentic products with warranty',
              },
              {
                icon: <ShoppingCart fontSize="large" color="primary" />,
                title: 'Easy Returns',
                description: '30-day return policy',
              },
              {
                icon: <FavoriteBorder fontSize="large" color="primary" />,
                title: '24/7 Support',
                description: 'Dedicated customer support',
              },
            ].map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Box textAlign="center" px={2}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;