import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    // Main brand color - Teal
    primary: {
      main: '#0d9488', // Teal 600
      light: '#14b8a6', // Teal 500
      dark: '#0f766e',  // Teal 700
      contrastText: '#ffffff',
    },
    // Secondary accent color
    secondary: {
      main: '#8b5cf6', // Violet 500
      light: '#a78bfa', // Violet 400
      dark: '#7c3aed',  // Violet 600
      contrastText: '#ffffff',
    },
    // Success state
    success: {
      main: '#10b981', // Emerald 500
      light: '#34d399', // Emerald 400
      dark: '#059669',  // Emerald 600
    },
    // Error state
    error: {
      main: '#ef4444', // Red 500
      light: '#f87171', // Red 400
      dark: '#dc2626',  // Red 600
    },
    // Background colors
    background: {
      default: '#f8fafc', // Slate 50
      paper: '#ffffff',
    },
    // Text colors
    text: {
      primary: '#1e293b',   // Slate 800
      secondary: '#475569', // Slate 600
      disabled: '#94a3b8',  // Slate 400
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
        },
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});
