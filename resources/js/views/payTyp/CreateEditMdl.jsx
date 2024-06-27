import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';

function CreateEditIDTypeMdl({
    open,
    setOpen,
    mode,
    onSubmit,
    payTypData,
    statusValue,
    setStatusValue,
}) {
    const [formData, setFormData] = useState({});

    // Define handleChange function to update form data state
    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    // Effect to update form data when payTypData prop changes
    useEffect(() => {
        if (mode === 'Edit Payment Type') {
            setStatusValue(payTypData?.status);

            // Create a new object with payTypData,
            const updatedFormData = {
                ...payTypData,
            };
            // Set formData with updatedFormData
            setFormData(updatedFormData);
        } else {
            // Clear form data for adding new ID Type
            setFormData({
                rcpt_type: '',
                is_show: 1,
            });
        }
    }, [mode, payTypData]);

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }

    return (
        <>
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
                            id="idTypeForm"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="hidden"
                                name="id_type_id"
                                id="id_type_id"
                                value="0"
                            />
                            <div className="modal-content">
                                <div className="modal-header d-flex justify-content-between align-items-center">
                                    <h5 className="modal-title" id="modalTitle">
                                        {mode}
                                    </h5>
                                    <div className="d-flex gap-4 align-items-center">
                                        {mode === 'Edit ID Type' ? (
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

                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Payment Type Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="rcpt_type"
                                                    name="rcpt_type"
                                                    placeholder="Pay Type Name"
                                                    value={
                                                        formData.rcpt_type || ''
                                                    }
                                                    onChange={handleChange}
                                                    required
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
        </>
    );
}

export default CreateEditIDTypeMdl;
