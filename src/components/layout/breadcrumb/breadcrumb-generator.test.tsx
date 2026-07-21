import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BreadcrumbGenerator } from './breadcrumb-generator';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/playground/components';
  },
}));

describe('BreadcrumbGenerator', () => {
  it('splits pathname and maps path levels correctly', () => {
    render(<BreadcrumbGenerator />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Playground')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
  });
});
