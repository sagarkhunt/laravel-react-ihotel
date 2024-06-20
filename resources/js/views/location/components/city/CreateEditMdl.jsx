import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/Location/actions';

function CreateEditMdl({ open, setOpen, mode, onSubmit, data }) {
    const [formData, setFormData] = useState();

    function handleChange(event) {
        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
            return updatedFormData;
        });
    }

    useEffect(() => {
        if (mode === 'Edit City') {
            setFormData(data);
        } else {
            setFormData({});
        }
    }, [mode, data]);

    function handleSubmit(event) {
        event.preventDefault();
        if (mode === 'Add City') {
            const states = getCommaSeparatedString();
            setFormData((prevFormData) => {
                const updatedFormData = {
                    ...prevFormData,
                    name: states,
                };
                onSubmit(updatedFormData);
            });
        } else {
            onSubmit(formData);
        }
    }

    const dispatch = useDispatch();
    const { dropDownList } = useSelector((state) => state?.locationReducer);

    const [dropDownData, setDropDownData] = useState([]);

    useEffect(() => {
        setDropDownData(dropDownList);
    }, [dropDownList]);

    const [stateList, setStateList] = useState([]);

    useEffect(() => {
        if (!formData?.country_id || !dropDownData['state']) {
            return;
        }

        const states = dropDownData['state']?.filter(
            (state) =>
                parseInt(state.country_id) === parseInt(formData.country_id),
        );
        setStateList(states);
    }, [formData]);

    useEffect(() => {
        const sync_req = ['country', 'state'];
        dispatch({
            type: actions.DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','),
            },
        });
    }, []);

    const [inputs, setInputs] = useState([{ value: '' }]);

    const getCommaSeparatedString = () => {
        return inputs.map((input) => input.value).join(',');
    };

    const handleInputChange = (index, event) => {
        const values = [...inputs];
        values[index].value = event.target.value;
        setInputs(values);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { value: '' }]);
    };

    const handleRemoveInput = (index) => {
        const values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
    };

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
                            <div
                                className="modal-body y_scrolling"
                                style={{
                                    maxHeight: '375px',
                                }}
                            >
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
                                                    formData?.country_id || ''
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
                                            <select
                                                className="form-select custom-input"
                                                id="state_id"
                                                name="state_id"
                                                placeholder="State Name"
                                                value={formData?.state_id || ''}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select</option>
                                                {stateList &&
                                                    stateList?.map(
                                                        (item, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        },
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <label
                                    htmlFor="customInput"
                                    className="custom-label"
                                >
                                    City Name
                                </label>
                                {mode === 'Add City' ? (
                                    <div>
                                        {inputs.map((input, index) => (
                                            <div className="row" key={index}>
                                                <div
                                                    className="col-10 "
                                                    key={index}
                                                >
                                                    <div className="form-group mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="name"
                                                            name="name"
                                                            placeholder="City Name"
                                                            value={input.value}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    index,
                                                                    e,
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline"
                                                        onClick={() =>
                                                            handleRemoveInput(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            width="25"
                                                            height="24"
                                                            viewBox="0 0 25 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M16.5586 9V19H8.55859V9H16.5586ZM15.0586 3H10.0586L9.05859 4H5.55859V6H19.5586V4H16.0586L15.0586 3ZM18.5586 7H6.55859V19C6.55859 20.1 7.45859 21 8.55859 21H16.5586C17.6586 21 18.5586 20.1 18.5586 19V7Z"
                                                                fill="#0863B5"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="col-12 pt-0">
                                            <div className="button-container">
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    type="button"
                                                    onClick={handleAddInput}
                                                >
                                                    <span className="material-icons-outlined">
                                                        add
                                                    </span>
                                                    City
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control custom-input"
                                                id="name"
                                                name="name"
                                                placeholder="City Name"
                                                value={formData?.name || ''}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                {mode === 'Edit City' && (
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
                                                    Set Default City
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
