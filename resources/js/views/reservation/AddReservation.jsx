import React, { useEffect, useState } from 'react';
import PaymentMdl from './componet/PaymentMdl';
import '../../../css/AddReservation.css';
import { useNavigate } from 'react-router-dom';

import actions from '../../redux/Reservation/actions';

import { useDispatch, useSelector } from 'react-redux';
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
        country: '',
        state: '',
        city: '',
        zipCode: '',
    });
    const [formData, setFormData] = useState({
        frm_dt: '',
        to_dt: '',
        checkInTime: '12:00:00',
        checkOutTime: '10:00:00',
        booking_src_id: '',
        mrkt_sgmnt_id: '',
        sls_prsn_id: '',
        bsns_src_id: '',
        customerDetails: null,
        cncl_policy_id: '',
        terms_con_id: '',
        sp_req_json: '',
        sp_remarks: '',
        room_json: [],
        payment_json: {
            pay_type: '',
            pay_amnt: 0.0,
            ref_name: '',
        },
        com_rm_status: false,
    });

    const [totalAmount, setTotalAmount] = useState(0.0);
    const [taxAmount, setTaxAmount] = useState(800.0);

    useEffect(() => {
        const newTotalRate = formData.room_json.reduce((total, room) => {
            return total + parseFloat(room.pay_amnt);
        }, 0.0);

        setTotalAmount(newTotalRate);
    }, [formData.room_json]);

    useEffect(() => {
        if (formData.frm_dt && formData.to_dt) {
            const frm_dt = new Date(formData.frm_dt);
            const to_dt = new Date(formData.to_dt);
            const diffTime = Math.abs(to_dt - frm_dt);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNightCount(diffDays);
        }
    }, [formData.frm_dt, formData.to_dt]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData, '=========');
        setFormData({
            ...formData,
            taxes: taxAmount,
            total_amnt: totalAmount,
        });
        // dispatch({
        //     type: actions.RESER_ADD,
        //     payload: formData,
        // });
    }

    const [dropDownData, setDropDownData] = useState({});

    const { dropDownList } = useSelector((state) => state?.reserReducer);

    useEffect(() => {
        setDropDownData(dropDownList);
    }, [dropDownList]);

    useEffect(() => {
        const sync_req = [
            'booking_src',
            'sls_prsn',
            'bsns_src',
            'mrkt_sgmnt',
            'tnc',
            'cp',
        ];
        dispatch({
            type: actions.RESER_DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','),
            },
        });
    }, []);

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
                                                            name="frm_dt"
                                                            value={
                                                                formData.frm_dt
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
                                                            name="to_dt"
                                                            value={
                                                                formData.to_dt
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            min={
                                                                formData.frm_dt
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

                                        <select
                                            className="form-select custom-input-lg"
                                            id="bookingSourceDropdown"
                                            name="booking_src_id"
                                            value={formData.booking_src_id}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select</option>
                                            {dropDownData['booking_src']?.map(
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
                                                <option value="">Select</option>
                                                {dropDownData['bsns_src']?.map(
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
                                                <option value="">Select</option>
                                                {dropDownData['sls_prsn']?.map(
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
                                                <option value="">Select</option>
                                                {dropDownData[
                                                    'mrkt_sgmnt'
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
                                                        Room Plan
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
                                            height: 'calc(100vh - 470px)',
                                        }}
                                    >
                                        {formData.room_json?.map(
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
                                            name="cncl_policy_id"
                                            value={formData.cncl_policy_id}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select</option>
                                            {dropDownData['cp']?.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                        >
                                                            {item.cp_name}
                                                        </option>
                                                    );
                                                },
                                            )}
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
                                            name="terms_con_id"
                                            value={formData.terms_con_id}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select</option>
                                            {dropDownData['tnc']?.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                        >
                                                            {item.tnc_name}
                                                        </option>
                                                    );
                                                },
                                            )}
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
                        <form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div
                                className="card-body y_scrolling"
                                style={{
                                    height: 'calc(100vh - 145px)',
                                }}
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
                                                    className="custom-label body-2"
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
                                                    className="custom-label body-2"
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
                                                    <label className="custom-label caption-1">
                                                        Name
                                                    </label>
                                                    <p className="subtitle-2m">
                                                        {
                                                            formData
                                                                .customerDetails
                                                                ?.guestName
                                                        }
                                                    </p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <label className="custom-label caption-1">
                                                        Guest class
                                                    </label>
                                                    <p className="subtitle-2m">
                                                        {
                                                            formData
                                                                .customerDetails
                                                                ?.guestClass
                                                        }
                                                    </p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <label className="custom-label caption-1">
                                                        Mobile No
                                                    </label>
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
                                                id="sp_req_json"
                                                name="sp_req_json"
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
                                                id="sp_remarks"
                                                name="sp_remarks"
                                                placeholder="Special Remark"
                                                value={formData.sp_remarks}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                                <p className="body-2 m-0">
                                                    Taxes
                                                </p>
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
                                                    onClick={() =>
                                                        setOpen(true)
                                                    }
                                                >
                                                    Add Payment
                                                </button>
                                                <p className="body-2 m-0">
                                                    Advance Recieved
                                                </p>
                                            </div>
                                            <div className="col-4">
                                                {formData.payment_json
                                                    ?.pay_type &&
                                                formData.payment_json
                                                    ?.pay_amnt ? (
                                                    <p className="subtitle-2m m-0">
                                                        (
                                                        {
                                                            formData
                                                                .payment_json
                                                                ?.pay_type
                                                        }
                                                        )-₹
                                                        {
                                                            formData
                                                                .payment_json
                                                                ?.pay_amnt
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
                                                {formData.payment_json
                                                    ?.pay_amnt ? (
                                                    <p className="subtitle-2m red m-0">
                                                        ₹
                                                        {parseFloat(
                                                            totalAmount,
                                                        ) -
                                                            parseFloat(
                                                                formData
                                                                    .payment_json
                                                                    .pay_amnt,
                                                            ) +
                                                            parseFloat(
                                                                taxAmount,
                                                            )}
                                                    </p>
                                                ) : (
                                                    <p className="subtitle-2m red m-0">
                                                        ₹
                                                        {parseFloat(
                                                            totalAmount,
                                                        ) +
                                                            parseFloat(
                                                                taxAmount,
                                                            )}
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
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
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
