import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageHeader } from './page-header';

describe('PageHeader Component', () => {
  it('renders title and description properly', () => {
    render(<PageHeader title="Shop Catalog" description="Explore modern collections" />);
    expect(screen.getByText('Shop Catalog')).toBeInTheDocument();
    expect(screen.getByText('Explore modern collections')).toBeInTheDocument();
  });
});
