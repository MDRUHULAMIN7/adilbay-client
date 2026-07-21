import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tooltip } from './tooltip';

describe('Tooltip Component', () => {
  it('shows tooltip content on mouse enter', async () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button', { name: 'Hover me' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
