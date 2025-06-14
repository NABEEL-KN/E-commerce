import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Box,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const steps = ['Cart', 'Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      email: '',
    },
    billing: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      saveCard: false,
    },
  });

  const { items, totalItems, subtotal, isLoading } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Constants for cart calculations
  const TAX_RATE = 0.07; // 7% tax
  const SHIPPING_THRESHOLD = 50;
  const SHIPPING_FEE = 5.99;
  
  // Calculate prices with proper number handling and type conversion
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return sum + (price * quantity);
    }, 0);
  };

  const safeSubtotal = calculateSubtotal();
  const tax = parseFloat((safeSubtotal * TAX_RATE).toFixed(2));
  const shipping = safeSubtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = parseFloat((safeSubtotal + tax + shipping).toFixed(2));

  useEffect(() => {
    if (totalItems === 0 && activeStep === 0) {
      navigate('/cart');
    }
  }, [totalItems, activeStep, navigate]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (section, field) => (e) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value,
      },
    });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(newOrderId);
      setIsProcessing(false);
      setOrderSuccess(true);
      // In a real app, you would clear the cart here
      // dispatch(clearCart());
    }, 2000);
  };

  const renderCartStep = () => (
    <>
      <Typography variant="h6" gutterBottom>
        Review Your Order
      </Typography>
      {items.map((item) => (
        <Box key={item.id} display="flex" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 16 }} 
            />
            <div>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Qty: {item.quantity}
              </Typography>
            </div>
          </Box>
          <Typography variant="subtitle1">
            {formatPrice(item.price * item.quantity)}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 3 }}>
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Order Summary
          </Typography>
          
          {/* Items List */}
          {items.map((item) => (
            <Box key={item.id} display="flex" justifyContent="space-between" mb={2}>
              <Box display="flex" alignItems="center">
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 12, borderRadius: 4 }}
                />
                <Box>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.quantity} × {formatPrice(item.price)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1">
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
              <Typography variant="h6" fontWeight={600}>
                Order Total:
              </Typography>
              <Typography 
                variant="h6" 
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
        </Paper>
      </Box>
    </>
  );

  const renderAddressForm = (type) => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          value={formData[type].firstName}
          onChange={handleChange(type, 'firstName')}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          value={formData[type].lastName}
          onChange={handleChange(type, 'lastName')}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          value={formData[type].address}
          onChange={handleChange(type, 'address')}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          value={formData[type].city}
          onChange={handleChange(type, 'city')}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="State/Province/Region"
          value={formData[type].state}
          onChange={handleChange(type, 'state')}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="ZIP / Postal code"
          value={formData[type].zipCode}
          onChange={handleChange(type, 'zipCode')}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Country"
          value={formData[type].country}
          onChange={handleChange(type, 'country')}
          margin="normal"
        />
      </Grid>
      {type === 'shipping' && (
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            value={formData.shipping.phone}
            onChange={handleChange('shipping', 'phone')}
            margin="normal"
          />
        </Grid>
      )}
      {type === 'shipping' && (
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email Address"
            type="email"
            value={formData.shipping.email}
            onChange={handleChange('shipping', 'email')}
            margin="normal"
          />
        </Grid>
      )}
    </Grid>
  );

  const renderShippingStep = () => (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      {renderAddressForm('shipping')}
      <Box mt={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
              color="primary"
            />
          }
          label="Billing address is the same as shipping address"
        />
      </Box>
    </>
  );

  const renderBillingStep = () => (
    <>
      <Typography variant="h6" gutterBottom>
        Billing Address
      </Typography>
      {billingSameAsShipping ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          Billing address is the same as shipping address
        </Alert>
      ) : (
        renderAddressForm('billing')
      )}
    </>
  );

  const renderPaymentStep = () => (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Name on Card"
            value={formData.payment.cardName}
            onChange={handleChange('payment', 'cardName')}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Number"
            value={formData.payment.cardNumber}
            onChange={handleChange('payment', 'cardNumber')}
            margin="normal"
            placeholder="1234 5678 9012 3456"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Expiry Date"
            value={formData.payment.expiryDate}
            onChange={handleChange('payment', 'expiryDate')}
            margin="normal"
            placeholder="MM/YY"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="CVV"
            value={formData.payment.cvv}
            onChange={handleChange('payment', 'cvv')}
            margin="normal"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.payment.saveCard}
                onChange={(e) =>
                  handleChange('payment', 'saveCard')({
                    target: { value: e.target.checked },
                  })
                }
                color="primary"
              />
            }
            label="Save card for future purchases"
          />
        </Grid>
      </Grid>
    </>
  );

  const renderReviewStep = () => (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      <Box mb={4}>
        <Typography variant="subtitle1" gutterBottom>
          Shipping Address
        </Typography>
        <Typography>
          {formData.shipping.firstName} {formData.shipping.lastName}
        </Typography>
        <Typography>{formData.shipping.address}</Typography>
        <Typography>
          {formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}
        </Typography>
        <Typography>{formData.shipping.country}</Typography>
        <Typography>Phone: {formData.shipping.phone}</Typography>
        <Typography>Email: {formData.shipping.email}</Typography>
      </Box>

      {!billingSameAsShipping && (
        <Box mb={4}>
          <Typography variant="subtitle1" gutterBottom>
            Billing Address
          </Typography>
          <Typography>
            {formData.billing.firstName} {formData.billing.lastName}
          </Typography>
          <Typography>{formData.billing.address}</Typography>
          <Typography>
            {formData.billing.city}, {formData.billing.state} {formData.billing.zipCode}
          </Typography>
          <Typography>{formData.billing.country}</Typography>
        </Box>
      )}

      <Box mb={4}>
        <Typography variant="subtitle1" gutterBottom>
          Payment Method
        </Typography>
        <Typography>Card ending in **** **** **** {formData.payment.cardNumber.slice(-4)}</Typography>
        <Typography>Expires: {formData.payment.expiryDate}</Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" gutterBottom>
          Order Items
        </Typography>
        {items.map((item) => (
          <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
            <Typography>
              {item.quantity} x {item.title}
            </Typography>
            <Typography>{formatPrice(item.price * item.quantity)}</Typography>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Subtotal:</Typography>
          <Typography>{formatPrice(subtotal)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Shipping:</Typography>
          <Typography>{shipping === 0 ? 'Free' : formatPrice(shipping)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Tax:</Typography>
          <Typography>{formatPrice(tax)}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">{formatPrice(total)}</Typography>
        </Box>
      </Box>
    </>
  );

  const renderSuccessStep = () => (
    <Box textAlign="center" py={8}>
      <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Thank You For Your Order!
      </Typography>
      <Typography variant="body1" paragraph>
        Your order has been placed successfully.
      </Typography>
      <Typography variant="body1" paragraph>
        Order Number: <strong>{orderId}</strong>
      </Typography>
      <Typography variant="body1" paragraph>
        We've sent a confirmation email to {formData.shipping.email} with your order details.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mt: 3, mb: 2 }}
      >
        Continue Shopping
      </Button>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderCartStep();
      case 1:
        return renderShippingStep();
      case 2:
        return renderBillingStep();
      case 3:
        return renderPaymentStep();
      case 4:
        return renderReviewStep();
      default:
        throw new Error('Unknown step');
    }
  };

  // If cart is loading, show loading spinner
  if (isLoading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }

  // If order is successful, show success message
  if (orderSuccess) {
    return renderSuccessStep();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" component={RouterLink} to="/cart">
          Cart
        </Link>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4, mb: 4 }}>
        {getStepContent(activeStep)}
      </Paper>

      <Box display="flex" justifyContent="space-between">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mt: 3, ml: 1 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{ mt: 3, ml: 1 }}
          disabled={isProcessing}
        >
          {activeStep === steps.length - 1 ? (
            isProcessing ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Place Order'
            )
          ) : (
            'Next'
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
