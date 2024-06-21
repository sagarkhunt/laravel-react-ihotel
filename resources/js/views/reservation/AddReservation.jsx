import React, { useEffect, useRef, useState } from 'react';
import PaymentMdl from './componet/PaymentMdl';
import '../../../css/AddReservation.css';
import { useNavigate } from 'react-router-dom';

import actions from '../../redux/Reservation/actions';

import { useDispatch, useSelector } from 'react-redux';
import AddCustomerDetails from './componet/AddCustomerDetails';
import AddRoom from './componet/AddRoom';
import EditCustomerDetails from './componet/EditCustomerDetails';
import AvailableInqMdl from './componet/AvailableInqMdl';
import toast from 'react-hot-toast';

function AddReservation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleBackClick = () => {
        navigate(-1);
    };
    const [showAddRoom, setShowAddRoom] = useState(false);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [showEditCustomerDetails, setShowEditCustomerDetails] =
        useState(false);

    const [nightCount, setNightCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [dropDownData, setDropDownData] = useState({});

    const [totalAmount, setTotalAmount] = useState(0.0);
    const [taxAmount, setTaxAmount] = useState(100.0);

    const [showAvaInq, setShowAvaInq] = useState(false);

    const showAvailableModal = () => {
        setShowAvaInq(true);
    };

    const { dropDownList } = useSelector((state) => state?.reserReducer);
    /***
     * @param{handleAddPayment}
     */
    function handleAddPayment() {
        setOpen(true);
    }
    const showRoomDetails = () => {
        setShowAddRoom(true);
    };
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

    const [customerDetails, setCustomerDetails] = useState({
        full_name: '',
        guestClass: '',
        mobile: '',
        add: '',
        email: '',
        country_id: '',
        state_id: '',
        city_id: '',
        pincode: '',
    });
    const [formData, setFormData] = useState({
        group_id: 0,
        guest_id: 0,
        frm_dt: '',
        to_dt: '',
        bsns_src_id: '',
        booking_src_id: '',
        sls_prsn_id: '',
        mrkt_sgmnt_id: 0,
        room_json: [],
        cncl_policy_id: '',
        terms_con_id: '',
        sp_req_json: '',
        sp_remarks: '',
        payment_json: {
            pay_type: '',
            pay_amnt: '',
            ref_name: '',
        },
        com_rm_status: false,
        taxes: taxAmount,
        rate: totalAmount,
    });

    useEffect(() => {
        const newTotalRate = formData.room_json.reduce((total, room) => {
            return total + parseFloat(room?.rate);
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
    const inputRefFrom = useRef(null);
    const inputRefTo = useRef(null);
    // const todayDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const handleContainerClickFrom = () => {
        if (inputRefFrom.current) {
            inputRefFrom.current.focus();
            inputRefFrom.current.showPicker(); // Programmatically show the date picker if supported
        }
    };
    const handleContainerClickTo = () => {
        if (inputRefTo.current) {
            inputRefTo.current.focus();
            inputRefTo.current.showPicker(); // Programmatically show the date picker if supported
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    function validateParams(formData, paramsToValidate) {
        for (let param of paramsToValidate) {
            if (formData?.[param] === '') {
                // Handle validation failure
                toast.error(`${param} cannot be empty or null`);
                return false; // Indicate validation failure
            }
        }
        return true; // All parameters passed validation
    }

    const handleDeleteRow = (index) => {
        const updatedRooms = [...formData.room_json];
        updatedRooms.splice(index, 1);
        setFormData({ ...formData, room_json: updatedRooms });
    };

    function handleSubmit(e) {
        e.preventDefault();
        // setFormData({
        //     ...formData,
        //     taxes: taxAmount,
        //     non: nightCount,
        //     total_amnt: totalAmount,
        // });
        const paramsToValidate = [
            'frm_dt',
            'to_dt',
            'booking_src_id',
            'bsns_src_id',
            'sls_prsn_id',
            'cncl_policy_id',
        ];

        if (!validateParams(formData, paramsToValidate)) {
            // Handle validation failure, if needed
            return;
        }

        setFormData({
            ...formData,
            taxes: taxAmount,
            non: nightCount,
            total_amnt: totalAmount,
        });

        dispatch({
            type: actions.RESER_ADD,
            payload: formData,
        });

        navigate('/reservation-list');
    }

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
            'room_cate',
            'rooms',
            'rooms_plan',
            'country',
            'guest_classes',
            'state',
            'city',
        ];
        dispatch({
            type: actions.RESER_DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','),
            },
        });
    }, []);

    const handleMinus = (index, field) => {
        const newRoomDetails = [...formData.room_json];
        let count = parseInt(newRoomDetails[index][field]) - 1;

        if (field === 'chld') {
            count = count < 0 ? 0 : count;
        } else {
            count = count < 1 ? 1 : count;
        }

        newRoomDetails[index][field] = count.toString();
        setFormData({
            ...formData,
            room_json: newRoomDetails,
        });
    };

    const handlePlus = (index, field) => {
        const newRoomDetails = [...formData.room_json];
        let count = parseInt(newRoomDetails[index][field]) + 1;

        newRoomDetails[index][field] = count.toString();
        setFormData({
            ...formData,
            room_json: newRoomDetails,
        });
    };

    return (
        <div className="row row mt-3 mx-2">
            <div className="col-8">
                <div className="card m-0">
                    <div className="card-header d-flex p-3 pb-2 gap-2">
                        <span
                            className="material-icons-outlined me-1"
                            role="button"
                            onClick={handleBackClick}
                        >
                            arrow_back
                        </span>
                        <h5 className="headline-h6m m-0">New Reservation</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-4">
                            <div className="row m-0">
                                <div className="col-8">
                                    <div className="row mx-0">
                                        <div className="col-4 p-0">
                                            <label
                                                htmlFor="checkin-date"
                                                className="custom-label mb-1"
                                            >
                                                Check In
                                            </label>
                                            <div
                                                className="row m-0 cp"
                                                onClick={
                                                    handleContainerClickFrom
                                                }
                                            >
                                                <div className="col-12 p-0">
                                                    <input
                                                        type="date"
                                                        className="w-100 h-100 custom-input-lg rounded-right-none"
                                                        id="checkin-date"
                                                        name="frm_dt"
                                                        value={formData.frm_dt}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        min={todayDate}
                                                        ref={inputRefFrom}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2  ps-4">
                                            <label
                                                htmlFor="checkin-date"
                                                className="custom-label mb-1"
                                            >
                                                Nights
                                            </label>
                                            <div className="row m-0  cp border res-night-count rounded text-center py-1">
                                                <div className="col-12 p-0 d-flex align-items-center justify-content-center mt-1">
                                                    <span className="h5">
                                                        {nightCount}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4  p-0">
                                            <label
                                                htmlFor="checkout-date"
                                                className="custom-label mb-1"
                                            >
                                                Check Out
                                            </label>
                                            <div
                                                className="row m-0"
                                                onClick={handleContainerClickTo}
                                            >
                                                <div className="col-12 p-0">
                                                    <input
                                                        type="date"
                                                        className="custom-input-lg w-100 h-100"
                                                        id="checkout-date"
                                                        name="to_dt"
                                                        value={formData.to_dt}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        ref={inputRefTo}
                                                        min={formData.frm_dt}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 pe-0 d-flex align-items-end justify-content-center">
                                            <div
                                                className="border magnify-icon rounded text-center py-1 "
                                                onClick={showAvailableModal}
                                            >
                                                <span className="material-icons-outlined mt-1">
                                                    manage_search
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-4 ps-0">
                                    <div className="">
                                        <label className="custom-label mb-2">
                                            Booking Source
                                        </label>
                                    </div>

                                    <select
                                        className="form-select custom-input-lg"
                                        id="bookingSourceDropdown"
                                        name="booking_src_id"
                                        value={formData.booking_src_id}
                                        onChange={handleInputChange}
                                        required
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
                                            name="bsns_src_id"
                                            value={formData.bsns_src_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="0">Select</option>
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
                                            id="sls_prsn_id"
                                            name="sls_prsn_id"
                                            value={formData.sls_prsn_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="0">Select</option>
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
                                            name="mrkt_sgmnt_id"
                                            value={formData.mrkt_sgmnt_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="0">Select</option>
                                            {dropDownData['mrkt_sgmnt']?.map(
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
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className="p-0 flex-column d-flex">
                                <div className="light-blue-box py-2 px-1 d-flex">
                                    <div className="row m-0 w-100">
                                        <div className="col-1 ps-4">#</div>
                                        <div className="col-2 ps-0">
                                            Room Type
                                        </div>
                                        <div className="col-9">
                                            <div className="row">
                                                <div className="col-2">
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
                                                <div className="col-2">
                                                    Amount
                                                </div>
                                                <div className="col-2 text-end">
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
                                    {formData.room_json?.map((room, index) => {
                                        return (
                                            <div
                                                className="row mx-0 my-3"
                                                key={index}
                                            >
                                                <div className="col-1 ps-0 text-center">
                                                    <span
                                                        className="material-icons-outlined delete-table me-3"
                                                        onClick={() =>
                                                            handleDeleteRow(
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        delete
                                                    </span>
                                                </div>
                                                <div className="col-2">
                                                    {
                                                        dropDownData[
                                                            'room_cate'
                                                        ].find(
                                                            (category) =>
                                                                category.id ==
                                                                room.rcid,
                                                        )?.cat_name
                                                    }
                                                </div>
                                                <div className="col-9">
                                                    <div className="row">
                                                        <div className="col-2">
                                                            {
                                                                dropDownData[
                                                                    'rooms_plan'
                                                                ].find(
                                                                    (rPlan) =>
                                                                        rPlan.id ==
                                                                        room.pid,
                                                                )?.plan_name
                                                            }
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="number">
                                                                <span
                                                                    className="minus user-select-none"
                                                                    onClick={() =>
                                                                        handleMinus(
                                                                            index,
                                                                            'nor',
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </span>
                                                                <input
                                                                    className="input-number input-no-outline user-select-none"
                                                                    value={
                                                                        room.nor
                                                                    }
                                                                    data-index={
                                                                        index
                                                                    }
                                                                    data-field="nor"
                                                                />
                                                                <span
                                                                    className="plus user-select-none"
                                                                    onClick={() =>
                                                                        handlePlus(
                                                                            index,
                                                                            'nor',
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="number">
                                                                <span
                                                                    className="minus user-select-none"
                                                                    onClick={() =>
                                                                        handleMinus(
                                                                            index,
                                                                            'adlt',
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </span>
                                                                <input
                                                                    className="input-number input-no-outline user-select-none"
                                                                    value={
                                                                        room.adlt
                                                                    }
                                                                    data-index={
                                                                        index
                                                                    }
                                                                    data-field="adlt"
                                                                    disabled
                                                                />
                                                                <span
                                                                    className="plus user-select-none"
                                                                    onClick={() =>
                                                                        handlePlus(
                                                                            index,
                                                                            'adlt',
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="number">
                                                                <span
                                                                    className="minus user-select-none"
                                                                    onClick={() =>
                                                                        handleMinus(
                                                                            index,
                                                                            'chld',
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </span>
                                                                <input
                                                                    className="input-number input-no-outline user-select-none"
                                                                    value={
                                                                        room.chld
                                                                    }
                                                                    data-index={
                                                                        index
                                                                    }
                                                                    data-field="chld"
                                                                    disabled
                                                                />
                                                                <span
                                                                    className="plus user-select-none"
                                                                    onClick={() =>
                                                                        handlePlus(
                                                                            index,
                                                                            'chld',
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 ">
                                                            ₹ {room.amount}
                                                        </div>
                                                        <div className="col-2 text-end">
                                                            ₹ {room.rate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="custom-row">
                                        <div className="pt-0 d-flex align-items-center gap-4">
                                            <div className="button-container">
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    // onClick={() =>
                                                    //     setShowAddRoom(true)
                                                    // }
                                                    onClick={showRoomDetails}
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
                                                    onChange={handleInputChange}
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
                                        required
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
                                        required
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
            </div>

            <div className="col-4">
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
                            <div className="row">
                                <div className="mb-2 d-flex align-items-center">
                                    <div className="col-6">
                                        <p className="fw-bold primary-color m-0">
                                            GUEST INFORMATION
                                        </p>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end">
                                        {formData.guest_json ? (
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
                                                    setShowCustomerDetails(true)
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

                                {formData.guest_json && (
                                    <>
                                        {console.log()}
                                        <div className="row mx-0">
                                            <div className="col-6 p-0">
                                                <label className="custom-label caption-1">
                                                    Name
                                                </label>
                                                <p className="subtitle-2m">
                                                    {
                                                        formData.guest_json
                                                            ?.full_name
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <label className="custom-label caption-1">
                                                    Guest class
                                                </label>
                                                <p className="subtitle-2m">
                                                    {/* {
                                                        formData.guest_json
                                                            ?.guestClass
                                                    } */}
                                                    {
                                                        dropDownData[
                                                            'guest_classes'
                                                        ].find(
                                                            (gClasses) =>
                                                                gClasses.id ==
                                                                formData
                                                                    ?.guest_json
                                                                    ?.guestClass,
                                                        )?.name
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <label className="custom-label caption-1">
                                                    Mobile No
                                                </label>
                                                <p className="subtitle-2m">
                                                    {
                                                        formData.guest_json
                                                            ?.mobile
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <label className="custom-label caption-1">
                                                    Email
                                                </label>
                                                <p className="subtitle-2m ">
                                                    {formData.guest_json?.email}
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
                                                type="button"
                                                className="btn payment-button btn-primary"
                                                // onClick={() => setOpen(true)}
                                                onClick={handleAddPayment}
                                            >
                                                Add Payment
                                            </button>
                                            <p className="body-2 m-0">
                                                Advance Recieved
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            {formData.payment_json?.pay_type &&
                                            formData.payment_json?.pay_amnt ? (
                                                <p className="subtitle-2m m-0">
                                                    (
                                                    {
                                                        formData.payment_json
                                                            ?.pay_type
                                                    }
                                                    )-₹
                                                    {
                                                        formData.payment_json
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
                                            {formData.payment_json?.pay_amnt ? (
                                                <p className="subtitle-2m red m-0">
                                                    ₹
                                                    {parseFloat(totalAmount) -
                                                        parseFloat(
                                                            formData
                                                                .payment_json
                                                                .pay_amnt,
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
                    </form>
                </div>
            </div>
            {showAddRoom && (
                <AddRoom
                    formData={formData}
                    setFormData={setFormData}
                    showAddRoom={showAddRoom}
                    setShowAddRoom={setShowAddRoom}
                    dropDownData={dropDownData}
                />
            )}
            {showCustomerDetails && (
                <AddCustomerDetails
                    formData={formData}
                    setFormData={setFormData}
                    customerDetails={customerDetails}
                    setCustomerDetails={setCustomerDetails}
                    handleInputChange={handleInputChange}
                    showCustomerDetails={showCustomerDetails}
                    setShowCustomerDetails={setShowCustomerDetails}
                    dropDownData={dropDownData}
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
                    setShowEditCustomerDetails={setShowEditCustomerDetails}
                    dropDownData={dropDownData}
                />
            )}
            {open && (
                <PaymentMdl
                    open={open}
                    setOpen={setOpen}
                    formData={formData}
                    setFormData={setFormData}
                    totalAmount={totalAmount}
                />
            )}
            {showAvaInq && (
                <AvailableInqMdl
                    showAvaInq={showAvaInq}
                    setShowAvaInq={setShowAvaInq}
                />
            )}
        </div>
    );
}

export default AddReservation;
