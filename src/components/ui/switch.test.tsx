import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch } from './switch';

describe('Switch Component', () => {
  it('renders correctly and toggles state', () => {
    const handleChange = jest.fn();
    render(<Switch checked={false} onChange={handleChange} label="Notifications" />);
    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(switchBtn);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
