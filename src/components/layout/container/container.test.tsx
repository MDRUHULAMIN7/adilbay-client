import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container } from './container';

describe('Container Component', () => {
  it('renders and respects variants classes', () => {
    render(<Container data-testid="container" variant="narrow">Narrow view</Container>);
    const element = screen.getByTestId('container');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('max-w-[768px]');
  });
});
