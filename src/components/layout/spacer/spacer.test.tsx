import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spacer } from './spacer';

describe('Spacer Component', () => {
  it('renders correctly with spacing classes', () => {
    render(<Spacer data-testid="spacer" size="lg" />);
    const element = screen.getByTestId('spacer');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('h-12');
  });
});
