import React, { useState, useMemo, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import PaginationControls from './components/PaginationControls';
import { mockBooks } from '../mockData';
import debounce from 'lodash/debounce';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filteredBooks, setFilteredBooks] = useState([]);
 const [books,setBooks]=useState([])
  const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/books', {
            params: { query, page, limit },
        });
        console.log('Response:', response.data); // Debug log
        setBooks(response.data.books);
        setFilteredBooks(response.data.books);
    } catch (error) {
        console.error('Error fetching books:', error.message);
    }
};
useEffect(()=>{
  fetchBooks();
},[query, page, limit])
console.log("Books",books)
  const debouncedSearch = useMemo(() => 
    debounce((searchValue) => {
      const filtered = books.items.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.volumeInfo.authors.some((author) => author.toLowerCase().includes(searchValue.toLowerCase()))
      );

      setFilteredBooks(filtered);
      setPage(1);
    }, 300),
  []);

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