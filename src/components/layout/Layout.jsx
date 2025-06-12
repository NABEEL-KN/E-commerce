import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

/**
 * Main layout component that wraps all pages
 * Includes header, main content area, and footer
 */
const Layout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <Box sx={{ 
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <Header />
        <Box sx={{ 
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          px: 0,
          overflow: 'hidden'
        }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
