import React from 'react';
import {
  Pagination as MuiPagination,
  Box,
  Button,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/slices/productSlice';
import { useGetProductsQuery } from '../../store/api/productApi';

const Pagination = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Box display="flex" alignItems="center">
        <Button
          variant="outlined"
          onClick={() => dispatch(setPage(1))}
          disabled={currentPage === 1}
        >
          First
        </Button>
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ mx: 2 }}
        />
        <Button
          variant="outlined"
          onClick={() => dispatch(setPage(totalPages))}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
        <Typography ml={2}>
          Page {currentPage} of {totalPages}
        </Typography>
      </Box>
    </Box>
  );
};

export default Pagination;
