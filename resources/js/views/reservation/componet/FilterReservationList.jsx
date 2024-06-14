import React from 'react';
import Modal from '../../../components/common/Modal';

export default function FilterReservationList({ open1, setOpen1 }) {
    return (
        <Modal open={open1} handleModal={() => setOpen1(!open)}>
            <div
                className="modal show"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                style={{ display: 'block' }}
                aria-modal="true"
                role="dialog"
            >
                <div
                    className="modal-dialog  modal-md"
                    style={{ height: 'calc(100vh - 100px)' }}
                >
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Filter
                            </h5>
                            <div className="gap-4 me-1">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row ">
                                <div className="col">
                                    <label
                                        htmlFor="checkin-date"
                                        className="custom-label mb-1"
                                    >
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control custom-input"
                                        id="checkin-date"
                                        placeholder=""
                                    />
                                </div>
                                <div className="col">
                                    <label
                                        htmlFor="checkout-date"
                                        className="custom-label mb-1"
                                    >
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control custom-input"
                                        id="checkout-date"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="input-group">
                                    <label className="custom-label mb-1">
                                        Business Source
                                    </label>
                                </div>
                                <div className="input-group">
                                    <select
                                        className="form-select custom-input"
                                        id="reservationTypeDropdown"
                                        aria-label="Reservation Type Dropdown"
                                    >
                                        <option selected value="1">
                                            All
                                        </option>
                                        <option value="2"></option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div>
                                    <h6>Inquiry Status</h6>
                                </div>
                                <div>
                                    <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="inquiryStatus"
                                        id="exampleRadios1"
                                        value="option1"
                                    />
                                    <label
                                        className="form-check-label me-3"
                                        htmlFor="exampleRadios1"
                                    >
                                        All
                                    </label>

                                    <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="inquiryStatus"
                                        id="exampleRadios2"
                                        value="option2"
                                    />
                                    <label
                                        className="form-check-label me-3"
                                        htmlFor="exampleRadios2"
                                    >
                                        Active
                                    </label>

                                    <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="inquiryStatus"
                                        id="exampleRadios3"
                                        value="option3"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="exampleRadios3"
                                    >
                                        Inactive
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div>
                                <button
                                    type="button"
                                    className="btn-sm btn-outline"
                                    data-bs-dismiss="modal"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn-sm btn-primary"
                                    data-bs-dismiss="modal"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
