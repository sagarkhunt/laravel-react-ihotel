import React, { useEffect, useState } from 'react';
import Modal from '../../../components/common/Modal';

const EditCustomerDetails = ({
    formData,
    setFormData,
    customerDetails,
    setCustomerDetails,
    showEditCustomerDetails,
    setShowEditCustomerDetails,
    dropDownData,
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({
            ...customerDetails,
            [name]: value,
        });
    };

    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        if (customerDetails?.country_id) {
            const states = dropDownData['state']?.filter(
                (state) =>
                    parseInt(state.country_id) ===
                    parseInt(customerDetails?.country_id),
            );
            setStateList(states);
            setCityList([]);
        }
    }, [customerDetails?.country_id]);

    useEffect(() => {
        if (customerDetails?.country_id) {
            const city = dropDownData['city']?.filter(
                (city) =>
                    parseInt(city.state_id) ===
                        parseInt(customerDetails?.state_id) &&
                    parseInt(city.country_id) ===
                        parseInt(customerDetails?.country_id),
            );
            setCityList(city);
        }
    }, [customerDetails?.state_id]);

    return (
        <Modal
            open={showEditCustomerDetails}
            handleModal={() =>
                setShowEditCustomerDetails(!showEditCustomerDetails)
            }
        >
            <div
                className="modal"
                id="availibility_inquiry"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog  modal-center"
                    style={{
                        minWidth: '40%',
                    }}
                >
                    <div className="modal-content ">
                        <div className="modal-header d-flex justify-content-between">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Edit Customer Details
                            </h5>
                            <div className="d-flex gap-4 align-items-center">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setCustomerDetails(
                                            formData.customerDetails,
                                        );
                                        setShowEditCustomerDetails(false);
                                    }}
                                ></button>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="full_name"
                                            className="custom-label"
                                        >
                                            Name
                                        </label>
                                        <div className="row">
                                            <div className="col-10">
                                                <input
                                                    type="text"
                                                    className="form-control custom-input-lg"
                                                    id="full_name"
                                                    name="full_name"
                                                    value={
                                                        customerDetails?.full_name
                                                    }
                                                    onChange={handleInputChange}
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="col-2">
                                                <button
                                                    type="button"
                                                    className="btn person-icon"
                                                >
                                                    <svg
                                                        width="24"
                                                        height="25"
                                                        viewBox="0 0 24 25"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10 11.0303C12.21 11.0303 14 9.24027 14 7.03027C14 4.82027 12.21 3.03027 10 3.03027C7.79 3.03027 6 4.82027 6 7.03027C6 9.24027 7.79 11.0303 10 11.0303ZM10 5.03027C11.1 5.03027 12 5.93027 12 7.03027C12 8.13027 11.1 9.03027 10 9.03027C8.9 9.03027 8 8.13027 8 7.03027C8 5.93027 8.9 5.03027 10 5.03027Z"
                                                            fill="#0863B5"
                                                        />
                                                        <path
                                                            d="M4 17.0303C4.22 16.3103 7.31 15.0303 10 15.0303C10 14.3303 10.13 13.6603 10.35 13.0403C7.62 12.9403 2 14.3003 2 17.0303V19.0303H11.54C11.02 18.4503 10.61 17.7803 10.35 17.0303H4Z"
                                                            fill="#0863B5"
                                                        />
                                                        <path
                                                            d="M19.43 17.0503C19.79 16.4603 20 15.7703 20 15.0303C20 12.8203 18.21 11.0303 16 11.0303C13.79 11.0303 12 12.8203 12 15.0303C12 17.2403 13.79 19.0303 16 19.0303C16.74 19.0303 17.43 18.8103 18.02 18.4603C18.95 19.3903 19.64 20.0803 20.59 21.0303L22 19.6203C20.5 18.1203 21.21 18.8203 19.43 17.0503ZM16 17.0303C14.9 17.0303 14 16.1303 14 15.0303C14 13.9303 14.9 13.0303 16 13.0303C17.1 13.0303 18 13.9303 18 15.0303C18 16.1303 17.1 17.0303 16 17.0303Z"
                                                            fill="#0863B5"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="guestClass"
                                            className="custom-label"
                                        >
                                            Guest Class
                                        </label>
                                        <select
                                            name="guestClass"
                                            onChange={handleInputChange}
                                            value={customerDetails?.guestClass}
                                            className="form-select custom-input-lg"
                                            id="guestClass"
                                        >
                                            <option value="0">Select</option>
                                            {dropDownData['guest_classes']?.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    );
                                                },
                                            )}
                                            {/* <option value="VIP">VIP</option>
                                            <option value="REGULAR">
                                                Regular
                                            </option>
                                            <option value="PRESIDENT">
                                                President
                                            </option> */}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="mobile"
                                            className="custom-label"
                                        >
                                            Mobile No
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-input-lg"
                                            id="mobile"
                                            name="mobile"
                                            placeholder="Mobile No"
                                            value={customerDetails?.mobile}
                                            onChange={handleInputChange}
                                            minLength={10} // Set minimum length for validation
                                            pattern="[0-9]+" // Optional pattern for numeric input
                                            title={`Mobile number must be at least ${10} digits`} // Provide user-friendly tooltip
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="email"
                                            className="custom-label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control custom-input-lg"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={customerDetails?.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="address"
                                            className="custom-label"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-input-lg"
                                            id="address"
                                            name="address"
                                            placeholder="Address"
                                            value={customerDetails?.add}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="country"
                                            className="custom-label"
                                        >
                                            Country
                                        </label>
                                        <select
                                            className="form-select custom-input-lg"
                                            id="country_id"
                                            name="country_id"
                                            placeholder="Country"
                                            value={customerDetails?.country_id}
                                            onChange={handleInputChange}
                                        >
                                            <option value="0">Select</option>
                                            {dropDownData['country']?.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="state_id"
                                            className="custom-label"
                                        >
                                            State
                                        </label>
                                        <select
                                            className="form-select custom-input-lg"
                                            id="state_id"
                                            name="state_id"
                                            placeholder="State"
                                            value={customerDetails?.state_id}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select</option>
                                            {stateList?.map((item, index) => {
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
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="city_id"
                                            className="custom-label"
                                        >
                                            City
                                        </label>
                                        <select
                                            className="form-select custom-input-lg"
                                            id="city_id"
                                            name="city_id"
                                            placeholder="City"
                                            value={customerDetails?.city_id}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select</option>
                                            {cityList?.map((item, index) => {
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
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="pincode"
                                            className="custom-label"
                                        >
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control custom-input-lg"
                                            id="pincode"
                                            name="pincode"
                                            placeholder="Zip Code"
                                            value={customerDetails?.pincode}
                                            onChange={handleInputChange}
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
                                onClick={() => {
                                    setCustomerDetails(
                                        formData.customerDetails,
                                    );
                                    setShowEditCustomerDetails(false);
                                }}
                            >
                                Cancle
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        guest_json: customerDetails,
                                    });
                                    setShowEditCustomerDetails(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditCustomerDetails;
