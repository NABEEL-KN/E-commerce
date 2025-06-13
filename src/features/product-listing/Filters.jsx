import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

          {/* Rating Filter */}
          <Box sx={{ flex: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.rating}
                  onChange={handleRatingChange}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      color: 'primary.main',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: 'rgba(33,150,243,0.15)',
                    },
                  }}
                />
              }
              label={
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  4+ Rating
                </Typography>
              }
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Filters;
