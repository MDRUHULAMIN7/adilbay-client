import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './footer';
import { ToastProvider } from '@/components/ui/toast';

describe('Footer Component', () => {
  it('renders logo description and handles subscribe trigger', () => {
    render(
      <ToastProvider>
        <Footer />
      </ToastProvider>
    );

    expect(screen.getByText('Join Our Newsletter')).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText('Enter email address...');
    const button = screen.getByRole('button', { name: 'Subscribe' });

    fireEvent.change(input, { target: { value: 'user@example.com' } });
    fireEvent.click(button);

    expect(input).toHaveValue('');
  });
});
