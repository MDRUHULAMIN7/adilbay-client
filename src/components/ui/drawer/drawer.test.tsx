import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Drawer } from './drawer';

jest.mock('@/hooks/useFocusTrap', () => ({
  useFocusTrap: () => ({ current: null }),
}));
jest.mock('@/hooks/useClickOutside', () => ({
  useClickOutside: () => ({ current: null }),
}));

describe('Drawer Component', () => {
  it('does not render drawer when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={jest.fn()} title="Filter Panel">
        <p>Drawer Body</p>
      </Drawer>
    );
    expect(screen.queryByText('Filter Panel')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={jest.fn()} title="Filter Panel">
        <p>Drawer Body</p>
      </Drawer>
    );
    expect(screen.getByText('Filter Panel')).toBeInTheDocument();
    expect(screen.getByText('Drawer Body')).toBeInTheDocument();
  });
});
