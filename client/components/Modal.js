import React, { useEffect } from 'react';

const Modal = ({ closeModal, invalidMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal(false);
    }, 2500);
  });
  return <div className='modal-login'>{invalidMessage}</div>;
};

export default Modal;
