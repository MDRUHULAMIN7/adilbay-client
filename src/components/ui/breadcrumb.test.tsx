import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb Component', () => {
  it('renders path elements correctly', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Shop', href: '/shop' },
      { label: 'Sofa' },
    ];
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Sofa')).toBeInTheDocument();
  });
});
