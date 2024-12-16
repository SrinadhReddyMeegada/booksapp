import { useCallback, useEffect, useState, } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import PaginationControls from './components/PaginationControls';
import debounce from 'lodash/debounce';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5411';
const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalItems: 0,
    mostCommonAuthor: 'N/A',
    earliestDate: 'N/A',
    latestDate: 'N/A',
    responseTime: 'N/A',
  });

  const fetchBooks = async (searchValue) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/books`, {
        params: { query: searchValue, page, limit },
      });
      const booksData = response.data.books || [];
      setBooks(booksData);

      // Update stats
      setStats({
        totalItems: response.data.totalItems,
        mostCommonAuthor: response.data.mostCommonAuthor || 'N/A',
        earliestDate: response.data.earliestDate || 'N/A',
        latestDate: response.data.latestDate || 'N/A',
        responseTime: response.data.responseTime,
      });
    } catch (error) {
      console.error('Error fetching books:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!query) return;
    fetchBooks(query);
  }, [page, limit]);

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      fetchBooks(searchValue);
    }, 300),
    [debounce]
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

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
        Google Books Search
      </Typography>

      <SearchBar query={query} onSearch={handleSearch} />
      <BookGrid books={books} loading={loading} />
      <PaginationControls
        totalItems={stats.totalItems}
        page={page}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

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
    </Container>
  );
};

export default App;
