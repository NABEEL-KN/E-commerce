import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Typography,
  Grid,
  Divider
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../store/slices/productSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  // Initialize price range if not set
  if (!filters.priceRange) {
    dispatch(setFilters({ priceRange: { min: 0, max: 1000 } }));
  }

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: "Men's Clothing", label: "Men's Clothing" },
    { value: "Women's Clothing", label: "Women's Clothing" },
    { value: 'Jewelery', label: 'Jewelry' },
    { value: 'Electronics', label: 'Electronics' }
  ];

  const handleCategoryChange = (event) => {
    const newFilters = {
      ...filters,
      category: event.target.value,
      page: 1
    };
    dispatch(setFilters(newFilters));
  };

  const handleRatingChange = (event) => {
    const newFilters = {
      ...filters,
      rating: event.target.checked,
      page: 1
    };
    dispatch(setFilters(newFilters));
  };

  const handlePriceChange = (event, newValue) => {
    const newFilters = {
      ...filters,
      priceRange: { min: newValue[0], max: newValue[1] },
      page: 1
    };
    dispatch(setFilters(newFilters));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            bgcolor: 'grey.50',
            borderRadius: 2,
            p: { xs: 2, md: 2.5 },
            boxShadow: '0 2px 8px 0 rgba(60,72,88,0.06)',
            border: '1px solid',
            borderColor: 'grey.200',
            minWidth: 0,
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* Category */}
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
              <Select
                value={filters.category || 'all'}
                label="Category"
                onChange={handleCategoryChange}
                sx={{
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  '& .MuiSelect-select': {
                    py: 1.5,
                    px: 2
                  }
                }}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Price Range */}
          <Box sx={{ flex: 2, minWidth: 180, px: 2, pt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Price Range
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Typography variant="body2" sx={{ minWidth: 36 }}>${filters.priceRange?.min ?? 0}</Typography>
              <Slider
                value={[filters.priceRange?.min ?? 0, filters.priceRange?.max ?? 1000]}
                min={0}
                max={1000}
                step={10}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                sx={{ mx: 2, flex: 1 }}
              />
              <Typography variant="body2" sx={{ minWidth: 44, textAlign: 'right' }}>${filters.priceRange?.max ?? 1000}</Typography>
            </Box>
          </Box>

          {/* Rating */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'center' } }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.rating}
                  onChange={handleRatingChange}
                  color="primary"
                />
              }
              label={
                <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Show only rated products
                </Typography>
              }
              sx={{ ml: 0 }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Filters;
