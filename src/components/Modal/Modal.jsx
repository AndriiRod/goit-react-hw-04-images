import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ selectedImage, onClose }) => {
  useEffect(() => {
    function huddleKeyDown(e) {
      e.key === 'Escape' && onClose();
    }

    window.addEventListener('keydown', huddleKeyDown);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', huddleKeyDown);
      document.documentElement.style.overflow = 'visible';
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={e => e.target === e.currentTarget && onClose()}>
      <ModalWindow>
        <img src={selectedImage} alt="LargeImage" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
