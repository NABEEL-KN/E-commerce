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
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
        width: '100%',
        borderTop: '1px solid',
        borderColor: 'grey.800'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ShopSmart
            </Typography>
            <Typography variant="body2" color="grey.400">
              Your one-stop shop for all your shopping needs. Quality products, competitive prices, and excellent service.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>Home</Link>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1 }}>Products</Link>
            <Link href="/cart" color="inherit" display="block" sx={{ mb: 1 }}>Cart</Link>
            <Link href="/login" color="inherit" display="block" sx={{ mb: 1 }}>Login</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="grey.400" paragraph>
              Email: info@shopsmart.com
            </Typography>
            <Typography variant="body2" color="grey.400" paragraph>
              Phone: +1 (123) 456-7890
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook"><Facebook /></IconButton>
              <IconButton color="inherit" aria-label="Twitter"><Twitter /></IconButton>
              <IconButton color="inherit" aria-label="Instagram"><Instagram /></IconButton>
              <IconButton color="inherit" aria-label="LinkedIn"><LinkedIn /></IconButton>
              <IconButton color="inherit" aria-label="GitHub"><GitHub /></IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} pt={2} borderTop="1px solid" borderColor="grey.800">
          <Typography variant="body2" color="grey.400" align="center">
            © {new Date().getFullYear()} ShopSmart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
