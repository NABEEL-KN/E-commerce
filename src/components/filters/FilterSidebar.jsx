import React from 'react';
import {
  Box,
  TextField,
  Slider,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setSelectedCategory, setPriceRange, resetFilters, setViewMode } from '../../store/slices/filterSlice';
import { ViewList, ViewModule } from '@mui/icons-material';

const FilterSidebar = ({ categories }) => {
  const dispatch = useDispatch();
  const { 
    searchQuery, 
    selectedCategory, 
    priceRange,
    viewMode
  } = useSelector((state) => state.filters);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handlePriceChange = (e, newValues) => {
    dispatch(setPriceRange({ min: newValues[0], max: newValues[1] }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleViewModeChange = () => {
    dispatch(setViewMode(viewMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* View Mode Toggle */}
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <IconButton
          onClick={handleViewModeChange}
          color={viewMode === 'grid' ? 'primary' : 'default'}
          size="small"
        >
          <ViewModule />
        </IconButton>
        <IconButton
          onClick={handleViewModeChange}
          color={viewMode === 'list' ? 'primary' : 'default'}
          size="small"
        >
          <ViewList />
        </IconButton>
      </Stack>

      {/* Active Filters Display */}
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
        {searchQuery && (
          <Chip
            label={`Search: "${searchQuery}"`}
            onDelete={() => dispatch(setSearchQuery(''))}
            size="small"
          />
        )}
        {selectedCategory && (
          <Chip
            label={`Category: ${selectedCategory}`}
            onDelete={() => dispatch(setSelectedCategory(null))}
            size="small"
          />
        )}
        {(priceRange.min > 0 || priceRange.max < 10000) && (
          <Chip
            label={`Price: $${priceRange.min} - $${priceRange.max}`}
            onDelete={() => dispatch(setPriceRange({ min: 0, max: 10000 }))}
            size="small"
          />
        )}
      </Stack>

      {/* Search */}
      <TextField
        fullWidth
        label="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        margin="normal"
        placeholder="Search by title or description"
      />

      {/* Category */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <Typography variant="body1">Price Range:</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          ${priceRange.min} - ${priceRange.max}
        </Typography>
        <Slider
          value={[priceRange.min, priceRange.max]}
          onChange={handlePriceChange}
          min={0}
          max={10000}
          step={100}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Reset Filters */}
      <Button
        variant="outlined"
        color="error"
        fullWidth
        onClick={handleResetFilters}
        sx={{ mt: 3 }}
      >
        Reset All Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;
