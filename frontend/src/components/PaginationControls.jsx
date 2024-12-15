
import React from 'react';
import { Grid, Typography, Select, MenuItem, Pagination } from '@mui/material';

const PaginationControls = ({ totalItems, page, limit, onPageChange, onLimitChange }) => {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography>Items per page:</Typography>
        <Select
          value={limit}
          onChange={onLimitChange}
          sx={{ marginLeft: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}
        >
          {[5, 10, 20].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item>
        <Pagination
          count={Math.ceil(totalItems / limit)}
          page={page}
          onChange={onPageChange}
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

export default PaginationControls;