import React, { Children } from 'react'
import Modal from 'react-modal';
import './ModalWrapper.css';
export default function ModalWrapper({
    children,
    className,
    isOpen,
    onRequestClose,
    contentLabel,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className={`modal-container border-4 border-primary rounded-2xl ${className}`}
            overlayClassName="modal-overlay"
            closeTimeoutMS={400}>
            {children}
        </Modal>
    )
}
