import React, { useEffect, useState } from 'react';
import Modal from '../../../components/common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/Reservation/actions';

function AvailableInqMdl({ showAvaInq, setShowAvaInq }) {
    const dispatch = useDispatch();
    const [roomCateListData, setRoomCateListData] = useState({});
    const [dropDownData, setDropDownData] = useState({});
    const { dropDownList } = useSelector((state) => state?.reserReducer);
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    const [selectedCategoryId, setSelectedCategoryId] = useState('0');
    const { loader, roomCateList } = useSelector((state) => state.reserReducer);
    // Get the next day's date
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateString = nextDate.toISOString().split('T')[0];

    // Initialize state with dynamic dates
    const [checkInDate, setCheckInDate] = useState(currentDateString);
    const [checkOutDate, setCheckOutDate] = useState(nextDateString);
    const [nights, setNights] = useState(1);

    useEffect(() => {
        calculateNights(checkInDate, checkOutDate);
    }, [checkInDate, checkOutDate]);

    useEffect(() => {
        setRoomCateListData(roomCateList);
    }, [roomCateList]);

    const handleCheckInChange = (e) => {
        setCheckInDate(e.target.value);
    };

    const handleCheckOutChange = (e) => {
        setCheckOutDate(e.target.value);
    };

    const calculateNights = (checkIn, checkOut) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
    };
    const handleCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value);
    };
    const handleSearch = () => {
        const params = {
            checkin_dt: checkInDate,
            checkout_dt: checkOutDate,
            rm_cat_id: selectedCategoryId,
        };
        dispatch({
            type: actions.AVLBL_ROOM_CATE_LIST,
            payload: params,
        });
    };
    useEffect(() => {
        setDropDownData(dropDownList);
    }, [dropDownList]);
    useEffect(() => {
        if (dropDownData['room_cate'] && dropDownData['room_cate'].length > 0) {
            setSelectedCategoryId(dropDownData['room_cate'][0].id);
        }
    }, [dropDownData]);
    useEffect(() => {
        const sync_req = ['room_cate'];
        dispatch({
            type: actions.RESER_DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','),
            },
        });
    }, []);
    useEffect(() => {
        const params = {
            checkin_dt: checkInDate,
            checkout_dt: checkOutDate,
            rm_cat_id: selectedCategoryId,
        };
        dispatch({
            type: actions.AVLBL_ROOM_CATE_LIST,
            payload: params,
        });
    }, []);
    return (
        <Modal open={showAvaInq} handleModal={() => setShowAvaInq(!showAvaInq)}>
            <div
                className="modal right"
                id="availibility_inquiry"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog modal-md modal-lf"
                    style={{ width: '90%', maxWidth: '1200px' }}
                >
                    <div className="modal-content modal-lf-container">
                        <div className="modal-header d-flex justify-content-between">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Availability Inquiry
                            </h5>
                            <div className="d-flex gap-4 align-items-center">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowAvaInq(false)}
                                ></button>
                            </div>
                        </div>

                        <div className="modal-body modal-lf-body">
                            <div className="d-flex card-1 align-items-end justify-content-between border p-3 container-page">
                                {/* Check In */}
                                <div style={{ width: '20%' }}>
                                    <p className="mb-1">Check In</p>
                                    <input
                                        type="date"
                                        className="custom-input w-100"
                                        value={checkInDate}
                                        onChange={handleCheckInChange}
                                    />
                                </div>

                                {/* Nights */}
                                <div className="col-auto">
                                    <div className="night-count rounded">
                                        <p className="caption-2 font-white text-center mb-0">
                                            Nights
                                        </p>
                                        <p className="caption-1b font-white mt-1 text-center mb-0">
                                            {nights}
                                        </p>
                                    </div>
                                </div>

                                {/* Check Out */}
                                <div style={{ width: '20%' }}>
                                    <p className="mb-1">Check Out</p>
                                    <input
                                        type="date"
                                        className="custom-input w-100"
                                        value={checkOutDate}
                                        onChange={handleCheckOutChange}
                                    />
                                </div>

                                {/* <!-- Room Category --> */}
                                <div className="" style={{ width: '40%' }}>
                                    <p className="mb-2">Room Category</p>
                                    <div
                                        id="tag-container"
                                        style={{
                                            // border: '2px solid #a6b6c4',
                                            minHeight: '50%',
                                        }}
                                        className=""
                                    >
                                        <select
                                            className="form-select custom-input"
                                            aria-label=".form-select-sm example"
                                            id="cust_cat_id"
                                            name="cust_cat_id"
                                            style={{ minHeight: '43px' }}
                                            value={selectedCategoryId}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="0">
                                                Select Room Category
                                            </option>{' '}
                                            {dropDownData['room_cate']?.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                        >
                                                            {item.cat_name}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </div>
                                </div>

                                {/* <!-- Search Button --> */}
                                <div className="" style={{ width: '7%' }}>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        style={{ height: '50px' }}
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>

                            <div
                                className="row mt-4 mx-0"
                                style={{
                                    minWidth: '1000px',
                                    overflowX: 'scroll',
                                }}
                            >
                                <table className="table table-bordered custom-table availableinquirytable">
                                    <thead>
                                        <tr
                                            style={{
                                                height: '56px',
                                                backgroundColor: '#e1e7eb',
                                            }}
                                        >
                                            <th
                                                scope="col"
                                                className="th-custom align-middle px-3"
                                                width="15%"
                                            >
                                                Room Category
                                            </th>
                                            {roomCateListData?.room_summary?.catwise?.flatMap(
                                                (item) =>
                                                    item.datewise.map(
                                                        (date) => (
                                                            <th
                                                                key={date.dt}
                                                                scope="col"
                                                                className="th-custom align-middle text-center"
                                                            >
                                                                {new Date(
                                                                    date.dt,
                                                                ).toLocaleDateString(
                                                                    'en-US',
                                                                    {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                    },
                                                                )}
                                                            </th>
                                                        ),
                                                    ),
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomCateListData?.room_summary?.catwise?.map(
                                            (item) => (
                                                <tr
                                                    key={item.cat_id}
                                                    style={{
                                                        height: '48px',
                                                        backgroundColor:
                                                            '#e6eff8',
                                                    }}
                                                >
                                                    <td
                                                        className="subtitle-2b align-middle px-3"
                                                        style={{
                                                            fontFamily:
                                                                "'Nunito', sans-serif",
                                                        }}
                                                    >
                                                        {item.cat}
                                                    </td>
                                                    {item.datewise.map(
                                                        (date) => (
                                                            <td
                                                                key={date.dt}
                                                                className="subtitle-2b primary-colori text-center align-middle"
                                                                style={{
                                                                    fontFamily:
                                                                        "'Nunito', sans-serif",
                                                                }}
                                                            >
                                                                {
                                                                    date.summary
                                                                        .total
                                                                }
                                                            </td>
                                                        ),
                                                    )}
                                                </tr>
                                            ),
                                        )}
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Reserved Rooms
                                            </td>
                                            {/* Adjust this section based on how you fetch reserved room data */}
                                            {roomCateListData?.room_summary?.catwise?.flatMap(
                                                (item) =>
                                                    item.datewise.map(
                                                        (date) => (
                                                            <td
                                                                key={`${date.dt}-reserved`}
                                                                className="subtitle-2m text-center align-middle"
                                                                style={{
                                                                    color: '#0b641f',
                                                                }}
                                                            >
                                                                {
                                                                    date.summary
                                                                        .reserved
                                                                }{' '}
                                                                {/* Replace with your actual reserved room data */}
                                                            </td>
                                                        ),
                                                    ),
                                            )}
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="ubtitle-2m align-middle px-3">
                                                Blocked Rooms
                                            </td>
                                            {/* Adjust this section based on how you fetch reserved room data */}
                                            {roomCateListData?.room_summary?.catwise?.flatMap(
                                                (item) =>
                                                    item.datewise.map(
                                                        (date) => (
                                                            <td
                                                                key={`${date.dt}-reserved`}
                                                                className="subtitle-2m text-center align-middle"
                                                            >
                                                                {
                                                                    date.summary
                                                                        .blocked
                                                                }{' '}
                                                                {/* Replace with your actual reserved room data */}
                                                            </td>
                                                        ),
                                                    ),
                                            )}
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Out Of Order Rooms
                                            </td>
                                            {/* Adjust this section based on how you fetch reserved room data */}
                                            {roomCateListData?.room_summary?.catwise?.flatMap(
                                                (item) =>
                                                    item.datewise.map(
                                                        (date) => (
                                                            <td
                                                                key={`${date.dt}-reserved`}
                                                                className="subtitle-2m text-center align-middle"
                                                                style={{
                                                                    color: '#e3001f',
                                                                }}
                                                            >
                                                                {
                                                                    date.summary
                                                                        .out_of_order
                                                                }{' '}
                                                                {/* Replace with your actual reserved room data */}
                                                            </td>
                                                        ),
                                                    ),
                                            )}
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Available Rooms
                                            </td>
                                            {/* Adjust this section based on how you fetch reserved room data */}
                                            {roomCateListData?.room_summary?.catwise?.flatMap(
                                                (item) =>
                                                    item.datewise.map(
                                                        (date) => (
                                                            <td
                                                                key={`${date.dt}-reserved`}
                                                                className="subtitle-2m text-center align-middle"
                                                                style={{
                                                                    color: '#0b641f',
                                                                }}
                                                            >
                                                                {
                                                                    date.summary
                                                                        .available
                                                                }{' '}
                                                                {/* Replace with your actual reserved room data */}
                                                            </td>
                                                        ),
                                                    ),
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline"
                                data-bs-dismiss="modal"
                                onClick={() => setShowAvaInq(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Go to Reservation
                            </button>
                            <button type="button" className="btn btn-primary">
                                Go to Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AvailableInqMdl;
