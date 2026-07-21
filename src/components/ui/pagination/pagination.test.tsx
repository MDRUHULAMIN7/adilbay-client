import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from './pagination';

describe('Pagination Component', () => {
  it('renders page numbers and calls onPageChange', () => {
    const handlePageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />);

    expect(screen.getByLabelText('Go to page 2')).toHaveAttribute('aria-current', 'page');
    const page3Btn = screen.getByLabelText('Go to page 3');
    fireEvent.click(page3Btn);
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
});
