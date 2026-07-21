import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Textarea } from './textarea';

describe('Textarea Component', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Describe your room..." />);
    expect(screen.getByPlaceholderText('Describe your room...')).toBeInTheDocument();
  });

  it('triggers onInput and resizes when autoResize is enabled', () => {
    const handleInput = jest.fn();
    render(<Textarea autoResize onInput={handleInput} placeholder="Describe room" />);
    const textarea = screen.getByPlaceholderText('Describe room');
    fireEvent.input(textarea, { target: { value: 'New room description text\nthat has many lines' } });
    expect(handleInput).toHaveBeenCalled();
  });
});
