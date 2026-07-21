import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Divider } from './divider';

describe('Divider Component', () => {
  it('renders standard separator', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
