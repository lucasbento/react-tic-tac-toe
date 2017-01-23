import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

const Modal = ({ show, children, onClose }) => (
  show && (
    <ModalContainer onClose={onClose}>
      <ModalDialog onClose={onClose}>
        {children}
      </ModalDialog>
    </ModalContainer>
  )
);

Modal.propTypes = {
  /**
   * Whether the modal should show or not.
   */
  show: PropTypes.bool.isRequired,
  /**
   * The component to be rendered inside of the modal.
   */
  children: PropTypes.node,
  /**
   * The function to be called when the user clicks outside of the modal or on the close button.
   */
  onClose: PropTypes.func,
};

export default Modal;
