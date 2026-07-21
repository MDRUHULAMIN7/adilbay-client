import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from './avatar';

describe('Avatar Component', () => {
  it('renders initials fallback when image is missing', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders online indicator dot when specified', () => {
    render(<Avatar name="Alice" status="online" />);
    const statusDot = screen.getByTestId('avatar-status');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveClass('bg-success');
  });
});
