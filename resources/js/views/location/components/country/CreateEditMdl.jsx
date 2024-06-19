import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';

function CreateEditMdl({ open, setOpen, mode, onSubmit, data }) {
    const [isDefault, setIsDefault] = useState(data?.is_default || false);
    const [formData, setFormData] = useState({});

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        if (mode === 'Edit Country') {
            setFormData(data);
        } else {
            setFormData({ name: '' });
        }
    }, [mode, data]);

    function handleSubmit(event) {
        event.preventDefault();
        setFormData({
            ...formData,
            is_default: isDefault,
        });
        onSubmit(formData);
    }

    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal show"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                style={{ display: 'block' }}
                aria-modal="true"
                role="dialog"
            >
                <div className="modal-dialog modal-lg modal-center">
                    <form
                        method="post"
                        id="floordata"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title" id="ftable_header">
                                    {mode}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setOpen(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="customInput"
                                                className="custom-label"
                                            >
                                                Country Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control custom-input"
                                                id="name"
                                                name="name"
                                                placeholder="Country Name"
                                                value={formData.name || ''}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group d-flex gap-2 align-items-center mb-3">
                                            <input
                                                type="checkbox"
                                                className="custom-input-checkbox"
                                                id="is_default"
                                                name="is_default"
                                                value={isDefault}
                                                onChange={() =>
                                                    setIsDefault(!isDefault)
                                                }
                                            />
                                            <label
                                                htmlFor="defaultCountry"
                                                className="custom-label m-0"
                                            >
                                                Set Default Country
                                            </label>
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
    );
}

export default CreateEditMdl;
