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
                            <div className="modal-body d-flex mt-3 align-items-center justify-content-center flex-column gap-3">
                                <div className="delete-icon">
                                    <svg
                                        width="20"
                                        height="25"
                                        viewBox="0 0 20 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.826 10.46L9.99935 13.2867L7.15935 10.46L5.27935 12.34L8.11935 15.1667L5.29268 17.9933L7.17268 19.8733L9.99935 17.0467L12.826 19.8733L14.706 17.9933L11.8793 15.1667L14.706 12.34L12.826 10.46ZM14.666 1.83333L13.3327 0.5H6.66602L5.33268 1.83333H0.666016V4.5H19.3327V1.83333H14.666ZM1.99935 21.8333C1.99935 23.3 3.19935 24.5 4.66602 24.5H15.3327C16.7993 24.5 17.9993 23.3 17.9993 21.8333V5.83333H1.99935V21.8333ZM4.66602 8.5H15.3327V21.8333H4.66602V8.5Z"
                                            fill="#E3001F"
                                        />
                                    </svg>
                                </div>
                                <div className="my-1">
                                    Are you sure you want to delete this item?
                                </div>
                            </div>
                            <div className="modal-footer gap-2 justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary p-2 px-3"
                                    onClick={deleteRow}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline p-2 px-3"
                                    data-bs-dismiss="modal"
                                    onClick={() => setOpen(false)}
                                >
                                    No
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
