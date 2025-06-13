import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { Star, StarHalf, StarOutline } from '@mui/icons-material';

const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className='rating'>
        <span>
            { value >= 1 ? <Star style={{color}}/> : value >= 0.5 ? <StarHalf style={{color}}/> : <StarOutline style={{color}}/>}
        </span>
         <span>
            { value >= 2 ? <Star style={{color}}/> : value >= 1.5 ? <StarHalf style={{color}}/> : <StarOutline style={{color}}/>}
        </span>
         <span>
            { value >= 3 ? <Star style={{color}}/> : value >= 2.5 ? <StarHalf style={{color}}/> : <StarOutline style={{color}}/>}
        </span>
         <span>
            { value >= 4 ? <Star style={{color}}/> : value >= 3.5 ? <StarHalf style={{color}}/> : <StarOutline style={{color}}/>}
        </span>
         <span>
            { value >= 5 ? <Star style={{color}}/> : value >= 4.5 ? <StarHalf style={{color}}/> : <StarOutline style={{color}}/>}
        </span>
      <Typography variant='body2' ml={1}>{text && text}</Typography>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
