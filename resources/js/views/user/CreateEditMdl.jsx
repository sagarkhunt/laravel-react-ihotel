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
        if (mode === 'Edit User') {
            setStatusValue(userData.status);
            setFormData(userData); // Pre-fill form with user data for editing
        } else {
            // Clear form data for adding new user
            setFormData({
                name: '',
                mobile_no: '',
                email: '',
                address: '',
                city: '',
                pincode: '',
                designation_id: '',
                date_of_join: '',
                user_name: '',
                password: '',
                from_time: '',
                to_time: '',
                user_status: 1,
            });
        }
    }, [mode, userData]);

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        onSubmit(formData);
    }
    return (
        <div>
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
                            id="userdata"
                            onSubmit={handleSubmit}
                        >
                            <div className="modal-content modal-lf-container">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="utable_header"
                                    >
                                        {mode}
                                    </h5>
                                    <div className="d-flex gap-4 align-items-center">
                                        {mode === 'Edit User' ? (
                                            <div className="d-flex gap-4 align-items-center">
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
                                        <div className="col-12 ">
                                            <p className="subtitle-2m  heading_box text-uppercase primary-color">
                                                User Info
                                            </p>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="name"
                                                    placeholder="Name"
                                                    name="name"
                                                    value={formData.name || ''}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Mobile
                                                </label>
                                                <input
                                                    type="number"
                                                    maxLength="10"
                                                    name="mobile"
                                                    className="form-control custom-input"
                                                    id="mobile_no"
                                                    placeholder="Mobile"
                                                    value={
                                                        formData.mobile || ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control custom-input"
                                                    id="email"
                                                    placeholder="Email"
                                                    name="email"
                                                    required
                                                    value={formData.email || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Address
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    type="text"
                                                    name="address"
                                                    className="form-control custom-input"
                                                    id="address"
                                                    placeholder="address"
                                                    value={
                                                        formData.address || ''
                                                    }
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="city"
                                                    placeholder="City"
                                                    name="city"
                                                    value={formData.city || ''}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Pincode
                                                </label>
                                                <input
                                                    type="number"
                                                    maxLength="6"
                                                    className="form-control custom-input"
                                                    id="pin"
                                                    placeholder="Pincode"
                                                    name="pin"
                                                    required
                                                    value={formData.pin || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12 ">
                                            <p className="subtitle-2m  heading_box text-uppercase primary-color">
                                                Work Info
                                            </p>
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Designation
                                                </label>
                                                <select
                                                    className="form-select custom-input"
                                                    aria-label=".form-select-sm example"
                                                    id="designation_id"
                                                    name="designation_id"
                                                    value={
                                                        formData.designation_id ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                    // onChange={(e) =>
                                                    //     setSelectedValue(
                                                    //         e.target.value,
                                                    //     )
                                                    // } // Handle the change event
                                                >
                                                    <option value="">
                                                        Select Designation
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
                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Date of Joining
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control custom-input"
                                                    id="date_of_join"
                                                    placeholder="Date of Joining"
                                                    name="date_of_join"
                                                    value={
                                                        formData.date_of_join ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="user_name"
                                                    placeholder="Username"
                                                    name="user_name"
                                                    required
                                                    value={
                                                        formData.user_name || ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control custom-input"
                                                    id="password"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={
                                                        formData.password || ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12 ">
                                            <p className="subtitle-2m  heading_box text-uppercase primary-color">
                                                Work Info
                                            </p>
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    From{' '}
                                                </label>
                                                <input
                                                    type="time"
                                                    className="form-control custom-input"
                                                    id="from_time"
                                                    placeholder="Username"
                                                    name="from_time"
                                                    value={
                                                        formData.from_time || ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    To
                                                </label>
                                                <input
                                                    type="time"
                                                    className="form-control custom-input"
                                                    id="to_time"
                                                    placeholder="Password"
                                                    name="to_time"
                                                    value={
                                                        formData.to_time || ''
                                                    }
                                                    onChange={handleChange}
                                                />
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
        </div>
    );
}

export default CreateEditMdl;
