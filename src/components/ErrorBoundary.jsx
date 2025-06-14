import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We're sorry, but an unexpected error has occurred. Our team has been notified.
          </Typography>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box
              component="details"
              sx={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                p: 2,
                borderRadius: 1,
                maxWidth: '100%',
                overflow: 'auto',
                mb: 3,
                textAlign: 'left',
              }}
            >
              <Typography variant="subtitle2" component="summary">
                Error Details (Development Only)
              </Typography>
              <Typography variant="body2" component="pre" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = '/';
            }}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
