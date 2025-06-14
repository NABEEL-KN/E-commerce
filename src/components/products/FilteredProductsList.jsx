import React, { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../store/api/productApi';
import { 
  selectSearchQuery, 
  selectSelectedCategory, 
  selectPriceRange, 
  selectMinRating,
  selectSortOption,
  selectViewMode
} from '../../store/slices/filterSlice';
import ProductCard from './ProductCard';
import { Box, Typography, Grid, Stack, Skeleton } from '@mui/material';

// Memoized ProductCard component to prevent unnecessary re-renders
const ProductCardMemo = memo(ProductCard, (prevProps, nextProps) => {
  // Only re-render if the product data or view mode changes
  return (
    prevProps.product?.id === nextProps.product?.id &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.isLoading === nextProps.isLoading
  );
});

const FilteredProductsList = ({ products = [] }) => {
  const { isLoading, error } = useGetProductsQuery();
  
  // Select filter values from Redux store
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const priceRange = useSelector(selectPriceRange);
  const minRating = useSelector(selectMinRating);
  const sortOption = useSelector(selectSortOption);
  const viewMode = useSelector(selectViewMode);

  // Memoize filtered and sorted products for better performance
  const { filteredProducts, sortedProducts } = useMemo(() => {
    if (!Array.isArray(products)) {
      return { filteredProducts: [], sortedProducts: [] };
    }

    // Filter products based on search, category, price, and rating
    const filtered = products.filter((product) => {
      if (!product) return false;

      // Search filter - match title or description
      const searchTerm = (searchQuery || '').trim().toLowerCase();
      const matchesSearch = !searchTerm || 
        (product.title?.toLowerCase().includes(searchTerm) ||
         product.description?.toLowerCase().includes(searchTerm));

      // Category filter - handle different category formats and make matching more flexible
      let matchesCategory = true;
      if (selectedCategory) {
        const categoryToMatch = selectedCategory.toLowerCase().trim();
        if (!categoryToMatch) return true; // If category is empty, show all
        
        let productCategory = '';
        
        // Handle different category formats
        if (product.category) {
          if (typeof product.category === 'object') {
            // Handle object category with name or title property
            productCategory = (product.category.name || product.category.title || '').toLowerCase().trim();
          } else {
            // Handle string category
            productCategory = product.category.toString().toLowerCase().trim();
          }
          
          // Make matching more flexible by checking if the selected category is included in the product category or vice versa
          matchesCategory = productCategory.includes(categoryToMatch) || 
                           categoryToMatch.includes(productCategory) ||
                           productCategory.replace(/\s+/g, '') === categoryToMatch.replace(/\s+/g, '');
        } else {
          // If product has no category but a category is selected, don't show it
          matchesCategory = false;
        }
      }

      // Price filter
      const productPrice = Number(product.price) || 0;
      const minPrice = Number(priceRange?.min) || 0;
      const maxPrice = Number(priceRange?.max) || 10000;
      const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

      // Rating filter
      const productRating = product.rating?.rate || 0;
      const matchesRating = productRating >= (minRating || 0);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort products based on sort option
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'title_asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title_desc':
          return (b.title || '').localeCompare(a.title || '');
        case 'price_asc':
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case 'price_desc':
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        default:
          return (a.id || 0) - (b.id || 0);
      }
    });

    return { filteredProducts: filtered, sortedProducts: sorted };
  }, [products, searchQuery, selectedCategory, priceRange, minRating, sortOption]);

  // Memoize loading skeleton
  const loadingSkeletons = useMemo(() => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
          <Skeleton variant="rectangular" height={300} />
          <Skeleton width="60%" height={24} style={{ marginTop: 12 }} />
          <Skeleton width="40%" height={20} style={{ marginTop: 8 }} />
        </Grid>
      ))}
    </Grid>
  ), []);

  // Loading state
  if (isLoading) {
    return loadingSkeletons;
  }

  // Memoize error message
  const errorMessage = useMemo(() => (
    <Box textAlign="center" py={4}>
      <Typography color="error" gutterBottom>
        Error loading products. Please try again later.
      </Typography>
    </Box>
  ), []);

  // Error state
  if (error) {
    return errorMessage;
  }

  // Memoize no products found message
  const noProductsFound = useMemo(() => (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        No products found
      </Typography>
      <Typography variant="body1">
        Try adjusting your filters or search criteria.
      </Typography>
    </Box>
  ), []);

  // No products found
  if (filteredProducts.length === 0) {
    return noProductsFound;
  }

  // Memoize the product grid
  const productGrid = useMemo(() => (
    <Grid container spacing={3}>
      {sortedProducts.map((product) => (
        <Grid 
          item 
          xs={12} 
          sm={viewMode === 'list' ? 12 : 6} 
          md={viewMode === 'list' ? 12 : 3} 
          key={product.id}
        >
          <ProductCardMemo 
            product={product} 
            viewMode={viewMode} 
            isLoading={false}
          />
        </Grid>
      ))}
    </Grid>
  ), [sortedProducts, viewMode]);

  return productGrid;
};

export default FilteredProductsList;
