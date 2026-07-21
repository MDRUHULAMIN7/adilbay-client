import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkipNav } from './skip-nav';

describe('SkipNav Component', () => {
  it('renders correctly', () => {
    render(<SkipNav />);
    const link = screen.getByRole('link', { name: 'Skip to content' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });
});
