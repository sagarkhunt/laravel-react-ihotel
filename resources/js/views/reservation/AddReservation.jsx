import React, { useState } from 'react';
import PaymentMdl from './PaymentMdl';
import '../../../css/AddReservation.css';
import { useNavigate } from 'react-router-dom';
function AddReservation() {
    const [selectedOption, setSelectedOption] = useState();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // This will navigate to the previous page
    };
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [open, setOpen] = useState(false);
    /***
     * @param{handleAddPayment}
     */
    function handleAddPayment() {
        // setMode('Add Inquiry Type');
        setOpen(true);
    }
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: '',
        reservationType: '1',
        bookingSource: '1',
        businessSource: '1',
        guestName: '',
        mobileNo: '',
        email: '',
        county: '',
        state: '',
        city: '',
        zipCode: '',
        cancellationPolicy: '1',
        termsAndConditions: '1',
        specialTerms: '',
        roomDetails: [
            {
                roomType: '1',
                ratePlan: '1',
                room: '1',
                adult: '2',
                child: '1',
                rate: '0.00',
            },
        ],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addRoom = () => {
        setFormData({
            ...formData,
            roomDetails: [
                ...formData.roomDetails,
                {
                    roomType: '1',
                    ratePlan: '1',
                    room: '1',
                    adult: '2',
                    child: '1',
                    rate: '0.00',
                },
            ],
        });
    };

    return (
        // <div className="">
        <div className="row row mt-3 mx-2">
            <div className="col">
                <div className="card card_height">
                    <div className="modal-header p-1" onClick={handleBackClick}>
                        <h5 className="headline-h6m mt-1 ms-2">
                            <span className="material-icons-outlined me-1">
                                arrow_back
                            </span>
                            Add Reservation
                        </h5>
                    </div>
                    <div className="card-body scrollable-modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="checkin-date"
                                        className="custom-label"
                                    >
                                        Check In
                                    </label>
                                    <div className="row">
                                        <div className="col-6 pe-0">
                                            <input
                                                type="date"
                                                className="form-control custom-input"
                                                id="checkin-date"
                                                name="checkInDate"
                                                value={formData.checkInDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-6 ps-0">
                                            <input
                                                type="time"
                                                id="checkin-time"
                                                className="form-control custom-input"
                                                name="checkInTime"
                                                value={formData.checkInTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="night-count">
                                    <p className="caption-2 font-white text-center mb-0">
                                        Night
                                    </p>
                                    <p className="caption-1b font-white mt-1 text-center mb-0">
                                        4
                                    </p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label
                                        htmlFor="checkout-date"
                                        className="custom-label"
                                    >
                                        Check Out
                                    </label>
                                    <div className="row">
                                        <div className="col-6 pe-0">
                                            <input
                                                type="date"
                                                className="form-control custom-input"
                                                id="checkout-date"
                                                name="checkOutDate"
                                                value={formData.checkOutDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-6 ps-0">
                                            <input
                                                type="time"
                                                id="checkout-time"
                                                className="form-control custom-input"
                                                name="checkOutTime"
                                                value={formData.checkOutTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <div className="">
                                    <label className="custom-label mb-1">
                                        Reservation Type
                                    </label>
                                </div>
                                <div className="">
                                    <select
                                        className="form-select custom-input"
                                        id="reservationTypeDropdown"
                                        name="reservationType"
                                        value={formData.reservationType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">
                                            Confirm Booking
                                        </option>
                                        <option value="2">
                                            Unconfirmed Booking Inquiry
                                        </option>
                                        <option value="3">
                                            Hold Confirm Booking
                                        </option>
                                        <option value="4">
                                            Hold Unconfirm Booking
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="">
                                    <label className="custom-label mb-1">
                                        Booking Source
                                    </label>
                                </div>
                                <div className="">
                                    <select
                                        className="form-select custom-input"
                                        id="bookingSourceDropdown"
                                        name="bookingSource"
                                        value={formData.bookingSource}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Direct</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="">
                                    <label className="custom-label mb-1">
                                        Business Source
                                    </label>
                                </div>
                                <div className="">
                                    <select
                                        className="form-select custom-input"
                                        id="businessSourceDropdown"
                                        name="businessSource"
                                        value={formData.businessSource}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Select</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                <p className="fw-bold primary-color">
                                    GUEST INFORMATION
                                </p>
                            </div>
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="guestName"
                                        className="custom-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="guestName"
                                        name="guestName"
                                        value={formData.guestName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="mobileNo"
                                        className="custom-label"
                                    >
                                        Mobile No
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="mobileNo"
                                        name="mobileNo"
                                        value={formData.mobileNo}
                                        onChange={handleInputChange}
                                        minLength={10} // Set minimum length for validation
                                        pattern="[0-9]+" // Optional pattern for numeric input
                                        title={`Mobile number must be at least ${10} digits`} // Provide user-friendly tooltip
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="email"
                                        className="custom-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control custom-input"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="county"
                                        className="custom-label"
                                    >
                                        County
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="county"
                                        name="county"
                                        value={formData.county}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="state"
                                        className="custom-label"
                                    >
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="city"
                                        className="custom-label"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="zipCode"
                                        className="custom-label"
                                    >
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                <p className="fw-bold primary-color">
                                    OTHER INFORMATION
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="">
                                        <label className="custom-label mb-1">
                                            Cancellation Policy
                                        </label>
                                    </div>
                                    <div className="">
                                        <select
                                            className="form-select custom-input"
                                            id="cancellationPolicyDropdown"
                                            name="cancellationPolicy"
                                            value={formData.cancellationPolicy}
                                            onChange={handleInputChange}
                                        >
                                            <option value="1">Policy 1</option>
                                            <option value="2">Policy 2</option>
                                            <option value="3">Policy 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="">
                                        <label className="custom-label mb-1">
                                            Terms & Conditions
                                        </label>
                                    </div>
                                    <div className="">
                                        <select
                                            className="form-select custom-input"
                                            id="termsAndConditionsDropdown"
                                            name="termsAndConditions"
                                            value={formData.termsAndConditions}
                                            onChange={handleInputChange}
                                        >
                                            <option value="1">
                                                Terms & Conditions
                                            </option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-2">
                                <div className="mt-1 mb-3">
                                    <label
                                        htmlFor="specialTerms"
                                        className="custom-label"
                                    >
                                        Special Terms
                                    </label>
                                    <textarea
                                        className="form-control custom-input special_terms"
                                        id="specialTerms"
                                        name="specialTerms"
                                        rows="4"
                                        value={formData.specialTerms}
                                        onChange={handleInputChange}
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
                        >
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary">
                            Reservation
                        </button>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card card_height">
                    <div className="modal-header p-1">
                        <h5 className="headline-h6m mt-1 ms-2">Room Details</h5>
                    </div>
                    <div className="card-body card-body-height">
                        <div className="row scrollable-modal-body-1">
                            <div className="custom-table flex-column d-flex">
                                <div className="custom-header d-flex">
                                    <div
                                        className="th-custom"
                                        style={{ width: '30%' }}
                                    >
                                        Room Type
                                    </div>
                                    <div
                                        className="th-custom"
                                        style={{ width: '18%' }}
                                    >
                                        Rate Plan
                                    </div>
                                    <div
                                        className="th-custom"
                                        style={{ width: '11%' }}
                                    >
                                        Room
                                    </div>
                                    <div
                                        className="th-custom"
                                        style={{ width: '11%' }}
                                    >
                                        Adult
                                    </div>
                                    <div
                                        className="th-custom"
                                        style={{ width: '11%' }}
                                    >
                                        Child
                                    </div>
                                    <div
                                        className="th-custom"
                                        style={{ width: '18%' }}
                                    >
                                        Rate (₹.)
                                    </div>
                                </div>
                                {formData.roomDetails.map((room, index) => (
                                    <div
                                        className="custom-row d-flex"
                                        key={index}
                                    >
                                        <div
                                            className="td-custom td-custom-p"
                                            style={{ width: '30%' }}
                                        >
                                            <div className="d-flex">
                                                <select
                                                    className="form-select custom-input custom_input_1"
                                                    name="roomType"
                                                    value={room.roomType}
                                                    onChange={(e) => {
                                                        const newRoomDetails = [
                                                            ...formData.roomDetails,
                                                        ];
                                                        newRoomDetails[
                                                            index
                                                        ].roomType =
                                                            e.target.value;
                                                        setFormData({
                                                            ...formData,
                                                            roomDetails:
                                                                newRoomDetails,
                                                        });
                                                    }}
                                                >
                                                    <option value="1">
                                                        Select
                                                    </option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="td-custom td-custom-p"
                                            style={{ width: '18%' }}
                                        >
                                            <div className="d-flex">
                                                <select
                                                    className="form-select custom-input custom_input_1"
                                                    name="ratePlan"
                                                    value={room.ratePlan}
                                                    onChange={(e) => {
                                                        const newRoomDetails = [
                                                            ...formData.roomDetails,
                                                        ];
                                                        newRoomDetails[
                                                            index
                                                        ].ratePlan =
                                                            e.target.value;
                                                        setFormData({
                                                            ...formData,
                                                            roomDetails:
                                                                newRoomDetails,
                                                        });
                                                    }}
                                                >
                                                    <option value="1">
                                                        Select
                                                    </option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="td-custom td-custom-p"
                                            style={{ width: '11%' }}
                                        >
                                            <div className="d-flex">
                                                <select
                                                    className="form-select custom-input custom_input_1"
                                                    name="room"
                                                    value={room.room}
                                                    onChange={(e) => {
                                                        const newRoomDetails = [
                                                            ...formData.roomDetails,
                                                        ];
                                                        newRoomDetails[
                                                            index
                                                        ].room = e.target.value;
                                                        setFormData({
                                                            ...formData,
                                                            roomDetails:
                                                                newRoomDetails,
                                                        });
                                                    }}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="td-custom td-custom-p"
                                            style={{ width: '11%' }}
                                        >
                                            <div className="d-flex">
                                                <select
                                                    className="form-select custom-input custom_input_1"
                                                    name="adult"
                                                    value={room.adult}
                                                    onChange={(e) => {
                                                        const newRoomDetails = [
                                                            ...formData.roomDetails,
                                                        ];
                                                        newRoomDetails[
                                                            index
                                                        ].adult =
                                                            e.target.value;
                                                        setFormData({
                                                            ...formData,
                                                            roomDetails:
                                                                newRoomDetails,
                                                        });
                                                    }}
                                                >
                                                    <option value="1">2</option>
                                                    <option value="2">3</option>
                                                    <option value="3">4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="td-custom td-custom-p"
                                            style={{ width: '11%' }}
                                        >
                                            <div className="d-flex">
                                                <select
                                                    className="form-select custom-input custom_input_1"
                                                    name="child"
                                                    value={room.child}
                                                    onChange={(e) => {
                                                        const newRoomDetails = [
                                                            ...formData.roomDetails,
                                                        ];
                                                        newRoomDetails[
                                                            index
                                                        ].child =
                                                            e.target.value;
                                                        setFormData({
                                                            ...formData,
                                                            roomDetails:
                                                                newRoomDetails,
                                                        });
                                                    }}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="td-custom td-custom-p"
                                            style={{ width: '18%' }}
                                        >
                                            <input
                                                type="text"
                                                className="custom-input custom_input_1"
                                                name="rate"
                                                value={room.rate}
                                                onChange={(e) => {
                                                    const newRoomDetails = [
                                                        ...formData.roomDetails,
                                                    ];
                                                    newRoomDetails[index].rate =
                                                        e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        roomDetails:
                                                            newRoomDetails,
                                                    });
                                                }}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div
                                    className="custom-row"
                                    style={{ width: '100%' }}
                                >
                                    <div
                                        className="td-custom td-custom-p pt-0"
                                        style={{ width: '100%' }}
                                    >
                                        <div className="button-container">
                                            <button
                                                className="btn btn-sm btn-secondary d-flex custom-btn-1 th-custom"
                                                onClick={addRoom}
                                            >
                                                <span className="material-icons-outlined">
                                                    add
                                                </span>
                                                Room
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="border rounded px-2 mb-2">
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="item-name">
                                        Room Charges
                                    </div>
                                    <div className="item-price">₹11,200</div>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="item-name">Taxes</div>
                                    <div className="item-price">₹800</div>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="item-name primary-color">
                                        Due Amount
                                    </div>
                                    <div className="item-price primary-color">
                                        ₹12,000
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-2">
                                <div className="">
                                    <label className="custom-label">
                                        Bill To
                                    </label>
                                </div>
                                <div className="">
                                    <select
                                        className="form-select listing_box"
                                        id="billToDropdown"
                                        name="billTo"
                                        value={formData.billTo}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Guest</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddPayment}
                        >
                            Add Payments
                        </button>
                    </div>
                </div>
            </div>
            {open && <PaymentMdl open={open} setOpen={setOpen} />}
        </div>
        // </div>
    );
}

export default AddReservation;
