import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

describe('Accordion Component', () => {
  it('renders structure correctly and expands item on click', () => {
    render(
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Furnixo?</AccordionTrigger>
          <AccordionContent>A premium design library</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes, conforming to WCAG AA</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText('What is Furnixo?').closest('button');
    const trigger2 = screen.getByText('Is it accessible?').closest('button');

    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger2!);

    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });
});
