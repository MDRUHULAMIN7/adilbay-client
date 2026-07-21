import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text } from './text';

describe('Text Component', () => {
  it('renders text with correct content', () => {
    render(<Text>Sample text</Text>);
    const textElement = screen.getByText('Sample text');
    expect(textElement).toBeInTheDocument();
  });

  it('applies custom className and variant class', () => {
    render(<Text variant="large" className="custom-text">Large Text</Text>);
    const textElement = screen.getByText('Large Text');
    expect(textElement).toHaveClass('custom-text');
    expect(textElement).toHaveClass('text-lg');
  });
});
