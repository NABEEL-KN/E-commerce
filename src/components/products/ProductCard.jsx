import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
  IconButton,
  Chip,
  Skeleton,
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { formatPrice, truncateText } from '../../utils/formatters';
import useCart from '../../hooks/useCart';

/**
 * ProductCard component for displaying product information in a grid or list
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {boolean} props.loading - Loading state
 */
const ProductCard = ({ product, loading = false, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const isListView = viewMode === 'list';

  // Handle click on the product card
  const handleClick = () => {
    if (!loading && product) {
      navigate(`/products/${product.id}`);
    }
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!loading && product) {
      addItem(product);
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!loading) {
      setIsFavorite(!isFavorite);
    }
  };

  // If loading, show skeleton
  if (loading) {
    return (
      <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: isListView ? 'column' : 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Skeleton variant="rectangular" animation="wave" height={isListView ? 200 : 250} />
          <CardContent sx={{ flexGrow: 1, p: isListView ? 2 : 1.5 }}>
            <Typography variant="h6" gutterBottom>
              <Skeleton animation="wave" width="60%" />
            </Typography>
            {isListView && (
              <Typography variant="body2">
                <Skeleton animation="wave" width="80%" />
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: isListView ? 1.5 : 1 }}>
              <Skeleton animation="wave" width="20px" height="20px" />
              <Skeleton animation="wave" width="40px" height="20px" sx={{ ml: 0.5 }} />
            </Box>
            <Typography variant="h6" color="primary">
              <Skeleton animation="wave" width="40%" />
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: 'space-between',
              p: isListView ? 2 : 1.5,
              display: isListView ? 'flex' : 'block',
            }}
          >
            <Skeleton animation="wave" width="40px" height="40px" sx={{ ml: isListView ? 0 : 1 }} />
            <Skeleton
              animation="wave"
              width="40%"
              height="40px"
              sx={{
                mt: isListView ? 0 : 1,
                ml: isListView ? 1 : 0,
              }}
            />
          </CardActions>
        </Card>
      </Card>
    );
  }

  // If no product data, return null
  if (!product) return null;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: isListView ? 'column' : 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        '&:hover .favorite-button': {
          opacity: 1,
        }
      }}
      onClick={handleClick}
    >
      <IconButton
        className="favorite-button"
        onClick={handleToggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          opacity: isFavorite ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        {isFavorite ? (
          <Favorite color="error" />
        ) : (
          <FavoriteBorder color="action" />
        )}
      </IconButton>
      <CardMedia
        component="img"
        sx={{
          height: isListView ? 200 : 300,
          width: '100%',
          objectFit: 'contain',
          p: 2,
          bgcolor: 'background.paper'
        }}
        image={product?.image || '/placeholder.jpg'}
        alt={product?.title || 'Product'}
      />
      <CardContent sx={{ flexGrow: 1, p: isListView ? 2 : 1.5 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            mb: isListView ? 1 : 0.5,
          }}
        >
          {product?.title || 'Loading...'}
        </Typography>
        {isListView && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product?.description || 'Loading...'}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: isListView ? 1.5 : 1 }}>
          <Rating
            value={product?.rating?.rate || 0}
            readOnly
            precision={0.5}
            sx={{ mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            ({product?.rating?.count || 0})
          </Typography>
        </Box>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            mb: isListView ? 1 : 0.5,
            fontWeight: 600,
          }}
        >
          {formatPrice(product?.price || 0)}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          p: isListView ? 2 : 1.5,
          display: 'flex',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          fullWidth={!isListView}
          sx={{
            mt: isListView ? 0 : 1,
            ml: isListView ? 1 : 0,
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
