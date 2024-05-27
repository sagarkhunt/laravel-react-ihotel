import React from 'react';
import Modal from '../../components/common/Modal';

function PaymentMdl({ open, setOpen }) {
    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                class="modal right fade show"
                id="add_creditCard"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div class="modal-dialog modal-md modal-lf">
                    <div class="modal-content modal-lf-container">
                        <div class="modal-header">
                            <h5
                                class="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Add Payment
                            </h5>
                            <div class="d-flex gap-4 align-items-center">
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setOpen(false)}
                                ></button>
                            </div>
                        </div>
                        <ul class="nav tab-nav nav-pills" role="tablist">
                            <li class="nav-item">
                                <a
                                    class="nav-link nav-link-custom active"
                                    data-bs-toggle="pill"
                                    href="#addCredit"
                                >
                                    Add Credit Card
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link nav-link-custom"
                                    data-bs-toggle="pill"
                                    href="#addPayment"
                                >
                                    Add Payment
                                </a>
                            </li>
                        </ul>
                        <div
                            class="modal-body modal-lft-body"
                            style={{ minWidth: '500px' }}
                        >
                            <div class="tab-content">
                                <div
                                    id="addCredit"
                                    class="container px-0 tab-pane active"
                                >
                                    <form>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        Card Number*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        Card Holder Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        Expiry Date*
                                                    </label>
                                                    <select
                                                        class="form-select custom-input"
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
                                            <div class="col-4">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        {' '}
                                                    </label>
                                                    <select
                                                        class="form-select custom-input"
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
                                            <div class="col-4">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        CVV*
                                                    </label>
                                                    <input
                                                        type="number"
                                                        maxlength="6"
                                                        class="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="CVV"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        Format
                                                    </label>
                                                    <select
                                                        class="form-select custom-input"
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
                                    class="container tab-pane fade"
                                >
                                    <form>
                                        <div class="row">
                                            <div class="col-12 px-0">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        Payment Type
                                                    </label>
                                                    <select
                                                        class="form-select custom-input"
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
                                            <div class="col-12 px-0">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        REC/Vou#
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control custom-input"
                                                        id="customInput"
                                                        placeholder="Card Holder Name"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-7 px-0">
                                                <div class="form-group mb-3">
                                                    <label
                                                        for="customInput"
                                                        class="custom-label"
                                                    >
                                                        Rate
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control custom-input"
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
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-outline"
                                data-bs-dismiss="modal"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">
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
