import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './input';

describe('Input Component', () => {
  it('renders input field correctly', () => {
    render(<Input placeholder="Enter username" />);
    const inputElement = screen.getByPlaceholderText('Enter username');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders helper and error text correctly', () => {
    render(
      <Input
        validationState="error"
        errorMessage="Username is required"
        helperText="Enter your unique name"
        placeholder="Enter username"
      />
    );
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.queryByText('Enter your unique name')).not.toBeInTheDocument();
  });

  it('displays helper text when not in error state', () => {
    render(<Input helperText="Safe password" />);
    expect(screen.getByText('Safe password')).toBeInTheDocument();
  });

  it('renders prefix and suffix elements', () => {
    render(<Input prefix={<span>$</span>} suffix={<span>USD</span>} />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });
});
