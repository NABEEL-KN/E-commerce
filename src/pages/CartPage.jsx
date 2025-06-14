import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Alert,
  Breadcrumbs,
  Link,
  IconButton,
} from '@mui/material';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import CartItem from '../components/cart/CartItem';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * CartPage component for displaying and managing the shopping cart
 */
const CartPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  
  // Get cart data from Redux store via custom hook
  const { items, totalItems, subtotal, isLoading, emptyCart: clearCart } = useCart();
  
  // Constants for cart calculations
  const TAX_RATE = 0.07; // 7% tax
  const SHIPPING_THRESHOLD = 50; // Free shipping over $50
  const SHIPPING_FEE = 5.99;
  
  // Calculate cart totals with proper type handling
  const safeSubtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return sum + (price * quantity);
  }, 0);
  
  const tax = parseFloat((safeSubtotal * TAX_RATE).toFixed(2));
  const shipping = safeSubtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = parseFloat((safeSubtotal + tax + shipping).toFixed(2));
  
  // Handle promo code application
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');
    
    // Simulate API call to validate promo code
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'DISCOUNT20') {
        setPromoSuccess('Promo code applied successfully!');
      } else {
        setPromoError('Invalid or expired promo code');
      }
      setIsApplyingPromo(false);
    }, 1000);
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (totalItems === 0) return;
    navigate('/checkout');
  };
  
  // If cart is loading, show loading spinner
  if (isLoading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }
  
  // Empty cart view
  if (totalItems === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            Home
          </Link>
          <Typography color="text.primary">Cart</Typography>
        </Breadcrumbs>
        
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/products"
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>
      
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Your Shopping Cart
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </Typography>
      
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Paper>
          
          {/* Cart Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/products"
              startIcon={<ArrowBack />}
            >
              Continue Shopping
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        
        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Order Summary
            </Typography>
            
            {/* Items List */}
            {items.map((item) => (
              <Box key={item.id} display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 12, borderRadius: 4 }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" noWrap>{item.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.quantity} × {formatPrice(item.price)}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                  {formatPrice(item.price * item.quantity)}
                </Typography>
              </Box>
            ))}
            
            <Divider sx={{ my: 2 }} />
            
            {/* Price Breakdown */}
            <Box sx={{ '& > *:not(:last-child)': { mb: 1.5 } }}>
              {/* Subtotal */}
              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</Typography>
                <Typography>{formatPrice(safeSubtotal)}</Typography>
              </Box>
              
              {/* Shipping */}
              <Box display="flex" justifyContent="space-between">
                <Typography>Shipping:</Typography>
                <Typography color={shipping === 0 ? 'success.main' : 'inherit'}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </Typography>
              </Box>
              
              {/* Tax */}
              <Box display="flex" justifyContent="space-between">
                <Typography>Tax ({Math.round(TAX_RATE * 100)}%):</Typography>
                <Typography>{formatPrice(tax)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {/* Order Total */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight={600}>
                  Order Total:
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={700}
                  color="primary"
                >
                  {formatPrice(total)}
                </Typography>
              </Box>
              
              {shipping === 0 && safeSubtotal > 0 && (
                <Typography variant="caption" color="success.main" display="block" textAlign="right">
                  🎉 Free shipping on orders over {formatPrice(SHIPPING_THRESHOLD)}
                </Typography>
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mt: 3 }}>
              {/* Promo Code */}
              <Typography variant="subtitle2" gutterBottom>
                Promo Code
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                  disabled={isApplyingPromo}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                >
                  Apply
                </Button>
              </Box>
              
              {promoError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {promoError}
                </Alert>
              )}
              
              {promoSuccess && (
                <Alert severity="success" sx={{ mt: 1 }}>
                  {promoSuccess}
                </Alert>
              )}
            </Box>
            
            {/* Checkout Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={totalItems === 0}
              sx={{ 
                mt: 3,
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              fullWidth={isMobile}
            >
              {totalItems > 0 ? `Proceed to Checkout (${formatPrice(total)})` : 'Checkout'}
            </Button>
            
            {/* Shipping Policy */}
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Free shipping on orders over {formatPrice(SHIPPING_THRESHOLD)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
