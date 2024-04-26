import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';

function CreateEditMdl({ open, setOpen, mode, onSubmit, userData }) {
    console.log('🚀 ~ CreateEditMdl ~ userData:', userData);
    const [selectedValue, setSelectedValue] = useState('');
    const [iconName, setIconName] = useState(
        userData ? userData.amnt_icon : '',
    );

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
        if (mode === 'Edit Amenity') {
            setFormData(userData); // Pre-fill form with user data for editing
        } else {
            // Clear form data for adding new user
            setFormData({
                amnt: '',
                description: '',
                status: 'true',
            });
        }
    }, [mode, userData]);

    function selectIcon(val) {
        setIconName(val);
    }
    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        formData.selected_icon = iconName;
        onSubmit(formData);
    }
    return (
        <>
            <Modal open={open} handleModal={() => setOpen(!open)}>
                <div
                    className="modal right show"
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
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="ftable_header"
                                    >
                                        {mode}
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

                                <div className="modal-body modal-lf-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Amenity Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="amnt"
                                                    name="amnt"
                                                    placeholder="Ex: Laundry Service"
                                                    value={formData.amnt || ''}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="dropdown mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label d-block"
                                                >
                                                    Amenity Icon
                                                </label>
                                                <input
                                                    type="hidden"
                                                    id="selectedIconInput"
                                                    name="selected_icon"
                                                    value={
                                                        formData.amnt_icon || ''
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    id="iconDropdownButton"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <span
                                                        id="selectedIcon"
                                                        className="material-icons"
                                                    >
                                                        {iconName}
                                                    </span>
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="iconDropdownButton"
                                                >
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() =>
                                                                selectIcon(
                                                                    'home',
                                                                )
                                                            }
                                                        >
                                                            <span className="material-icons-outlined edit-table">
                                                                create
                                                            </span>
                                                            Home
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() =>
                                                                selectIcon(
                                                                    'person',
                                                                )
                                                            }
                                                        >
                                                            <i className="material-icons">
                                                                person
                                                            </i>{' '}
                                                            Profile
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() =>
                                                                selectIcon(
                                                                    'settings',
                                                                )
                                                            }
                                                        >
                                                            <i className="material-icons">
                                                                settings
                                                            </i>
                                                            Settings
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group  mb-3">
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
                                                    id="description"
                                                    name="description"
                                                    placeholder="Description"
                                                    value={
                                                        formData.description ||
                                                        ''
                                                    }
                                                    onChange={handleChange}
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
