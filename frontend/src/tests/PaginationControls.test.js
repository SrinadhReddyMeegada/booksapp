import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationControls from '../components/PaginationControls';

describe('PaginationControls Component', () => {
  const onPageChange = jest.fn();
  const onLimitChange = jest.fn();

  it('should render items per page select', () => {
    render(
      <PaginationControls
        totalItems={100}
        page={1}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );
    expect(screen.getByText(/items per page:/i)).toBeVisible();
    expect(screen.getByRole('combobox')).toBeVisible();
  });

  it('should render pagination', () => {
    render(
      <PaginationControls
        totalItems={100}
        page={1}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );
    expect(screen.getByRole('list')).toBeVisible();
  });

  it('should call onPageChange when page is changed', () => {
    render(
      <PaginationControls
        totalItems={100}
        page={1}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(expect.anything(), 2);
  })
});