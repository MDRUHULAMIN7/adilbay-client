import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MegaMenu } from './mega-menu';
import { NavigationItem } from '@/types/layout';
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

const mockItem: NavigationItem = {
  id: 'shop',
  label: 'Shop Menu',
  href: '/shop',
  children: [
    { id: 'living', label: 'Living Room Sets', href: '/shop?category=living' },
    { id: 'bedroom', label: 'Bedroom Sets', href: '/shop?category=bedroom' },
  ],
};

describe('MegaMenu Component', () => {
  it('renders trigger button and shows panel on focus', () => {
    render(
      <AppProviders>
        <MegaMenu item={mockItem} />
      </AppProviders>
    );
    const trigger = screen.getByRole('button', { name: 'Shop Menu' });
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByText('Living Room Sets')).not.toBeInTheDocument();

    fireEvent.focus(trigger);
    expect(screen.getByText('Living Room Sets')).toBeInTheDocument();
  });
});
