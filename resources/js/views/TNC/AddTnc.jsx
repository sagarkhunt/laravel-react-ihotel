import React, { useState } from 'react';
import actions from '../../redux/TermConition/actions';
import { useDispatch } from 'react-redux';
function AddTnc({ setTncPolicyHide, setShowTncPolicy }) {
    const [inputs, setInputs] = useState([{ value: '' }]);
    const dispatch = useDispatch();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            name: event.target.name.value,
            description: inputs.map((input) => input.value).join(','),
        };
        dispatch({
            type: actions.TNC_ADD,
            payload: formData,
        });
        setTncPolicyHide(false);
        setShowTncPolicy('');
    };
    return (
        <div
            className="container-page policy-container-size"
            // style={{ minHeight: 'calc(100vh - 88px)' }}
        >
            <div className="modal-header p-3">
                <h6 className="headline-h6m mb-0">Add Terms & Conditions</h6>
            </div>
            <form onSubmit={handleSubmit}>
                <div
                    className="modal-body policy-container-body"
                    // style={{
                    //     height: 'calc(100vh - 220px)',
                    //     overflowY: 'scroll',
                    // }}
                >
                    <div className="row mb-3">
                        <div className="col-5 d-flex flex-column">
                            <label htmlFor="name" className="body-2 pb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="custom-input"
                                style={{ borderWidth: '1px' }}
                                placeholder="Name"
                            />
                        </div>
                    </div>

                    <hr />

                    <div className="row my-3">
                        <div className="col-12 d-flex flex-column">
                            <label
                                htmlFor="cancellation-policy"
                                className="body-2 py-3 f-weight-600"
                                // style={{ color: '#0863b5', fontWeight: '600' }}
                            >
                                TERMS & CONDITIONS
                            </label>
                            {inputs.map((input, index) => (
                                <div className="row my-3" key={index}>
                                    <div className="col-11 d-flex flex-column">
                                        <input
                                            type="text"
                                            name={`cancellation-policy-${index}`}
                                            value={input.value}
                                            onChange={(event) =>
                                                handleInputChange(index, event)
                                            }
                                            className="custom-input"
                                            style={{ borderWidth: '1px' }}
                                            placeholder="Add TNC"
                                        />
                                    </div>
                                    <div className="col-1">
                                        <button
                                            type="button"
                                            className="btn btn-outline h-100"
                                            onClick={() =>
                                                handleRemoveInput(index)
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
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-secondary d-flex align-items-center gap-2"
                        onClick={handleAddInput}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                                fill="#0863B5"
                            />
                        </svg>
                        <span> Add </span>
                    </button>
                </div>

                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTnc;
