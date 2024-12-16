import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookGrid from '../components/BookGrid';

describe('BookGrid Component', () => {
  const books = [
    {
      id: '1',
      title: 'Test Book 1',
      authors: ['Author 1'],
      description: 'This is a test description for book 1.',
    },
    {
      id: '2',
      title: 'Test Book 2',
      authors: ['Author 2'],
      description: 'This is a test description for book 2.',
    },
  ];

  it('should render loading state', () => {
    render(<BookGrid books={books} loading={true} />);
    expect(screen.queryByText('Test Book 1')).toBeNull();
  });

  it('should render book details when not loading', () => {
    render(<BookGrid books={books} loading={false} />);
    books.forEach((book) => {
      expect(screen.getByText(`${book.authors.join(', ')} - ${book.title}`)).toBeVisible();
      expect(screen.getByText(book.description)).toBeVisible();
    });
  });

  it('should render no books when books array is empty', () => {
    render(<BookGrid books={[]} loading={false} />);
    expect(screen.queryByText('Test Book 1')).toBeNull();
    expect(screen.queryByText('Test Book 2')).toBeNull();
  });
});