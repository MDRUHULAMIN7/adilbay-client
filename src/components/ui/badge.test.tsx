import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './badge';

describe('Badge Component', () => {
  it('renders correctly', () => {
    render(<Badge>Sale</Badge>);
    expect(screen.getByText('Sale')).toBeInTheDocument();
  });
});
