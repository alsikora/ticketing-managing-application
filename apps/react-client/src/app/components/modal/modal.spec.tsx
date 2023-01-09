import { render, screen } from '@testing-library/react';

import Modal from './modal';

const mockHandleCancel = jest.fn(() => {
});
const mockHandleSubmit = jest.fn(() => {
});

describe('Modal', () => {
  beforeAll(() => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot);
  });


  it('should render successfully', () => {
    const {baseElement} = render(<Modal
        title="" handleSave={mockHandleSubmit} handleCancel={mockHandleCancel}>
      <span></span>
    </Modal>);
    expect(baseElement).toBeTruthy();
  });

  it('should contain data', () => {
    render(<Modal
        title="Test modal" handleSave={mockHandleSubmit} handleCancel={mockHandleCancel}>
      <p>Very important information!</p>
    </Modal>);

    expect(screen.getByRole('heading')).toHaveTextContent('Test modal');
    expect(screen.getByText('Very important information!')).toBeTruthy();
  });
});
