import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {
  it('renders check box with label correctly', () => {
    render(<Checkbox label="Subscribe to newsletter" />);
    expect(screen.getByLabelText('Subscribe to newsletter')).toBeInTheDocument();
  });

  it('triggers onChange and shows checked state', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="I agree" onChange={handleChange} />);
    const checkbox = screen.getByLabelText('I agree');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });
});
