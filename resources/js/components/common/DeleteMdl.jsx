import React from 'react';
import Modal from './Modal';

function DeleteMdl({ open, setOpen, onSubmit, delId }) {
    const deleteRow = () => {
        onSubmit(delId);
    };
    return (
        <>
            <Modal open={open} handleModal={() => setOpen(!open)}>
                <div
                    className="modal fade show"
                    id="delete_group"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog modal-xs modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ftable_header">
                                    Delete
                                </h5>
                                <div className="d-flex gap-4 align-items-center">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setOpen(false)}
                                    ></button>
                                </div>
                            </div>

                            <div className="modal-body"></div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    data-bs-dismiss="modal"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={deleteRow}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default DeleteMdl;
