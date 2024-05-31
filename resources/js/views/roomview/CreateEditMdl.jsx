import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';

function CreateEditMdl({
    open,
    setOpen,
    mode,
    onSubmit,
    userData,
    statusValue,
    setStatusValue,
}) {
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({});
    // Define handleChange function to update form data state
    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    // Effect to update form data when userData prop changes
    useEffect(() => {
        if (mode === 'Edit Room View') {
            setStatusValue(userData.status);
            setFormData(userData); // Pre-fill form with user data for editing
        } else {
            // Clear form data for adding new user
            setFormData({
                room_view: '',
                desc: '',
                status: 1,
            });
        }
    }, [mode, userData]);

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }
    return (
        <>
            <Modal open={open} handleModal={() => setOpen(!open)}>
                <div
                    className="modal right show"
                    id="add_user"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    style={{ display: 'block' }}
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="modal-dialog modal-md modal-lf">
                        <form
                            method="post"
                            id="floordata"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="hidden"
                                name="floor_id"
                                id="floor_id"
                                value="0"
                            />
                            <div className="modal-content modal-lf-container">
                                <div className="modal-header d-flex justify-content-between">
                                    <h5
                                        className="modal-title"
                                        id="ftable_header"
                                    >
                                        {mode}
                                    </h5>
                                    <div className="d-flex gap-2 align-items-center">
                                        {mode === 'Edit Room View' ? (
                                            <div
                                                className="form-check form-switch"
                                                id="customSwitch"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="status"
                                                    name="status"
                                                    checked={statusValue}
                                                    onChange={(e) => {
                                                        const newValue = e
                                                            .target.checked
                                                            ? 1
                                                            : 0;
                                                        setStatusValue(
                                                            newValue,
                                                        );
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="status"
                                                >
                                                    Active
                                                </label>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setOpen(false)}
                                        ></button>
                                    </div>
                                </div>

                                <div className="modal-body modal-lf-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    View Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="room_view"
                                                    name="room_view"
                                                    placeholder="Plan Name"
                                                    value={
                                                        formData.room_view || ''
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="desc"
                                                    name="desc"
                                                    value={formData.desc || ''}
                                                    onChange={handleChange}
                                                    placeholder="Description"
                                                ></textarea>
                                            </div>
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
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CreateEditMdl;
