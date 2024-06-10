import React from 'react';
import Modal from '../../../components/common/Modal';

function PaymentMdl({ open, setOpen }) {
    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal fade show"
                id="add_creditCard"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog modal-center"
                    style={{
                        width: '60%',
                    }}
                >
                    <div className="modal-content w-100">
                        <div className="modal-header d-flex justify-content-between">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Add Payment
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
                        <div className="modal-body">
                            <div className="row mx-0">
                                <div className="col-12 px-0">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="customInput"
                                            className="custom-label"
                                        >
                                            Payment Type
                                        </label>
                                        <select className="form-select custom-input-lg">
                                            <option selected>
                                                Select Payment Type
                                            </option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 px-0">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="customInput"
                                            className="custom-label"
                                        >
                                            REC/Vou#
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-input-lg"
                                            id="customInput"
                                            placeholder="Card Holder Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-7 px-0">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="customInput"
                                            className="custom-label"
                                        >
                                            Rate
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-input-lg"
                                            id="customInput"
                                            placeholder="12000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => setOpen(false)}
                            >
                                Close
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

export default PaymentMdl;
