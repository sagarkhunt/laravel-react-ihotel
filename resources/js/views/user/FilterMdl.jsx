import React from 'react';
import Modal from '../../components/common/Modal';

function FilterMdl({ openFilter, setOpenFilter }) {
    return (
        <Modal open={openFilter} handleModal={() => setOpenFilter(!openFilter)}>
            <div
                className={`modal fade ${openFilter ? 'show' : ''}`}
                tabIndex="-1"
                style={{
                    display: 'block',
                }}
            >
                <div className="modal-dialog modal-xs modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Filter</h5>
                            <div className="d-flex gap-2 align-items-center p-2">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setOpenFilter(false)}
                                    style={{
                                        padding: '.5rem .5rem',
                                        margin: '-.5rem -.5rem -.5rem auto',
                                    }}
                                ></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label
                                            htmlFor="customInput"
                                            className="custom-label"
                                        >
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control custom-input"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label
                                            htmlFor="customInput"
                                            className="custom-label"
                                        >
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control custom-input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="inquiry-status-container">
                                <label className="custom-label">
                                    Inquiry Status
                                </label>
                                <div className="radio-group">
                                    <input
                                        type="radio"
                                        id="statusAll"
                                        name="status"
                                        value="all"
                                        checked
                                    />
                                    <label for="statusAll">All</label>

                                    <input
                                        type="radio"
                                        id="statusActive"
                                        name="status"
                                        value="active"
                                    />
                                    <label for="statusActive">Active</label>

                                    <input
                                        type="radio"
                                        id="statusInactive"
                                        name="status"
                                        value="inactive"
                                    />
                                    <label for="statusInactive">Inactive</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setOpenFilter(false);
                                }}
                            >
                                Clear All
                            </button>
                            <button className="btn btn-primary">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default FilterMdl;
