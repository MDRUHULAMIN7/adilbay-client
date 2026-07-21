import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from './select';

describe('Select Component', () => {
  it('renders correctly with placeholder and options', () => {
    render(
      <Select placeholder="Choose style">
        <option value="modern">Modern</option>
        <option value="classic">Classic</option>
      </Select>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Choose style')).toBeInTheDocument();
    expect(screen.getByText('Modern')).toBeInTheDocument();
  });

  it('triggers onChange correctly', () => {
    const handleChange = jest.fn();
    render(
      <Select onChange={handleChange}>
        <option value="modern">Modern</option>
        <option value="classic">Classic</option>
      </Select>
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'classic' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
