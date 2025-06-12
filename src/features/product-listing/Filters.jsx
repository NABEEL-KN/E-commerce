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
    { value: 'men clothing', label: 'Men Clothing' },
    { value: 'women clothing', label: 'Women Clothing' },
    { value: 'jewelery', label: 'Jewelry' },
    { value: 'electronics', label: 'Electronics' }
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
          <Box sx={{ flex: 2, minWidth: 180 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.secondary', fontWeight: 600 }}>
              Price Range
            </Typography>
            <Slider
              value={[
                filters.priceRange.min ?? 0,
                filters.priceRange.max ?? 1000
              ]}
              onChange={(event, newValue) => {
                const newFilters = {
                  ...filters,
                  priceRange: { min: newValue[0], max: newValue[1] },
                  page: 1
                };
                dispatch(setFilters(newFilters));
              }}
              min={0}
              max={1000}
              step={10}
              marks={[
                { value: 0, label: '$0' },
                { value: 250, label: '$250' },
                { value: 500, label: '$500' },
                { value: 750, label: '$750' },
                { value: 1000, label: '$1000' }
              ]}
              valueLabelDisplay="auto"
              sx={{
                width: '100%',
                color: 'primary.main',
                mb: 0.5,
                mt: 0.5
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'grey.600' }}>
              <span>${filters.priceRange.min ?? 0}</span>
              <span>${filters.priceRange.max ?? 1000}</span>
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
