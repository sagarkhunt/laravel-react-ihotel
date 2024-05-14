import React, { useEffect } from 'react';

const Modal = ({ open, handleModal, children }) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (open && event.target.classList.contains('modal-backdrop')) {
                handleModal();
            }
        };

        const handleEscapeKey = (event) => {
            if (open && event.key === 'Escape') {
                handleModal();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEscapeKey);
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeKey);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [open, handleModal]);
    return (
        <div>
            {open && (
                <div
                    className="modal-backdrop show"
                    onClick={handleModal}
                ></div>
            )}
            <div
                className={`${open ? 'show' : ''} message`}
                onClose={handleModal}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
