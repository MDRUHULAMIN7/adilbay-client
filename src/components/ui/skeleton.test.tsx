import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton } from './skeleton';

describe('Skeleton Component', () => {
  it('renders standard rectangle skeletons correctly', () => {
    const { container } = render(<Skeleton count={3} />);
    const pulses = container.querySelectorAll('.animate-pulse');
    expect(pulses.length).toBe(3);
  });
});
