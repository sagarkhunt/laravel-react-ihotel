import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/Location/actions';

function CreateEditMdl({ open, setOpen, mode, onSubmit, data }) {
    const [formData, setFormData] = useState({});

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        if (mode === 'Edit State') {
            setFormData(data);
        } else {
            setFormData({ name: '' });
        }
    }, [mode, data]);

    function handleSubmit(event) {
        event.preventDefault();
        setFormData({
            ...formData,
        });
        onSubmit(formData);
    }

    const dispatch = useDispatch();
    const { dropDownList } = useSelector((state) => state?.locationReducer);
    console.log(dropDownList);
    
    const [dropDownData, setDropDownData] = useState([]);

    useEffect(() => {
        setDropDownData(dropDownList);
    }, [dropDownList]);

    useEffect(() => {
        const sync_req = ['country'];
        dispatch({
            type: actions.DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','),
            },
        });
    }, []);

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
                        id="statedata"
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
                                            <select
                                                className="form-select custom-input"
                                                id="country_id"
                                                name="country_id"
                                                placeholder="Country Name"
                                                value={
                                                    formData.country_id || ''
                                                }
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select</option>
                                                {dropDownData &&
                                                    dropDownData[
                                                        'country'
                                                    ]?.map((item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="customInput"
                                                className="custom-label"
                                            >
                                                State Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control custom-input"
                                                id="name"
                                                name="name"
                                                placeholder="State Name"
                                                value={formData.name || ''}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 pt-0">
                                        <div className="button-container">
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                // onClick={addState}
                                            >
                                                <span className="material-icons-outlined">
                                                    add
                                                </span>
                                                State
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {mode === 'Edit State' && (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group d-flex gap-2 align-items-center mb-3">
                                                <input
                                                    type="checkbox"
                                                    className="custom-input-checkbox"
                                                    id="is_default"
                                                    name="is_default"
                                                    checked={
                                                        formData?.is_default
                                                    }
                                                    onChange={() => {
                                                        setFormData({
                                                            ...formData,
                                                            is_default:
                                                                !formData.is_default,
                                                        });
                                                    }}
                                                />
                                                <label
                                                    htmlFor="defaultState"
                                                    className="custom-label m-0"
                                                >
                                                    Set Default State
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
