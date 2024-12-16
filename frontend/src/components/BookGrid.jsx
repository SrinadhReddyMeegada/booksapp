import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, Skeleton } from '@mui/material';

const BookGrid = ({ books, loading }) => {
  // State to track the expanded card
  const [expandedCard, setExpandedCard] = useState(null);

  // Function to toggle description visibility for a specific card
  const toggleDescription = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id)); // Toggle the expanded card
  };

  return (
    <Grid container spacing={3} sx={{ marginBottom: 4 }}>
      {books.map((book) => (
        <Book
          key={book.id}
          book={book}
          loading={loading}
          expanded={expandedCard === book.id}
          toggleDescription={() => toggleDescription(book.id)}
        />
      ))}
    </Grid>
  );
};

const Book = ({ book, loading, expanded, toggleDescription }) => {
  if (loading) {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' }, height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              <Skeleton />
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <Skeleton count={3} />
            </Typography>
            <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
              <Skeleton />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  const authors = book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'No authors available';
  const title = book.title || 'No title available';
  const description = book.description || 'No description available';
  const publishedDate = book.publishedDate || 'Unknown publish date';

  // Truncate the description if it's too long
  const truncatedDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          boxShadow: 3,
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.05)' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden', // Ensures content doesn't overflow
              textOverflow: 'ellipsis', // Adds "..." when the text overflows
              whiteSpace: 'nowrap', // Prevents text from wrapping to the next line
            }}
          >
            {authors} - {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: expanded ? 'none' : 3, // Show full description if expanded
              WebkitBoxOrient: 'vertical',
            }}
          >
            {expanded ? description : truncatedDescription}
          </Typography>
          <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
            Published Date: {publishedDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={toggleDescription}>
            {expanded ? 'View Less' : 'View More'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookGrid;
