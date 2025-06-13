import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      shape="rounded"
      showFirstButton
      showLastButton
      sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}
    />
  );
};

export default Pagination;
