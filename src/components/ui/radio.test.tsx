import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Radio, RadioGroup } from './radio';

describe('Radio and RadioGroup Components', () => {
  it('renders a group of radios correctly', () => {
    render(
      <RadioGroup name="payment-method" value="card">
        <Radio value="card" label="Credit Card" />
        <Radio value="paypal" label="PayPal" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Credit Card')).toBeChecked();
    expect(screen.getByLabelText('PayPal')).not.toBeChecked();
  });

  it('triggers onChange and selects option', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup name="payment-method" value="card" onChange={handleChange}>
        <Radio value="card" label="Credit Card" />
        <Radio value="paypal" label="PayPal" />
      </RadioGroup>
    );
    fireEvent.click(screen.getByLabelText('PayPal'));
    expect(handleChange).toHaveBeenCalledWith('paypal');
  });
});
