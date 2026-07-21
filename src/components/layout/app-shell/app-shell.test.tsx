import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppShell } from './app-shell';
import { AppProviders } from '@/providers';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '/';
  },
}));

describe('AppShell Component', () => {
  it('renders children within main body scope', () => {
    render(
      <AppProviders>
        <AppShell>
          <div data-testid="page-child">Landing Area</div>
        </AppShell>
      </AppProviders>
    );

    expect(screen.getByTestId('page-child')).toBeInTheDocument();
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });
});
