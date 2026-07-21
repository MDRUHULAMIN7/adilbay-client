import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card, CardHeader, CardTitle, CardContent } from './card';

describe('Card Component', () => {
  it('renders structure correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Elegant Sofa</CardTitle>
        </CardHeader>
        <CardContent>Premium Italian Leather</CardContent>
      </Card>
    );
    expect(screen.getByText('Elegant Sofa')).toBeInTheDocument();
    expect(screen.getByText('Premium Italian Leather')).toBeInTheDocument();
  });
});
