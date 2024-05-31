import React from 'react';
import Modal from '../../components/common/Modal';

function AddStaff({ open, setOpen }) {
    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal show"
                id="addStaff"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog d-flex justify-content-center align-items-center modal-md"
                    style={{ height: 'calc(100vh - 100px)' }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Add Staff
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
                        <div className="modal-body d-flex flex-column w-100">
                            <label htmlFor="staff_name" className="form-label">
                                Staff name
                            </label>
                            <input
                                type="text"
                                name="staff_name"
                                className="custom-input"
                                placeholder="Staff name"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                data-bs-dismiss="modal"
                                onClick={() => setOpen(false)}
                            >
                                Cancle
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AddStaff;
