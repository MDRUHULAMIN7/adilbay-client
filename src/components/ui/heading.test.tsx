import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Heading } from './heading';

describe('Heading Component', () => {
  it('renders heading with level 1 by default', () => {
    render(<Heading>Hello World</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello World');
  });

  it('renders heading with correct level when specified', () => {
    render(<Heading level={3}>Sub Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Heading className="custom-class">Title</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('custom-class');
  });
});
