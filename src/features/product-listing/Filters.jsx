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
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 2,
        p: 2,
        boxShadow: '0 2px 8px 0 rgba(60,72,88,0.06)',
        border: '1px solid',
        borderColor: 'grey.200',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        gap: 2,
        height: '100%',
        minHeight: '100%'
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1, width: '100%', textAlign: 'left' }}>
        Filters
      </Typography>
      
      {/* Category */}
      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category || 'all'}
          label="Category"
          onChange={handleCategoryChange}
          sx={{
            bgcolor: 'white',
            borderRadius: 1,
            textAlign: 'left'
          }}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rating Filter */}
      <FormControlLabel
        control={
          <Switch
            checked={filters.rating}
            onChange={handleRatingChange}
            size="small"
          />
        }
        label="4+ Rating"
        sx={{ alignSelf: 'flex-start', textAlign: 'left' }}
      />
    </Box>
  );
};

export default Filters;
