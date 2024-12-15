import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ query, onSearch }) => {
  return (
    <TextField
      fullWidth
      label="Search Books or Authors"
      variant="outlined"
      value={query}
      onChange={onSearch}
      sx={{ marginBottom: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}
    />
  );
};

export default SearchBar;