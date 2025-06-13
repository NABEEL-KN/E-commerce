import React from 'react';
import { Box, Typography } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

const EmptyState = ({ 
  title = 'No Items Found',
  message = 'There are currently no items to display.',
  icon: Icon = InboxOutlined 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        m: 2,
        border: '2px dashed #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        minHeight: '250px',
      }}
    >
      <Icon sx={{ fontSize: 60, mb: 2, color: 'text.secondary' }} />
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
