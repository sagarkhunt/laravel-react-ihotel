import React, { useEffect, useState } from 'react';
import actions from '../../redux/CancellPolicy/actions';
import { useDispatch } from 'react-redux';

function EditPolicy({ setPolicyHide, cpName, cpDetails, cpId, setShowPolicy }) {
    const dispatch = useDispatch();
    const [showEditForm, setShowEditForm] = useState(false);
    const [showList, setShowList] = useState(false);
    const handleShowEditForm = () => {
        setShowList(false);
        setShowEditForm(true);
    };
    const [name, setName] = useState('');
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        if (cpDetails) {
            setName(cpName);
            setPolicies(cpDetails);
            setShowEditForm(false);
            setShowList(true);
        }
    }, [cpDetails, cpName]);

    const handlePolicyChange = (index, newValue) => {
        const updatedPolicies = [...policies];
        updatedPolicies[index] = newValue;
        setPolicies(updatedPolicies);
    };

    const handleAddPolicy = () => {
        setPolicies([...policies, '']);
    };

    const handleDeletePolicy = (index) => {
        const updatedPolicies = [...policies];
        updatedPolicies.splice(index, 1);
        setPolicies(updatedPolicies);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data with updated name and policies
        const policiesString = policies.join(',');

        // Prepare data object to send to the API
        const formData = {
            cp_id: cpId,
            name: name,
            description: policiesString,
            status: 1,
        };

        dispatch({
            type: actions.CP_UPDATE,
            payload: formData,
        });
        setPolicyHide(false);
        setShowList(false);
        setShowEditForm(false);
        setShowPolicy('');
    };
    useEffect(() => {
        // setShowPolicy('');
    }, [setShowPolicy]);
    return (
        <div>
            {/* <!-- View Policy  --> */}
            {showList && (
                <div
                    className="container-page policy-container-size y_scrolling"
                    // style={{
                    //     minHeight: 'calc(100vh - 88px)',
                    //     overflowY: 'scroll',
                    // }}
                >
                    <div className="modal-header p-3">
                        <h6 className="headline-h6m mb-0">{cpName}</h6>
                    </div>
                    <div
                        className="modal-body policy-container-body y_scrolling"
                        // style={{
                        //     height: 'calc(100vh - 120px)',
                        // }}
                    >
                        <ul
                            className="w-100 policy-ul"
                            // style={{ padding: '0 1rem' }}
                        >
                            {cpDetails.length > 0 ? (
                                cpDetails?.map((item, index) => (
                                    <li
                                        key={index}
                                        className="my-3"
                                        style={{ listStyle: 'none' }}
                                    >
                                        {item}
                                    </li>
                                ))
                            ) : (
                                <li>No items found</li>
                            )}
                        </ul>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleShowEditForm}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            )}

            {/* <!-- Edit More Policy  --> */}
            {showEditForm && (
                <div
                    className="container-page policy-container-size"
                    // style={{ minHeight: 'calc(100vh - 88px)' }}
                >
                    <div className="modal-header p-3">
                        <h6 className="headline-h6m mb-0">
                            Edit Cancellation Policy
                        </h6>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body policy-container-body y_scrolling">
                            <div className="row mb-3">
                                <div className="col-5 d-flex flex-column">
                                    <label
                                        htmlFor="name"
                                        className="body-2 pb-1"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="custom-input"
                                        style={{ borderWidth: '1px' }}
                                        placeholder="Name"
                                    />
                                </div>
                            </div>
                            <hr />
                            {policies.map((policy, index) => (
                                <div className="row my-3" key={index}>
                                    <div className="col-11 d-flex flex-column">
                                        <input
                                            type="text"
                                            value={policy}
                                            onChange={(e) =>
                                                handlePolicyChange(
                                                    index,
                                                    e.target.value,
                                                )
                                            }
                                            className="custom-input"
                                            style={{ borderWidth: '1px' }}
                                            placeholder="Add Policy"
                                        />
                                    </div>
                                    <div className="col-1">
                                        <button
                                            className="btn btn-outline h-100"
                                            type="button"
                                            onClick={() =>
                                                handleDeletePolicy(index)
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
                            <button
                                type="button"
                                className="btn btn-secondary d-flex align-items-center gap-2"
                                onClick={handleAddPolicy}
                            >
                                <span>Add</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditPolicy;