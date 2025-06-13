import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.16)',
  },
  borderRadius: 12,
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
  border: '1px solid',
  borderColor: 'rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '320px',
  margin: '16px',
  overflow: 'hidden',
});

const StyledCardMedia = styled(CardMedia)({
  height: 240,
  objectFit: 'contain',
  backgroundColor: '#f8f9fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

const StyledCardContent = styled(CardContent)({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const TitleTypography = styled(Typography)({
  fontWeight: 500,
  fontSize: '1.1rem',
  color: 'rgba(0,0,0,0.87)',
  marginBottom: '8px',
  lineHeight: 1.4,
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const PriceTypography = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.5rem',
  color: '#2196f3',
  lineHeight: 1.2,
});

const ReviewBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ReviewTypography = styled(Typography)({
  fontSize: '0.875rem',
  color: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
});

const ActionButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 8,
  fontWeight: 500,
  fontSize: '1rem',
  padding: '12px 24px',
  backgroundColor: '#2196f3',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
  minWidth: '120px',
});

const ProductCard = ({
  image,
  title,
  price,
  rating = 0,
  reviewCount = 0,
  onAddToCart
}) => {
  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={image || '/placeholder-image.jpg'}
        alt={title || 'Product'}
        sx={{
          background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          '&:hover': {
            animation: 'gradient 15s ease infinite reverse'
          }
        }}
      >
        {image ? null : <Typography variant="h5" color="text.secondary">No Image</Typography>}
      </StyledCardMedia>
      <StyledCardContent>
        <TitleTypography variant="h6" component="h2">
          {title || 'No Title'}
        </TitleTypography>
        <PriceTypography>
          £{price?.toFixed(2) || '0.00'}
        </PriceTypography>
        <ReviewBox>
          <Rating
            value={rating}
            precision={0.5}
            size="small"
            readOnly
            sx={{
              color: '#ffd700',
              '& .MuiRating-iconFilled': {
                color: '#ffd700'
              }
            }}
          />
          <ReviewTypography>
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </ReviewTypography>
        </ReviewBox>
        <ActionButton
          variant="contained"
          fullWidth
          onClick={onAddToCart}
        >
          Add to Basket
        </ActionButton>
      </StyledCardContent>
    </StyledCard>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  onAddToCart: PropTypes.func.isRequired
};

ProductCard.defaultProps = {
  rating: 0,
  reviewCount: 0
};

ProductCard.defaultProps = {
  rating: 0,
  reviewCount: 0
};

export default ProductCard;
