import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';

/**
 * Footer component with links and social media icons
 */
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 1,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
        width: '100%',
        m: 0
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', px: 1 }}>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <Typography variant="h6" color="white" gutterBottom>
              ShopSmart
            </Typography>
            <Typography variant="body2" color="white">
              Your one-stop shop for all your shopping needs.
              Quality products, competitive prices, and excellent service.
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6" color="white" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link href="/cart" color="inherit" display="block" sx={{ mb: 1 }}>
              Cart
            </Link>
            <Link href="/login" color="inherit" display="block" sx={{ mb: 1 }}>
              Login
            </Link>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="white" paragraph>
              Email: info@shopsmart.com
            </Typography>
            <Typography variant="body2" color="white" paragraph>
              Phone: +1 (123) 456-7890
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" aria-label="GitHub">
                <GitHub />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="white" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' ShopSmart. All rights reserved.'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
