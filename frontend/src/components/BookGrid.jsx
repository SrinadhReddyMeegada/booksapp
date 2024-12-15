import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const BookGrid = ({ books }) => {
  return (
    <Grid container spacing={3} sx={{ marginBottom: 4 }}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card sx={{ boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {book.volumeInfo.authors.join(', ')} - {book.volumeInfo.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {book.volumeInfo.description || 'No description available.'}
              </Typography>
              <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
                Published Date: {book.volumeInfo.publishedDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;