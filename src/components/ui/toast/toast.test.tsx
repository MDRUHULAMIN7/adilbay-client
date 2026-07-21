import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToastProvider } from './toast-provider';
import { useToast } from './use-toast';

function TestComponent() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ type: 'success', message: 'Item saved successfully' })}>
      Show Toast
    </button>
  );
}

describe('Toast Component', () => {
  it('triggers toast alert and dismisses after action', async () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByRole('button', { name: 'Show Toast' });
    fireEvent.click(button);

    expect(screen.getByText('Item saved successfully')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Item saved successfully')).not.toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });
});
