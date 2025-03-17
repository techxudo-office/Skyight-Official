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
            className={`modal-content w-[600px] bg-white text-text border-4 rounded-xl border-primary max-h-[90%] overflow-auto  shadow-lg p-6 ${className}`}
            overlayClassName="modal-overlay fixed inset-0 flex justify-center items-center"
            closeTimeoutMS={300}
        >
            {children}
        </Modal>
    )
}
