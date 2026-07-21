import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal, ModalHeader, ModalBody } from './modal';

jest.mock('@/hooks/useFocusTrap', () => ({
  useFocusTrap: () => ({ current: null }),
}));
jest.mock('@/hooks/useClickOutside', () => ({
  useClickOutside: () => ({ current: null }),
}));

describe('Modal Component', () => {
  it('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Content text</ModalBody>
      </Modal>
    );
    expect(screen.queryByText('Modal Title')).not.toBeInTheDocument();
  });

  it('renders modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Content text</ModalBody>
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });

  it('calls onClose handler when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <ModalHeader>Modal Title</ModalHeader>
      </Modal>
    );
    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
