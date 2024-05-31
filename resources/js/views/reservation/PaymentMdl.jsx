import React from 'react';
import Modal from '../../components/common/Modal';

function PaymentMdl({ open, setOpen }) {
    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal right fade show"
                id="add_creditCard"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-md modal-lf">
                    <div className="modal-content modal-lf-container">
                        <div className="modal-header">
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
                        <ul className="nav tab-nav nav-pills" role="tablist">
                            <li className="nav-item">
                                <a
                                    className="nav-link nav-link-custom active"
                                    data-bs-toggle="pill"
                                    href="#addCredit"
                                >
                                    Add Credit Card
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link nav-link-custom"
                                    data-bs-toggle="pill"
                                    href="#addPayment"
                                >
                                    Add Payment
                                </a>
                            </li>
                        </ul>
                        <div
                            className="modal-body modal-lft-body"
                            style={{ minWidth: '500px' }}
                        >
                            <div className="tab-content">
                                <div
                                    id="addCredit"
                                    className="container px-0 tab-pane active"
                                >
                                    <form>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Card Number*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Card Holder Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Expiry Date*
                                                    </label>
                                                    <select
                                                        className="form-select custom-input"
                                                        aria-label=".form-select-sm example"
                                                    >
                                                        <option selected>
                                                            MM
                                                        </option>
                                                        <option value="1">
                                                            One
                                                        </option>
                                                        <option value="2">
                                                            Two
                                                        </option>
                                                        <option value="3">
                                                            Three
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        {' '}
                                                    </label>
                                                    <select
                                                        className="form-select custom-input"
                                                        aria-label=".form-select-sm example"
                                                    >
                                                        <option selected>
                                                            YYYY
                                                        </option>
                                                        <option value="1">
                                                            One
                                                        </option>
                                                        <option value="2">
                                                            Two
                                                        </option>
                                                        <option value="3">
                                                            Three
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        CVV*
                                                    </label>
                                                    <input
                                                        type="number"
                                                        maxLength="6"
                                                        className="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="CVV"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Format
                                                    </label>
                                                    <select
                                                        className="form-select custom-input"
                                                        aria-label=".form-select-sm example"
                                                    >
                                                        <option selected>
                                                            Physical Card
                                                        </option>
                                                        <option value="1">
                                                            One
                                                        </option>
                                                        <option value="2">
                                                            Two
                                                        </option>
                                                        <option value="3">
                                                            Three
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    id="addPayment"
                                    className="container tab-pane fade"
                                >
                                    <form>
                                        <div className="row">
                                            <div className="col-12 px-0">
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Payment Type
                                                    </label>
                                                    <select
                                                        className="form-select custom-input"
                                                        aria-label=".form-select-sm example"
                                                    >
                                                        <option selected>
                                                            Select Payment Type
                                                        </option>
                                                        <option value="1">
                                                            One
                                                        </option>
                                                        <option value="2">
                                                            Two
                                                        </option>
                                                        <option value="3">
                                                            Three
                                                        </option>
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
                                                        className="form-control custom-input"
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
                                                        className="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="12000"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                data-bs-dismiss="modal"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Add Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PaymentMdl;
