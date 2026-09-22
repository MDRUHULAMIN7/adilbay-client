import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Logo } from './logo';

describe('Logo Component', () => {
  it('renders and contains site name text', () => {
    render(<Logo />);
    expect(screen.getByText('AdilBay')).toBeInTheDocument();
  });
});
