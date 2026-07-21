import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MobileNav } from './mobile-nav';
import { AppProviders } from '@/providers';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/';
  },
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('MobileNav Component', () => {
  it('renders Drawer when open and displays menu items', () => {
    const handleClose = jest.fn();
    render(
      <AppProviders>
        <MobileNav isOpen={true} onClose={handleClose} />
      </AppProviders>
    );

    expect(screen.getByText('Shop')).toBeInTheDocument();
  });
});
