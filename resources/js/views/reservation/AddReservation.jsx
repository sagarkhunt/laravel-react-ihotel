import React, { useEffect, useState } from 'react';
import PaymentMdl from './componet/PaymentMdl';
import '../../../css/AddReservation.css';
import { useNavigate } from 'react-router-dom';

import actions from '../../redux/Reservation/actions';
import { useDispatch } from 'react-redux';
import AddCustomerDetails from './componet/AddCustomerDetails';
import AddRoom from './componet/AddRoom';
import EditCustomerDetails from './componet/EditCustomerDetails';

function AddReservation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleBackClick = () => {
        navigate(-1);
    };
    const [open, setOpen] = useState(false);
    /***
     * @param{handleAddPayment}
     */
    function handleAddPayment() {
        // setMode('Add Inquiry Type');
        setOpen(true);
    }
    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Set today's date as the minimum date
    const todayDate = getTodayDate();

    const [showAddRoom, setShowAddRoom] = useState(false);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [showEditCustomerDetails, setShowEditCustomerDetails] =
        useState(false);

    const [nightCount, setNightCount] = useState(0);

    const [customerDetails, setCustomerDetails] = useState({
        guestName: '',
        guestClass: '',
        mobileNo: '',
        email: '',
        county: '',
        state: '',
        city: '',
        zipCode: '',
    });
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        checkInTime: '12:00:00',
        checkOutTime: '10:00:00',
        reservationType: '1',
        bookingSource: '1',
        marketSegment: '1',
        salesPerson: '1',
        businessSource: '1',
        customerDetails: null,
        cancellationPolicy: '1',
        termsAndConditions: '1',
        specialRequest: '',
        specialRemark: '',
        roomDetails: [],
        paymentDetails: {
            paymentType: '',
            rate: 0.0,
            cardHolderName: '',
        },
        isComplimentary: false,
    });

    const [totalAmount, setTotalAmount] = useState(0.0);
    const [taxAmount, setTaxAmount] = useState(800.0);

    useEffect(() => {
        const newTotalRate = formData.roomDetails.reduce((total, room) => {
            return total + parseFloat(room.rate);
        }, 0.0);

        setTotalAmount(newTotalRate);
    }, [formData.roomDetails]);

    useEffect(() => {
        if (formData.checkInDate && formData.checkOutDate) {
            const checkInDate = new Date(formData.checkInDate);
            const checkOutDate = new Date(formData.checkOutDate);
            const diffTime = Math.abs(checkOutDate - checkInDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNightCount(diffDays);
        }
    }, [formData.checkInDate, formData.checkOutDate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData, '=========');
        dispatch({
            type: actions.RESER_ADD,
            payload: formData,
        });
    }

    return (
        <div className="row row mt-3 mx-2">
            <div className="col-8">
                <>
                    <div className="card m-0">
                        <div className="card-header d-flex p-3 pb-2 gap-2">
                            <span
                                className="material-icons-outlined me-1"
                                role="button"
                                onClick={handleBackClick}
                            >
                                arrow_back
                            </span>
                            <h5 className="headline-h6m m-0">
                                New Reservation
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <div className="row m-0">
                                    <div className="col-8">
                                        <div className="row mx-0">
                                            <div className="col-5 p-0">
                                                <label
                                                    htmlFor="checkin-date"
                                                    className="custom-label mb-1"
                                                >
                                                    Check In
                                                </label>
                                                <div className="row m-0">
                                                    <div className="col-12 p-0">
                                                        <input
                                                            type="date"
                                                            className="w-100 h-100 custom-input-lg rounded-right-none"
                                                            id="checkin-date"
                                                            name="checkInDate"
                                                            value={
                                                                formData.checkInDate
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            min={todayDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2 d-flex align-items-end justify-content-center">
                                                <div className="border night-count rounded text-center py-2">
                                                    <p className="mb-1">
                                                        Nights
                                                    </p>
                                                    <span>{nightCount}</span>
                                                </div>
                                            </div>
                                            <div className="col-5  p-0">
                                                <label
                                                    htmlFor="checkout-date"
                                                    className="custom-label mb-1"
                                                >
                                                    Check Out
                                                </label>
                                                <div className="row m-0">
                                                    <div className="col-12 p-0">
                                                        <input
                                                            type="date"
                                                            className="custom-input-lg w-100 h-100"
                                                            id="checkout-date"
                                                            name="checkOutDate"
                                                            value={
                                                                formData.checkOutDate
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            min={
                                                                formData.checkInDate
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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
                                                className="form-select custom-input-lg"
                                                id="bookingSourceDropdown"
                                                name="bookingSource"
                                                value={formData.bookingSource}
                                                onChange={handleInputChange}
                                            >
                                                <option value="1">
                                                    Direct
                                                </option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3 mx-0">
                                    <div className="col-4">
                                        <div className="">
                                            <label className="custom-label mb-1">
                                                Business Source
                                            </label>
                                        </div>
                                        <div className="">
                                            <select
                                                className="form-select custom-input-lg"
                                                id="businessSourceDropdown"
                                                name="businessSource"
                                                value={formData.businessSource}
                                                onChange={handleInputChange}
                                            >
                                                <option value="1">
                                                    Select
                                                </option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="">
                                            <label className="custom-label mb-1">
                                                Sales Person
                                            </label>
                                        </div>
                                        <div className="">
                                            <select
                                                className="form-select custom-input-lg"
                                                id="salesPerson"
                                                name="salesPerson"
                                                value={formData.salesPerson}
                                                onChange={handleInputChange}
                                            >
                                                <option value="1">
                                                    Select
                                                </option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="">
                                            <label className="custom-label mb-1">
                                                Market Segment
                                            </label>
                                        </div>
                                        <div className="">
                                            <select
                                                className="form-select custom-input-lg"
                                                id="marketSegment"
                                                name="marketSegment"
                                                value={formData.marketSegment}
                                                onChange={handleInputChange}
                                            >
                                                <option value="1">
                                                    Select
                                                </option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row m-0">
                                <div className="p-0 flex-column d-flex">
                                    <div className="light-blue-box py-2 px-1 d-flex">
                                        <div className="row m-0 w-100">
                                            <div className="col-4">
                                                Room Type
                                            </div>
                                            <div className="col-8">
                                                <div className="row">
                                                    <div className="col-3">
                                                        Rate Plan
                                                    </div>
                                                    <div className="col-2">
                                                        Room
                                                    </div>
                                                    <div className="col-2">
                                                        Adult
                                                    </div>
                                                    <div className="col-2">
                                                        Child
                                                    </div>
                                                    <div className="col-3 text-end">
                                                        Rate (₹)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="y_scrolling p-2"
                                        style={{
                                            height: 'calc(100vh - 520px)',
                                        }}
                                    >
                                        {formData.roomDetails?.map(
                                            (room, index) => (
                                                <div
                                                    className="row mx-0 my-3"
                                                    key={index}
                                                >
                                                    <div className="col-4">
                                                        {room.roomType}
                                                    </div>
                                                    <div className="col-8">
                                                        <div className="row">
                                                            <div className="col-3">
                                                                {room.ratePlan}
                                                            </div>
                                                            <div className="col-2">
                                                                {room.room}
                                                            </div>
                                                            <div className="col-2">
                                                                {room.adult}
                                                            </div>
                                                            <div className="col-2">
                                                                {room.child}
                                                            </div>
                                                            <div className="col-3 text-end">
                                                                ₹{room.rate}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                        <div className="custom-row">
                                            <div className="pt-0 d-flex align-items-center gap-4">
                                                <div className="button-container">
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() =>
                                                            setShowAddRoom(true)
                                                        }
                                                    >
                                                        <span className="material-icons-outlined">
                                                            add
                                                        </span>
                                                        Room
                                                    </button>
                                                </div>
                                                <div className="pt-0 form-group d-flex gap-2 align-items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="isComplimentary"
                                                        id="complimentary"
                                                        className="custom-input"
                                                        value={
                                                            formData.isComplimentary
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="isComplimentary"
                                                        className=" m-0 body-2"
                                                    >
                                                        Complimentary Room
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer border-0 justify-content-start">
                            <div className="row mx-0 mb-2 w-100">
                                <div className="col-5">
                                    <div className="">
                                        <label className="custom-label mb-1">
                                            Cancellation Policy
                                        </label>
                                    </div>
                                    <div className="">
                                        <select
                                            className="form-select custom-input-lg text-truncate"
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
                                <div className="col-5">
                                    <div className="">
                                        <label className="custom-label mb-1">
                                            Terms & Conditions
                                        </label>
                                    </div>
                                    <div className="">
                                        <select
                                            className="form-select custom-input-lg text-truncate"
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
                        </div>
                    </div>

                    {showAddRoom && (
                        <AddRoom
                            formData={formData}
                            setFormData={setFormData}
                            showAddRoom={showAddRoom}
                            setShowAddRoom={setShowAddRoom}
                        />
                    )}
                </>
            </div>

            <div className="col-4">
                <>
                    <div className="card m-0">
                        <div
                            className="card-body y_scrolling"
                            style={{
                                maxHeight: 'calc(100vh - 194px)',
                            }}
                        >
                            <form
                                method="post"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                            >
                                {/* <div className="row mt-3">
                                    <div className="col-12">
                                        <p className="fw-bold primary-color m-0">
                                            OFFERED
                                        </p>
                                    </div>
                                    <div className="my-3 d-flex gap-4">
                                        <div className="">
                                            <div className="form-group d-flex gap-2 align-items-center">
                                                <input
                                                    type="checkbox"
                                                    className="custom-input"
                                                    id="earlyCheckIn"
                                                    name="isEarlyCheckIn"
                                                    value={
                                                        formData.isEarlyCheckIn
                                                    }
                                                    onChange={() =>
                                                        setIsEarlyCheckIn(
                                                            !isEarlyCheckIn,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="isEarlyCheckIn"
                                                    className="custom-lable body-2"
                                                >
                                                    Early Check In
                                                </label>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="form-group d-flex gap-2 align-items-center">
                                                <input
                                                    type="checkbox"
                                                    className="custom-input"
                                                    id="earlyCheckOut"
                                                    name="isEarlyCheckOut"
                                                    value={
                                                        formData.isEarlyCheckOut
                                                    }
                                                    onChange={() =>
                                                        setIsEarlyCheckOut(
                                                            !isEarlyCheckOut,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="isEarlyCheckOut"
                                                    className="custom-lable body-2"
                                                >
                                                    Early Check Out
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-0">
                                        <div className="col-6">
                                            {isEarlyCheckIn && (
                                                <input
                                                    type="time"
                                                    className="custom-input-lg w-100"
                                                    name="checkInTime"
                                                    id="checkInTime"
                                                    value={formData.checkInTime}
                                                    onChange={handleInputChange}
                                                />
                                            )}
                                        </div>
                                        <div className="col-6">
                                            {isEarlyCheckOut && (
                                                <input
                                                    type="time"
                                                    className="custom-input-lg w-100"
                                                    name="checkOutTime"
                                                    id="checkOutTime"
                                                    value={
                                                        formData.checkOutTime
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="mb-2 d-flex align-items-center">
                                        <div className="col-6">
                                            <p className="fw-bold primary-color m-0">
                                                GUEST INFORMATION
                                            </p>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            {formData.customerDetails ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary d-flex align-items-center"
                                                    onClick={() =>
                                                        setShowEditCustomerDetails(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    <span className="material-icons-outlined">
                                                        edit
                                                    </span>
                                                    <span>Edit Guest Info</span>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary d-flex align-items-center"
                                                    onClick={() =>
                                                        setShowCustomerDetails(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    <span className="material-icons-outlined">
                                                        add
                                                    </span>
                                                    <span>Add Guest Info</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {formData.customerDetails && (
                                        <>
                                            <div className="row mx-0">
                                                <div className="col-6 p-0">
                                                    <lable className="custom-label caption-1">
                                                        Name
                                                    </lable>
                                                    <p className="subtitle-2m">
                                                        {
                                                            formData
                                                                .customerDetails
                                                                ?.guestName
                                                        }
                                                    </p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <lable className="custom-label caption-1">
                                                        Guest class
                                                    </lable>
                                                    <p className="subtitle-2m">
                                                        {
                                                            formData
                                                                .customerDetails
                                                                ?.guestClass
                                                        }
                                                    </p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <lable className="custom-label caption-1">
                                                        Mobile No
                                                    </lable>
                                                    <p className="subtitle-2m">
                                                        {
                                                            formData
                                                                .customerDetails
                                                                ?.mobileNo
                                                        }
                                                    </p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <label className="custom-label caption-1">
                                                        Email
                                                    </label>
                                                    <p className="subtitle-2m ">
                                                        {
                                                            formData
                                                                .customerDetails
                                                                ?.email
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="row mt-4">
                                    <div className="col-12">
                                        <p className="fw-bold primary-color">
                                            OTHER INFORMATION
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <div className="mt-1 mb-3">
                                            <label
                                                htmlFor="specialTerms"
                                                className="custom-label mb-1"
                                            >
                                                Special Request
                                            </label>
                                            <input
                                                className="form-control custom-input"
                                                id="specialRequest"
                                                name="specialRequest"
                                                placeholder="Special Terms"
                                                value={formData.specialTerms}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mt-1 mb-3">
                                            <label
                                                htmlFor="specialTerms"
                                                className="custom-label mb-1"
                                            >
                                                Special Remark
                                            </label>
                                            <input
                                                className="form-control custom-input"
                                                id="specialRemark"
                                                name="specialRemark"
                                                placeholder="Special Remark"
                                                value={formData.specialRemark}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row mx-0 my-1 border rounded p-2 text-end">
                                <div className="col-12">
                                    <div className="row my-2">
                                        <div className="col-8">
                                            <p className="body-2 m-0">
                                                Room Charges
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <p className="subtitle-2m m-0">
                                                ₹{parseFloat(totalAmount)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-8">
                                            <p className="body-2 m-0">Taxes</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="body-2 subtitle-2m m-0">
                                                ₹{parseFloat(taxAmount)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-8">
                                            <p className="body-2 primary-colori m-0">
                                                Total Amount
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <p className="subtitle-2m primary-colori m-0">
                                                ₹
                                                {parseFloat(totalAmount) +
                                                    parseFloat(taxAmount)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row my-2 align-items-center">
                                        <div className="col-8 d-flex justify-content-end gap-2 align-items-center">
                                            <button
                                                className="btn payment-button btn-primary"
                                                onClick={() => setOpen(true)}
                                            >
                                                Add Payment
                                            </button>
                                            <p className="body-2 m-0">
                                                Advance Recieved
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            {formData.paymentDetails
                                                ?.paymentType ? (
                                                <p className="subtitle-2m m-0">
                                                    (
                                                    {
                                                        formData.paymentDetails
                                                            ?.paymentType
                                                    }
                                                    )-₹
                                                    {
                                                        formData.paymentDetails
                                                            ?.rate
                                                    }
                                                </p>
                                            ) : (
                                                <p className="subtitle-2m m-0">
                                                    ₹0
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-8">
                                            <p className="body-2 pay-color m-0">
                                                Due Amount
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            {formData.paymentDetails ? (
                                                <p className="subtitle-2m red m-0">
                                                    ₹
                                                    {parseFloat(totalAmount) -
                                                        parseFloat(
                                                            formData
                                                                .paymentDetails
                                                                .rate,
                                                        ) +
                                                        parseFloat(taxAmount)}
                                                </p>
                                            ) : (
                                                <p className="subtitle-2m red m-0">
                                                    ₹
                                                    {parseFloat(totalAmount) +
                                                        parseFloat(taxAmount)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                    {showCustomerDetails && (
                        <AddCustomerDetails
                            formData={formData}
                            setFormData={setFormData}
                            customerDetails={customerDetails}
                            setCustomerDetails={setCustomerDetails}
                            handleInputChange={handleInputChange}
                            showCustomerDetails={showCustomerDetails}
                            setShowCustomerDetails={setShowCustomerDetails}
                        />
                    )}
                    {showEditCustomerDetails && (
                        <EditCustomerDetails
                            formData={formData}
                            setFormData={setFormData}
                            customerDetails={customerDetails}
                            setCustomerDetails={setCustomerDetails}
                            handleInputChange={handleInputChange}
                            showEditCustomerDetails={showEditCustomerDetails}
                            setShowEditCustomerDetails={
                                setShowEditCustomerDetails
                            }
                        />
                    )}
                </>
            </div>
            {open && (
                <PaymentMdl
                    open={open}
                    setOpen={setOpen}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
        </div>
    );
}

export default AddReservation;
