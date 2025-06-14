import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Slider,
  Divider,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Collapse,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Close as CloseIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';

import { 
  setSearchQuery, 
  setSelectedCategory, 
  setPriceRange, 
  setMinRating,
  setViewMode,
  setSortOption,
  resetFilters,
  updateUrlParams,
  selectSearchQuery,
  selectSelectedCategory,
  selectPriceRange,
  selectMinRating,
  selectViewMode,
  selectSortOption,
} from '../../store/slices/filterSlice';

// Price range marks for the slider
const priceMarks = [
  { value: 0, label: '$0' },
  { value: 2500, label: '$2.5k' },
  { value: 5000, label: '$5k' },
  { value: 7500, label: '$7.5k' },
  { value: 10000, label: '$10k' },
];

// Format price for display
const formatPrice = (value) => {
  return `$${value.toLocaleString()}`;
};

// Memoized category item component
const CategoryItem = memo(({ category, isSelected, onChange }) => (
  <FormControlLabel
    control={
      <Checkbox 
        checked={isSelected} 
        onChange={() => onChange(category)}
        size="small"
        color="primary"
      />
    }
    label={category}
    sx={{ 
      width: '100%',
      '& .MuiFormControlLabel-label': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    }}
  />
));

const FilterSidebar = ({ categories = [] }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Get filter values from Redux store
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const priceRange = useSelector(selectPriceRange);
  const minRating = useSelector(selectMinRating);
  const viewMode = useSelector(selectViewMode);
  const sortOption = useSelector(selectSortOption);

  // Local state for UI controls
  const [priceRangeLocal, setPriceRangeLocal] = useState([priceRange?.min || 0, priceRange?.max || 10000]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    sort: true,
  });

  // Sync local price range with Redux
  useEffect(() => {
    setPriceRangeLocal([priceRange?.min || 0, priceRange?.max || 10000]);
  }, [priceRange]);

  // Handle search input
  const handleSearchChange = useCallback((e) => {
    dispatch(setSearchQuery(e.target.value));
  }, [dispatch]);

  // Handle category selection
  const handleCategoryChange = useCallback((category) => {
    // Toggle category selection
    if (selectedCategory === category) {
      dispatch(setSelectedCategory(null)); // Deselect if already selected
    } else {
      dispatch(setSelectedCategory(category)); // Select the category
    }
    
    // Update URL after a short delay to batch multiple updates
    const timer = setTimeout(() => {
      dispatch(updateUrlParams());
    }, 0);
    
    return () => clearTimeout(timer);
  }, [dispatch, selectedCategory]);

  // Handle price range change (for immediate feedback)
  const handlePriceChange = useCallback((event, newValue) => {
    setPriceRangeLocal(newValue);
  }, []);

  // Handle price range commit (update Redux and URL)
  const handlePriceChangeCommitted = useCallback((event, newValue) => {
    dispatch(setPriceRange({ 
      min: newValue[0],
      max: newValue[1]
    }));
    
    // Update URL after a short delay
    const timer = setTimeout(() => {
      dispatch(updateUrlParams());
    }, 0);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Handle rating filter change
  const handleRatingChange = useCallback((event, newValue) => {
    dispatch(setMinRating(newValue));
    
    // Update URL after a short delay
    const timer = setTimeout(() => {
      dispatch(updateUrlParams());
    }, 0);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Handle view mode toggle
  const handleViewModeChange = useCallback((event, newViewMode) => {
    if (newViewMode !== null) {
      dispatch(setViewMode(newViewMode));
      
      // Update URL after a short delay
      const timer = setTimeout(() => {
        dispatch(updateUrlParams());
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [dispatch]);

  // Handle sort option change
  const handleSortChange = useCallback((event) => {
    dispatch(setSortOption(event.target.value));
    
    // Update URL after a short delay
    const timer = setTimeout(() => {
      dispatch(updateUrlParams());
    }, 0);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Toggle section expansion
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Get unique categories
  const uniqueCategories = useMemo(() => {
    return [...new Set(categories)].filter(Boolean); // Filter out any falsy values
  }, [categories]);
  
  // Memoize the category list to prevent re-renders
  const categoryList = useMemo(() => (
    <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
      {uniqueCategories.map((category) => (
        <CategoryItem
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onChange={handleCategoryChange}
        />
      ))}
    </Box>
  ), [uniqueCategories, selectedCategory, handleCategoryChange]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery ||
      selectedCategory ||
      priceRange?.min > 0 ||
      priceRange?.max < 10000 ||
      minRating > 0
    );
  }, [searchQuery, selectedCategory, priceRange, minRating]);

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    
    // Update URL after a short delay
    const timer = setTimeout(() => {
      dispatch(updateUrlParams());
    }, 0);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
        <Button 
          size="small" 
          onClick={handleResetFilters}
          disabled={!selectedCategory && priceRange.min === 0 && priceRange.max === 10000}
        >
          Reset All
        </Button>
      </Box>


      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
        />
      </Box>


      {/* Categories Section */}
      <Box sx={{ mb: 3 }}>
        <Box 
          onClick={() => toggleSection('categories')}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>Categories</Typography>
          {expandedSections.categories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        
        <Collapse in={expandedSections.categories}>
          {categoryList}
        </Collapse>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Price Range Section */}
      <Box sx={{ mb: 3 }}>
        <Box 
          onClick={() => toggleSection('price')}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>Price Range</Typography>
          {expandedSections.price ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        
        <Collapse in={expandedSections.price}>
          <Box sx={{ px: 1, mt: 2 }}>
            <Slider
              value={priceRangeLocal}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              marks={priceMarks}
              valueLabelFormat={formatPrice}
              aria-labelledby="price-range-slider"
              sx={{
                '& .MuiSlider-valueLabel': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  py: 0.5,
                  px: 1,
                  fontSize: '0.75rem',
                  '&:before': {
                    display: 'none',
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {formatPrice(priceRangeLocal[0])}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatPrice(priceRangeLocal[1])}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Rating Section */}
      <Box sx={{ mb: 3 }}>
        <Box 
          onClick={() => toggleSection('rating')}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>Minimum Rating</Typography>
          {expandedSections.rating ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        
        <Collapse in={expandedSections.rating}>
          <Box sx={{ px: 1, mt: 2 }}>
            <Rating
              value={minRating || 0}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'warning.main',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              {minRating ? `${minRating}+ stars` : 'Any rating'}
            </Typography>
          </Box>
        </Collapse>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Sort Options */}
      <Box sx={{ mb: 3 }}>
        <Box 
          onClick={() => toggleSection('sort')}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>Sort By</Typography>
          {expandedSections.sort ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        
        <Collapse in={expandedSections.sort}>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              aria-label="sort-options"
              name="sort-options"
              value={sortOption}
              onChange={handleSortChange}
            >
              <FormControlLabel 
                value="title_asc" 
                control={<Radio size="small" />} 
                label="Name (A-Z)" 
              />
              <FormControlLabel 
                value="title_desc" 
                control={<Radio size="small" />} 
                label="Name (Z-A)" 
              />
              <FormControlLabel 
                value="price_asc" 
                control={<Radio size="small" />} 
                label="Price (Low to High)" 
              />
              <FormControlLabel 
                value="price_desc" 
                control={<Radio size="small" />} 
                label="Price (High to Low)" 
              />
            </RadioGroup>
          </FormControl>
        </Collapse>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Active Filters */}
      {hasActiveFilters && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
            {(priceRange?.min > 0 || priceRange?.max < 10000) && (
              <Chip 
                label={`Price: ${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`}
                onDelete={() => dispatch(setPriceRange({ min: 0, max: 10000 }))}
                size="small"
              />
            )}
            {minRating > 0 && (
              <Chip 
                label={`${minRating}+ Stars`}
                onDelete={() => dispatch(setMinRating(0))}
                size="small"
              />
            )}
          </Box>
        </Box>
      )}

      {/* View Mode Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <GridViewIcon sx={{ mr: 0.5 }} />
              <Typography variant="caption">Grid</Typography>
            </Box>
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <ViewListIcon sx={{ mr: 0.5 }} />
              <Typography variant="caption">List</Typography>
            </Box>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
