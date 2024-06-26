import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import RoomCategory from './RoomCategory';
import actions from '../../redux/BookingInquiry/actions';
function CreateEditMdl({
    open,
    setOpen,
    mode,
    // onSubmit,
    roomsData,
}) {
    const [dropDownData, setDropDownData] = useState([]);
    const [formData, setFormData] = useState({
        booking_inq_id: '0',
        chk_in_dt: '',
        chk_out_dt: '',
        cust_name: '',
        mobile_no: '',
        email: '',
        cust_cat_id: '1',
        adult: '1',
        child: '0',
        sp_req: '',
        sp_remark: '',
        total_day: 0,
        status: 1,
    });
    const { dropDownList } = useSelector((state) => state?.roomReducer);
    const dispatch = useDispatch();
    function handleChange(event) {
        const { name, value, checked, type } = event.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else if (name === 'chk_in_dt' || name === 'chk_out_dt') {
            const checkInDate =
                name === 'chk_in_dt'
                    ? new Date(value)
                    : new Date(formData.chk_in_dt);
            const checkOutDate =
                name === 'chk_out_dt'
                    ? new Date(value)
                    : new Date(formData.chk_out_dt);
            const timeDifference =
                checkOutDate.getTime() - checkInDate.getTime();
            const nightCount = Math.ceil(timeDifference / (1000 * 3600 * 24));
            setFormData({
                ...formData,
                [name]: value,
                total_day: nightCount,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (mode === 'Add Inquiry') {
            // Dispatch action to add inquiry
            formData.room_req = roomCategories;
            console.log(formData, '=============');

            dispatch({
                type: actions.BOOKINGINQ_ADD, // Replace with your actual action type
                payload: formData,
            });
        } else if (mode === 'Edit Inquiry') {
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
        { room_cat_id: 1, no_of_rooms: 0, room_plan_id: 1, offered_rate: 0 },
    ]);
    const [totalRate, setTotalRate] = useState(0);

    const calculateTotalRate = () => {
        let total = 0;
        roomCategories.forEach((category) => {
            total += parseFloat(category.offeredRate);
        });
        setTotalRate(total.toFixed(2));
    };

    const addNewRoomCategory = () => {
        const newCategory = {
            id: roomCategories.length + 1,
            roomCatId: 1,
            noOfRooms: 0,
            roomPlanId: 1,
            offeredRate: 0,
        };
        setRoomCategories([...roomCategories, newCategory]);
    };

    const handleInputChange = (e, index, key) => {
        const updatedCategories = [...roomCategories];
        updatedCategories[index][key] = e.target.value;
        setRoomCategories(updatedCategories);
        calculateTotalRate();
    };

    // useEffect(() => {
    //     const sync_req = [
    //         'room_cate',
    //         'hotel_floor',
    //         'hotel_section',
    //         'rooms_view',
    //     ];

    //     dispatch({
    //         type: actions.ROOMS_DROPDOWN_LIST,
    //         payload: {
    //             sync_req: sync_req.join(','), // Convert the array to a comma-separated string
    //         },
    //     });
    // }, []);
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
                <div className="modal-dialog modal-lg modal-lf">
                    <div className="modal-content modal-lf-container">
                        <div className="modal-header">
                            <h5
                                className="modal-title headline-h6m"
                                id="booikng_header"
                            >
                                {mode}
                            </h5>
                            <div className="d-flex gap-4 align-items-center">
                                {mode === 'Edit Inquiry Type' ? (
                                    <div
                                        className="form-check form-switch"
                                        id="bookingSwitch"
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="status"
                                            name="status"
                                            checked={formData.status}
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="customSwitch"
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
                        <form
                            id="bookingdata"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="modal-body modal-lf-body">
                                <input
                                    type="hidden"
                                    name="booking_inq_id"
                                    id="booking_inq_id"
                                    value="0"
                                />
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
                                                value={formData.chk_in_dt}
                                                onChange={handleChange}
                                                placeholder=""
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
                                                {isNaN(formData.total_day)
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
                                                value={formData.chk_out_dt}
                                                onChange={handleChange}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4 mx-0">
                                    <table className="table custom-table">
                                        <thead>
                                            <tr className="surface-l">
                                                <th
                                                    scope="col"
                                                    className="th-custom"
                                                    width="40%"
                                                >
                                                    Room Category
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="th-custom"
                                                    width="15%"
                                                >
                                                    No of Rooms
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="th-custom"
                                                    width="25%"
                                                >
                                                    Room Plan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="th-custom table-right"
                                                    width="20%"
                                                >
                                                    Rate(RS.)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roomCategories.map(
                                                (category, index) => (
                                                    <RoomCategory
                                                        key={index}
                                                        category={category}
                                                        index={index}
                                                        handleInputChange={
                                                            handleInputChange
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
                                                        New Room Category
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="surface-s">
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
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row mt-4">
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
                                                {' '}
                                                Name{' '}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control custom-input"
                                                id="cust_name"
                                                name="cust_name"
                                                placeholder="Name"
                                                value={formData.cust_name}
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
                                                {' '}
                                                Mobile No{' '}
                                            </label>
                                            <input
                                                type="mobile"
                                                className="form-control custom-input"
                                                id="mobile_no"
                                                name="mobile_no"
                                                value={formData.mobile_no}
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
                                                {' '}
                                                Email{' '}
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

                                    <div className="col-6">
                                        <div className="form-group  mb-3">
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
                                                value={formData.cust_cat_id}
                                                onChange={handleChange}
                                            >
                                                <option selected value="1">
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

                                    <div className="col-12">
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
                                    </div>
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
                                                value={formData.sp_remark}
                                                onChange={handleChange}
                                                placeholder="Special Remarks"
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
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreateEditMdl;
