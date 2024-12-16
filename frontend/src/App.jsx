import React, { useState, useMemo, useEffect } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import PaginationControls from './components/PaginationControls';
import debounce from 'lodash/debounce';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    mostCommonAuthor: 'N/A',
    earliestDate: 'N/A',
    latestDate: 'N/A',
    responseTime: 'N/A',
  });

  const fetchBooks = async () => {
    try {
      const start = Date.now();
      const response = await axios.get('http://localhost:5001/api/books', {
        params: { query, page, limit },
      });
      const elapsed = Date.now() - start;

      const booksData = response.data.books || [];
      setBooks(booksData);
      setFilteredBooks(booksData);

      // Update stats
      setStats({
        totalItems: response.data.totalItems,
        mostCommonAuthor: response.data.mostCommonAuthor || 'N/A',
        earliestDate: response.data.earliestDate || 'N/A',
        latestDate: response.data.latestDate || 'N/A',
        responseTime: `${elapsed}ms`,
      });
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [query, page, limit]);

  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue) => {
        const filtered = books.filter((book) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.authors.some((author) => author.toLowerCase().includes(searchValue.toLowerCase()))
        );

        setFilteredBooks(filtered);
        setPage(1);
      }, 300),
    [books]
  );

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
    debouncedSearch(searchValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const paginatedBooks = filteredBooks.slice((page - 1) * limit, page * limit);

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
        Google Books Search
      </Typography>

      {/* Statistics Section */}
      <Box sx={{ marginY: 3 }}>
        <Typography variant="h6" gutterBottom>
          Statistics
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography>Total Items: {stats.totalItems}</Typography>
        <Typography>Most Common Author: {stats.mostCommonAuthor}</Typography>
        <Typography>Earliest Publication Date: {stats.earliestDate}</Typography>
        <Typography>Latest Publication Date: {stats.latestDate}</Typography>
        <Typography>Response Time: {stats.responseTime}</Typography>
      </Box>

      <SearchBar query={query} onSearch={handleSearch} />
      <BookGrid books={paginatedBooks} />
      <PaginationControls
        totalItems={filteredBooks.length}
        page={page}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </Container>
  );
};

export default App;
