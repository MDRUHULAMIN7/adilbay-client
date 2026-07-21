import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Code } from './code';

describe('Code Component', () => {
  it('renders inline code with monospaced styles', () => {
    render(<Code>const x = 5;</Code>);
    const codeElement = screen.getByText('const x = 5;');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName.toLowerCase()).toBe('code');
    expect(codeElement).toHaveClass('font-mono');
  });
});
