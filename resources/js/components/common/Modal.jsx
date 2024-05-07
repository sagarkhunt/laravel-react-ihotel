import React, { useState } from 'react';

const Modal = ({ open, handleModal, children }) => {
    return (
        <div className={`${open ? 'show' : ''} message`} onClose={handleModal}>
            {children}
        </div>
    );
};

export default Modal;
