import React from "react";
import Modal from "react-modal";

const ModalWrapper = ({ isOpen, onClose, children, label }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel={label}>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
