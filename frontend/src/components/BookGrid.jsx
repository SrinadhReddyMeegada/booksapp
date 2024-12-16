import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, Skeleton } from '@mui/material';

const BookGrid = ({ books, loading }) => {

  return (
    <Grid container spacing={3} sx={{ marginBottom: 4 }}>
      {books.map((book) => 
        (<Book book={book} loading={loading} key={book.id} />)
      )}
    </Grid>
  );
};

const Book = ({ book, loading }) => {
  if (loading) {
    console.log('loading');
    return (<Grid item xs={12} sm={6} md={4} key={book.id}>
    <Card sx={{ boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
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
    )
  }
  const authors = book.authors && book.authors.length > 0
    ? book.authors.join(', ')
    : 'No authors available';

  const title = book.title || 'No title available';
  const description = book.description || 'No description available';
  const publishedDate = book.publishedDate || 'Unknown publish date';
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle the description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Truncate the description if it's too long
  const truncatedDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

  return (
    <Grid item xs={12} sm={6} md={4} key={book.id}>
      <Card sx={{ boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            {authors} - {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {showFullDescription ? description : truncatedDescription}
          </Typography>
          <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
            Published Date: {publishedDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            color="primary" 
            onClick={toggleDescription}
          >
            {showFullDescription ? 'View Less' : 'View More'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BookGrid;
