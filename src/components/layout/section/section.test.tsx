import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Section } from './section';

describe('Section Component', () => {
  it('renders correctly with padding classes', () => {
    render(<Section data-testid="section" variant="comfortable">Content</Section>);
    const element = screen.getByTestId('section');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('py-16');
  });
});
