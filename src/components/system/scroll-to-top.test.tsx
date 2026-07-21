import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollToTop } from './scroll-to-top';

describe('ScrollToTop Component', () => {
  it('does not render by default, shows on scroll past threshold', () => {
    render(<ScrollToTop />);
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument();

    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });
});
