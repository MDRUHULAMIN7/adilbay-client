import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

describe('Tabs Component', () => {
  it('renders tab list and shows default active content', () => {
    render(
      <Tabs defaultValue="modern">
        <TabsList>
          <TabsTrigger value="modern">Modern Style</TabsTrigger>
          <TabsTrigger value="classic">Classic Style</TabsTrigger>
        </TabsList>
        <TabsContent value="modern">Modern furniture content</TabsContent>
        <TabsContent value="classic">Classic furniture content</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Modern furniture content')).toBeInTheDocument();
    expect(screen.queryByText('Classic furniture content')).not.toBeInTheDocument();
  });

  it('switches tabs on trigger click', () => {
    render(
      <Tabs defaultValue="modern">
        <TabsList>
          <TabsTrigger value="modern">Modern Style</TabsTrigger>
          <TabsTrigger value="classic">Classic Style</TabsTrigger>
        </TabsList>
        <TabsContent value="modern">Modern furniture content</TabsContent>
        <TabsContent value="classic">Classic furniture content</TabsContent>
      </Tabs>
    );

    const classicTrigger = screen.getByText('Classic Style');
    fireEvent.click(classicTrigger);

    expect(screen.getByText('Classic furniture content')).toBeInTheDocument();
    expect(screen.queryByText('Modern furniture content')).not.toBeInTheDocument();
  });
});
