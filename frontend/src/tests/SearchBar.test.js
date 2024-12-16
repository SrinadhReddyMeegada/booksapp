import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  const onSearch = jest.fn();

  it('should render search input with correct label', () => {
    render(<SearchBar query="" onSearch={onSearch} />);
    expect(screen.getByLabelText('Search Books or Authors')).toBeVisible();
  });

  it('should display the correct query value', () => {
    render(<SearchBar query="test query" onSearch={onSearch} />);
    expect(screen.getByDisplayValue('test query')).toBeVisible();
  });

  it('should call onSearch when input value changes', () => {
    render(<SearchBar query="" onSearch={onSearch} />);
    fireEvent.change(screen.getByLabelText('Search Books or Authors'), { target: { value: 'new query' } });
    expect(onSearch).toHaveBeenCalled();
  });
});