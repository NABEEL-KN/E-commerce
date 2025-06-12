import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy } from '../../store/slices/productSlice';

const sortOptions = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'latest', label: 'Latest' }
];

const SortDropdown = () => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.products);

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy || 'price_asc'}
            defaultValue="price_asc"
            label="Sort By"
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SortDropdown;
