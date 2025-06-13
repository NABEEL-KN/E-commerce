import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
  Box,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';

const ProductCard = ({
  id,
  title,
  image,
  price,
  rating,
  onAddToCart,
  dataTestId = 'product-card'
}) => {
  const theme = useTheme();

  return (
    <Card
      data-testid={dataTestId}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[6]
        },
        borderRadius: 2
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: 'contain',
            backgroundColor: theme.palette.background.default
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              mb: 1
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary">
              ${price}
            </Typography>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: theme.palette.primary.main }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, borderTop: 1, bgcolor: 'background.paper' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="medium"
          onClick={() => onAddToCart(id)}
          sx={{
            textTransform: 'none',
            borderRadius: 1,
            fontWeight: 500,
            fontSize: '0.9rem',
            padding: '0.75rem'
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  onAddToCart: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default ProductCard;
