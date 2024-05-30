import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import RoomCategory from './RoomCategory';
import actions from '../../redux/BookingInquiry/actions';
import toast from 'react-hot-toast';

function CreateEditMdl({
    open,
    setOpen,
    mode,
    // onSubmit,
    booingInqData,
}) {
    const [dropDownData, setDropDownData] = useState([]);
    const [followUpText, setFollowUpText] = useState('');
    const [followUpList, setFollowUpList] = useState([]);

    const [isOfferGiven, setIsOfferGiven] = useState(
        booingInqData && booingInqData.off_give ? true : false,
    );
    const [isCustReq, setIsCustReq] = useState(
        booingInqData && booingInqData.cust_req ? true : false,
    );
    // Function to get the current date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Add leading zero if month or day is less than 10
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    };

    // Function to get the minimum check-out date (one day ahead of current date)
    const getMinCheckOutDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Add one day to today's date
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Add leading zero if month or day is less than 10
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    };
    const [formData, setFormData] = useState({
        booking_inq_id: booingInqData?.id || '0',
        chk_in_dt: booingInqData?.chk_in_dt || getCurrentDate(),
        chk_out_dt: booingInqData?.chk_out_dt || getMinCheckOutDate(),
        cust_name: booingInqData?.cust_name || '',
        mobile_no: booingInqData?.mobile || '',
        email: booingInqData?.email || '',
        cust_cat_id: booingInqData?.cust_cat_id || '',
        adult: booingInqData?.adult || '',
        child: booingInqData?.child || '',
        sp_req: booingInqData?.sp_req || '',
        sp_remark: booingInqData?.sp_remark || '',
        total_day: booingInqData?.total_day || 0,
        ref_name: booingInqData?.ref_name || '',
        off_give: booingInqData?.off_give || '',
        cust_req: booingInqData?.cust_req || '',
        bus_sou_id: booingInqData?.bus_sou_id || '',
        status: booingInqData?.status || 1,
    });
    const { dropDownList, followUpAdd } = useSelector(
        (state) => state?.booingInqReducer,
    );
    // Function to handle checkbox change
    const handleOfferGiven = (event) => {
        setIsOfferGiven(event.target.checked);
    };
    const handleCustReq = (event) => {
        setIsCustReq(event.target.checked);
    };
    const dispatch = useDispatch();
    const [statusValue, setStatusValue] = useState(booingInqData?.status || 0);
    function handleChange(event) {
        const { name, value, checked, type } = event.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else if (name === 'chk_in_dt' || name === 'chk_out_dt') {
            let checkInDate = new Date(formData.chk_in_dt);
            let checkOutDate = new Date(formData.chk_out_dt);

            // Parse dates only if they are valid
            if (name === 'chk_in_dt' && isValidDate(value)) {
                checkInDate = new Date(value);
                // Update min check-out date to check-in date + 1
                checkOutDate = new Date(checkInDate);
                checkOutDate.setDate(checkOutDate.getDate() + 1);
            } else if (name === 'chk_out_dt' && isValidDate(value)) {
                if (isValidDate(value)) {
                    checkOutDate = new Date(value);
                    // Ensure check-out date is not earlier than check-in date
                    if (checkOutDate <= checkInDate) {
                        checkOutDate = new Date(checkInDate);
                        checkOutDate.setDate(checkOutDate.getDate() + 1);
                        toast.error(
                            'Check-out date cannot be earlier than or same as check-in date.',
                        );
                    }
                } else {
                    // Handle invalid check-out date
                }
            }

            // Ensure check-out date is not earlier than check-in date
            if (checkOutDate < checkInDate) {
                checkOutDate = new Date(checkInDate);
                checkOutDate.setDate(checkOutDate.getDate() + 1);
            }

            const timeDifference =
                checkOutDate.getTime() - checkInDate.getTime();
            const nightCount = Math.ceil(timeDifference / (1000 * 3600 * 24));

            setFormData({
                ...formData,
                [name]: formatDate(checkInDate), // Update with formatted date string
                chk_out_dt: formatDate(checkOutDate), // Update with formatted date string
                total_day: nightCount,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    // Helper function to check if a date string is valid
    function isValidDate(dateString) {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        return dateString.match(regEx) !== null;
    }

    // Helper function to format date as yyyy-mm-dd
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (mode === 'Add Inquiry') {
            const isValidRoomCategories = roomCategories.every(
                (category) =>
                    category.room_cat_id !== 0 &&
                    category.room_cat_name.trim() !== '' &&
                    category.no_of_rooms.trim() !== '',
            );

            if (!isValidRoomCategories) {
                toast.error('Please fill in all fields for room categories.');
                return;
            }
            // Dispatch action to add inquiry
            formData.room_req = roomCategories;
            dispatch({
                type: actions.BOOKINGINQ_ADD, // Replace with your actual action type
                payload: formData,
            });
        } else if (mode === 'Edit Inquiry') {
            formData.room_req = roomCategories;
            formData.status = statusValue;
            // Dispatch action to edit inquiry
            dispatch({
                type: actions.BOOKINGINQ_UPDATE, // Replace with your actual action type
                payload: formData,
            });
        }
        // Close the modal after submission
        setOpen(false);
    }

    useEffect(() => {
        setDropDownData(dropDownList);
    }, [dropDownList]);
    /** Room Catefgory on table */
    const [roomCategories, setRoomCategories] = useState([
        {
            room_cat_id: 0,
            room_cat_name: '',
            no_of_rooms: '',
            // room_plan_id: 0,
        },
    ]);
    const [totalRate, setTotalRate] = useState(0);

    const calculateTotalRate = () => {
        let total = 0;
        roomCategories.forEach((category) => {
            total += parseFloat(category.offered_rate);
        });
        setTotalRate(total.toFixed(2));
    };

    const addNewRoomCategory = () => {
        const newCategory = {
            room_cat_id: 0,
            room_cat_name: '',
            no_of_rooms: '',
            // room_plan_id: 0,
        };
        setRoomCategories([...roomCategories, newCategory]);
    };

    const handleInputChange = (e, index, fieldName, fieldToUpdate) => {
        const { value } = e.target;
        const updatedCategories = [...roomCategories];
        updatedCategories[index][fieldName] = value;
        const selectedRoomCategory = dropDownData?.room_cate.find(
            (category) => category.id == value,
        );
        if (selectedRoomCategory) {
            updatedCategories[index][fieldToUpdate] =
                selectedRoomCategory.cat_name || selectedRoomCategory.cat_name;
        }

        setRoomCategories(updatedCategories);
    };

    const submitFollowUp = () => {
        if (followUpText === '') {
            toast.error('Enter FollowUp Text');
            return;
        }
        const followUp = {
            booking_id: formData.booking_inq_id,
            remark: followUpText,
        };
        dispatch({
            type: actions.BOOKINGINQ_FOLLOWUP_ADD,
            payload: followUp,
        });
        setFollowUpText('');
    };

    useEffect(() => {
        if (followUpAdd && followUpAdd.follow_up) {
            try {
                const parsedFollowUp = JSON.parse(followUpAdd.follow_up);
                setFollowUpList(parsedFollowUp);
            } catch (error) {
                console.error('Error parsing JSON string:', error);
            }
        } else {
            setFollowUpList([]);
        }
    }, [followUpAdd]);

    useEffect(() => {
        if (booingInqData) {
            // Parse and set room categories
            booingInqData.room_req &&
                setRoomCategories(JSON.parse(booingInqData.room_req));

            // Parse and set follow-up list
            booingInqData.follow_up &&
                setFollowUpList(JSON.parse(booingInqData.follow_up));
        }
    }, [booingInqData]);

    useEffect(() => {
        calculateTotalRate();
    }, [roomCategories]);

    useEffect(() => {
        const sync_req = ['room_cate', 'rooms_plan', 'bus_sou'];
        dispatch({
            type: actions.BOOKINGINQ_DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','), // Convert the array to a comma-separated string
            },
        });
    }, []);

    const calculateTotalDays = (startDate, endDate) => {
        // Handle invalid or missing dates gracefully
        if (!startDate || !endDate) {
            return 0;
        }

        const date1 = new Date(startDate);
        const date2 = new Date(endDate);

        // Ensure end date is after start date
        if (date2 < date1) {
            return 0; // Or handle this case differently if needed
        }

        // Calculate the difference in milliseconds and convert to days
        const diffInMs = Math.abs(date2 - date1);
        const totalDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return totalDays;
    };
    // Calculate total days on component mount or on change of chk_in_dt or chk_out_dt
    useEffect(() => {
        const updateTotalDays = () => {
            const totalDays = calculateTotalDays(
                formData.chk_in_dt,
                formData.chk_out_dt,
            );
            setFormData({ ...formData, total_day: totalDays });
        };

        updateTotalDays();
    }, [formData.chk_in_dt, formData.chk_out_dt]); // Dependency array
    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal fade right show"
                id="add_inquiry"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                style={{ display: 'block' }}
                aria-modal="false"
                role="dialog"
            >
                <div
                    className="modal-dialog modal-md modal-lf"
                    style={{ minHeight: '500px' }}
                >
                    <form
                        id="bookingdata"
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="hidden"
                            name="booking_inq_id"
                            id="booking_inq_id"
                            value="0"
                        />
                        <div className="modal-content modal-lf-container">
                            <div className="modal-header">
                                <h5
                                    className="modal-title headline-h6m"
                                    id="booikng_header"
                                >
                                    {mode}
                                </h5>
                                <div className="d-flex gap-2 align-items-center">
                                    {mode === 'Edit Inquiry' ? (
                                        <div
                                            className="form-check form-switch"
                                            id="bookingSwitch"
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="status"
                                                name="status"
                                                checked={statusValue}
                                                // onChange={handleInputChange}
                                                onChange={(e) => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? 1
                                                        : 0;
                                                    setStatusValue(newValue);
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="status"
                                            >
                                                Open
                                            </label>
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
                                        // onClick={setOpen(false)}
                                    ></button>
                                </div>
                            </div>
                            <ul
                                className="nav tab-nav nav-pills"
                                role="tablist"
                            >
                                {mode === 'Edit Inquiry' ? (
                                    <>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link nav-link-custom active"
                                                data-bs-toggle="pill"
                                                href="#inq_deta"
                                            >
                                                Inquiry Details
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link nav-link-custom"
                                                data-bs-toggle="pill"
                                                href="#guest_info"
                                            >
                                                Guest Info
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link nav-link-custom"
                                                data-bs-toggle="pill"
                                                href="#follo_Up"
                                            >
                                                FolloUp
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link nav-link-custom active"
                                                data-bs-toggle="pill"
                                                href="#inq_deta"
                                            >
                                                Inquiry Details
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link nav-link-custom"
                                                data-bs-toggle="pill"
                                                href="#guest_info"
                                            >
                                                Guest Info
                                            </a>
                                        </li>
                                    </>
                                )}
                            </ul>
                            <div
                                className="modal-body modal-lft-body"
                                style={{ minWidth: '500px' }}
                            >
                                <div className="tab-content">
                                    <div
                                        id="inq_deta"
                                        className="container px-0 tab-pane active"
                                    >
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Check In Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control custom-input"
                                                        id="chk_in_dt"
                                                        name="chk_in_dt"
                                                        min={getCurrentDate()}
                                                        value={
                                                            formData.chk_in_dt
                                                        }
                                                        onChange={handleChange}
                                                        placeholder=""
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="night-count">
                                                    <p className="caption-2 font-white text-center mb-0">
                                                        Night
                                                    </p>
                                                    <p
                                                        className="caption-1b font-white mt-1 text-center mb-0"
                                                        id="total_day"
                                                        name="total_day"
                                                    >
                                                        {isNaN(
                                                            formData.total_day,
                                                        )
                                                            ? 0
                                                            : formData.total_day}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Check Out Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control custom-input"
                                                        id="chk_out_dt"
                                                        name="chk_out_dt"
                                                        min={getMinCheckOutDate()}
                                                        value={
                                                            formData.chk_out_dt
                                                        }
                                                        onChange={handleChange}
                                                        placeholder=""
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                {/* <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Customer Category
                                                    </label>
                                                    <select
                                                        className="form-select custom-input "
                                                        aria-label=".form-select-sm example"
                                                        id="cust_cat_id"
                                                        name="cust_cat_id"
                                                        value={
                                                            formData.cust_cat_id
                                                        } // Set value based on state
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">
                                                            Please Select Cust
                                                            Cate
                                                        </option>{' '}
                                                        <option value="1">
                                                            Travel Agent
                                                        </option>
                                                        <option value="2">
                                                            Direct Booking
                                                        </option>
                                                        <option value="3">
                                                            Corporates
                                                        </option>
                                                        <option value="4">
                                                            Referential
                                                        </option>
                                                    </select>
                                                </div> */}
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Business Source
                                                    </label>
                                                    <select
                                                        className="form-select custom-input"
                                                        aria-label=".form-select-sm example"
                                                        id="bus_sou_id"
                                                        name="bus_sou_id"
                                                        value={
                                                            formData.bus_sou_id
                                                        }
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">
                                                            Please Select
                                                            Business Source
                                                        </option>
                                                        {dropDownData?.bus_sou &&
                                                            dropDownData.bus_sou.map(
                                                                (source) => (
                                                                    <option
                                                                        key={
                                                                            source.id
                                                                        }
                                                                        value={
                                                                            source.id
                                                                        }
                                                                    >
                                                                        {
                                                                            source.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Adult
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control custom-input"
                                                        id="adult"
                                                        name="adult"
                                                        value={formData.adult}
                                                        onChange={handleChange}
                                                        placeholder="1"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Child{' '}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control custom-input"
                                                        id="child"
                                                        name="child"
                                                        value={formData.child}
                                                        onChange={handleChange}
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-2 mx-0">
                                            <table className="table custom-table">
                                                <thead>
                                                    <tr className="surface-l">
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            style={{
                                                                width: '70%',
                                                            }}
                                                        >
                                                            Room Category
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            style={{
                                                                width: '30%',
                                                            }}
                                                        >
                                                            Rooms
                                                        </th>
                                                        {/* <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width="50%"
                                                        >
                                                            Room Plan
                                                        </th> */}
                                                        {/* <th
                                                            scope="col"
                                                            className="th-custom table-right"
                                                            width="20%"
                                                        >
                                                            Rate(RS.)
                                                        </th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {roomCategories.map(
                                                        (category, index) => (
                                                            <RoomCategory
                                                                key={index}
                                                                category={
                                                                    category
                                                                }
                                                                index={index}
                                                                handleInputChange={
                                                                    handleInputChange
                                                                }
                                                                dropDownData={
                                                                    dropDownData
                                                                }
                                                            />
                                                        ),
                                                    )}
                                                    <tr>
                                                        <td
                                                            className="td-custom"
                                                            colSpan="4"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-secondary d-flex"
                                                                onClick={
                                                                    addNewRoomCategory
                                                                }
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    add
                                                                </span>
                                                                New Room
                                                                Category
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {/* <tr className="surface-s">
                                                        <td
                                                            className="td-custom"
                                                            colSpan="3"
                                                        >
                                                            <p className="subtitle-2m mb-0 py-2 primary-color text-end">
                                                                Total Amount
                                                            </p>
                                                        </td>
                                                        <td
                                                            className="td-custom"
                                                            colSpan="1"
                                                        >
                                                            <p
                                                                className="subtitle-2m mb-0 py-2 text-end primary-color"
                                                                id="totalRate"
                                                            >
                                                                {totalRate}
                                                            </p>
                                                        </td>
                                                    </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-12">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Reference
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input"
                                                        id="ref_name"
                                                        name="ref_name"
                                                        placeholder="Reference Name"
                                                        value={
                                                            formData.ref_name
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-12 mt-1">
                                                <div className="form-group  mb-3">
                                                    <div className="d-flex  mt-1 align-items-center">
                                                        <div className="custom-control me-2 custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="extra_bed_customCheck1"
                                                                checked={
                                                                    isOfferGiven
                                                                }
                                                                onChange={
                                                                    handleOfferGiven
                                                                }
                                                            />
                                                            <label
                                                                className="custom-control-label body-1 ms-1"
                                                                htmlFor="extra_bed_customCheck1"
                                                            >
                                                                Offer Given
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {isOfferGiven && (
                                                        <div className="col-12 mt-2">
                                                            <div className="form-group  mb-3">
                                                                <textarea
                                                                    rows="2"
                                                                    type="text"
                                                                    className="form-control custom-input"
                                                                    id="off_give"
                                                                    name="off_give"
                                                                    value={
                                                                        formData.off_give
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    placeholder="Type here"
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-12 mt-1">
                                                <div className="form-group  mb-3">
                                                    <div className="d-flex  mt-1 align-items-center">
                                                        <div className="custom-control me-2 custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="extra_bed_customCheck1"
                                                                checked={
                                                                    isCustReq
                                                                }
                                                                onChange={
                                                                    handleCustReq
                                                                }
                                                            />
                                                            <label
                                                                className="custom-control-label body-1 ms-1"
                                                                htmlFor="extra_bed_customCheck1"
                                                            >
                                                                Customer
                                                                Requirement
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {isCustReq && (
                                                        <div className="col-12 mt-2">
                                                            <div className="form-group  mb-3">
                                                                <textarea
                                                                    rows="2"
                                                                    type="text"
                                                                    className="form-control custom-input"
                                                                    id="cust_req"
                                                                    name="cust_req"
                                                                    value={
                                                                        formData.cust_req
                                                                    }
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    placeholder="Type here"
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* <div className="col-12">
                                            <div className="form-group  mb-3">
                                                <label
                                                    htmlFor="customInput"
                                                    className="custom-label"
                                                >
                                                    Special Requirements
                                                </label>
                                                <textarea
                                                    rows="2"
                                                    type="text"
                                                    className="form-control custom-input"
                                                    id="sp_req"
                                                    name="sp_req"
                                                    value={formData.sp_req}
                                                    onChange={handleChange}
                                                    placeholder="Special Requirements"
                                                ></textarea>
                                            </div>
                                        </div> */}
                                            <div className="col-12">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Special Remarks
                                                    </label>
                                                    <textarea
                                                        rows="2"
                                                        type="text"
                                                        className="form-control custom-input"
                                                        id="sp_remark"
                                                        name="sp_remark"
                                                        value={
                                                            formData.sp_remark
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Special Remarks"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="guest_info"
                                        className="container tab-pane fade"
                                    >
                                        <div className="row mt-0">
                                            <div className="col-12 ">
                                                <p className="subtitle-2m  heading_box  primary-color">
                                                    Guest Information
                                                </p>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input"
                                                        id="cust_name"
                                                        name="cust_name"
                                                        placeholder="Name"
                                                        value={
                                                            formData.cust_name
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
                                                        className="custom-label"
                                                    >
                                                        Mobile No
                                                    </label>
                                                    <input
                                                        type="mobile"
                                                        className="form-control custom-input"
                                                        id="mobile_no"
                                                        name="mobile_no"
                                                        value={
                                                            formData.mobile_no
                                                        }
                                                        maxLength={10}
                                                        onChange={handleChange}
                                                        placeholder="Mobile No"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group  mb-3">
                                                    <label
                                                        htmlFor="customInput"
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
                                                        onChange={handleChange}
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="follo_Up"
                                        className="container tab-pane fade"
                                    >
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <textarea
                                                    rows="2"
                                                    className="form-control custom-input"
                                                    id="sp_remark"
                                                    name="sp_remark"
                                                    value={followUpText} // Bind the value of the textarea to followUpText state
                                                    onChange={(e) => {
                                                        setFollowUpText(
                                                            e.target.value,
                                                        ); // Update followUpText state with the new value
                                                    }}
                                                    placeholder="Special Remarks"
                                                ></textarea>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                style={{ float: 'right' }}
                                                onClick={submitFollowUp}
                                            >
                                                Save
                                            </button>
                                        </div>
                                        <div className="mt-5">
                                            <div className="row mt-2  m-0">
                                                <div className="col-12 p-0">
                                                    <p className="subtitle-2m">
                                                        Follow ups
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row m-0 listing_box">
                                                {followUpList &&
                                                    followUpList.length > 0 &&
                                                    followUpList.map(
                                                        (item, index) => (
                                                            <div
                                                                className="row m-0 mt-4"
                                                                key={index}
                                                            >
                                                                <div className="col-6 mb-1">
                                                                    <p
                                                                        className="subtitle-2m primary-color mb-0"
                                                                        style={{
                                                                            color: 'var(--primary-color)',
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.date
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-6 mb-1 d-flex align-items-center justify-content-end">
                                                                    <span
                                                                        className="material-icons-outlined aminites_icon"
                                                                        style={{
                                                                            fontSize:
                                                                                '18px',
                                                                        }}
                                                                    >
                                                                        person
                                                                    </span>
                                                                    <p className="subtitle-2m mb-0 ms-1">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-12">
                                                                    <p className="body-2 mb-0">
                                                                        {
                                                                            item.remark
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                {!followUpList ||
                                                    (followUpList.length ===
                                                        0 && (
                                                        <p>
                                                            No follow-up data
                                                            available
                                                        </p>
                                                    ))}
                                            </div>
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
                                    SaveInquiry
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
