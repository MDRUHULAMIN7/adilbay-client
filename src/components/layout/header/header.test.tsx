import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header';
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

describe('Header Component', () => {
  it('renders correctly with default links and actions', () => {
    render(
      <AppProviders>
        <Header />
      </AppProviders>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByLabelText('Open search dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Open shopping cart')).toBeInTheDocument();
  });
});
