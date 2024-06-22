import React, { useEffect, useState } from 'react';
import Modal from '../../../components/common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/Reservation/actions';

function AvailableInqMdl({
    showAvaInq,
    setShowAvaInq,
    checkAvaInDate,
    checkAvaOutDate,
}) {
    const dispatch = useDispatch();
    const [roomCateListData, setRoomCateListData] = useState({});
    const [dropDownData, setDropDownData] = useState({});
    const { dropDownList } = useSelector((state) => state?.reserReducer);
    const currentDate = checkAvaInDate ? new Date(checkAvaInDate) : new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const { loader, roomCateList } = useSelector((state) => state.reserReducer);
    // Get the next day's date
    const nextDate = new Date(checkAvaOutDate ?? currentDate);
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
        if (selectedCategoryId) {
            const params = {
                checkin_dt: checkInDate,
                checkout_dt: checkOutDate,
                rm_cat_id: selectedCategoryId,
            };
            dispatch({
                type: actions.AVLBL_ROOM_CATE_LIST,
                payload: params,
            });
        }
    }, [selectedCategoryId, dispatch]);
    useEffect(() => {
        const sync_req = ['room_cate'];
        dispatch({
            type: actions.RESER_DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','),
            },
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
                                    <p className="mb-1">From Date</p>
                                    <input
                                        type="date"
                                        className="custom-input w-100"
                                        value={checkInDate}
                                        onChange={handleCheckInChange}
                                    />
                                </div>

                                {/* Nights */}
                                <div className="col-auto">
                                    <label
                                        htmlFor="checkin-date"
                                        className="custom-label mb-1"
                                    >
                                        Nights
                                    </label>
                                    <div className="row m-0  cp border res-night-count rounded text-center py-1">
                                        <div className="col-12 p-0 d-flex align-items-center justify-content-center mt-1">
                                            <span className="h5">{nights}</span>
                                        </div>
                                    </div>
                                    {/* <div className="night-count rounded">
                                        <p className="caption-2 font-white text-center mb-0">
                                            Nights
                                        </p>
                                        <p className="caption-1b font-white mt-1 text-center mb-0">
                                            {nights}
                                        </p>
                                    </div> */}
                                </div>

                                {/* Check Out */}
                                <div style={{ width: '20%' }}>
                                    <p className="mb-1">To Date</p>
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
                            <ul
                                className="nav tab-nav nav-pills mt-2"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <a
                                        className="nav-link nav-link-custom active"
                                        data-bs-toggle="pill"
                                        href="#summary"
                                    >
                                        Summary
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link nav-link-custom"
                                        data-bs-toggle="pill"
                                        href="#room_categories_wise"
                                    >
                                        Room Categories Wise
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div
                                    id="summary"
                                    className="row mt-0 mx-0 container px-0 tab-pane active"
                                    style={{
                                        minWidth: '1000px',
                                        overflowX: 'scroll',
                                    }}
                                >
                                    {/* Summary Content */}
                                    <table className="table table-bordered custom-table availableinquirytable">
                                        <thead>
                                            <tr
                                                style={{
                                                    height: '56px',
                                                    backgroundColor: '#f0f3f5',
                                                }}
                                            >
                                                <th
                                                    scope="col"
                                                    className="th-custom align-middle px-3"
                                                    width="15%"
                                                >
                                                    Room Availibilities
                                                </th>
                                                {roomCateListData?.room_summary?.all?.datewise.map(
                                                    (date) => (
                                                        <th
                                                            key={`header-${date.dt}`}
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
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {roomCateListData?.room_summary?.all?.map(
                                                (item) => (
                                                    <tr
                                                        key={`cat-${item.cat_id}`}
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
                                                                    key={`total-${item.cat_id}-${date.dt}`}
                                                                    className="subtitle-2b primary-colori text-center align-middle"
                                                                    style={{
                                                                        fontFamily:
                                                                            "'Nunito', sans-serif",
                                                                    }}
                                                                >
                                                                    {
                                                                        date
                                                                            .summary
                                                                            .total
                                                                    }
                                                                </td>
                                                            ),
                                                        )}
                                                    </tr>
                                                ),
                                            )} */}
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Phisical Rooms
                                                </td>
                                                {roomCateListData?.room_summary?.all?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            style={
                                                                {
                                                                    // color: 'green',
                                                                }
                                                            }
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.total
                                                            }
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Reserved Rooms
                                                </td>
                                                {roomCateListData?.room_summary?.all?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            style={
                                                                {
                                                                    // color: 'green',
                                                                }
                                                            }
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.reserved
                                                            }
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Booked Rooms
                                                </td>
                                                {roomCateListData?.room_summary?.all?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            // style={{
                                                            //     color: '#0b641f',
                                                            // }}
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.blocked
                                                            }{' '}
                                                            {/* Adjust this based on your actual reserved data */}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Out Of Order Rooms
                                                </td>
                                                {roomCateListData?.room_summary?.all?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            style={
                                                                {
                                                                    // color: 'red',
                                                                }
                                                            }
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.out_of_order
                                                            }{' '}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Available Rooms
                                                </td>
                                                {roomCateListData?.room_summary?.all?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            style={
                                                                {
                                                                    // color: 'green',
                                                                }
                                                            }
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.available
                                                            }{' '}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    id="room_categories_wise"
                                    className="row mt-0 mx-0 tab-pane fade"
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
                                                    backgroundColor: '#f0f3f5',
                                                }}
                                            >
                                                <th
                                                    scope="col"
                                                    className="th-custom align-middle px-3"
                                                    width="15%"
                                                >
                                                    Room Category
                                                </th>
                                                {roomCateListData?.room_summary?.catwise?.[0]?.datewise.map(
                                                    (date) => (
                                                        <th
                                                            key={`header-${date.dt}`}
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
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roomCateListData?.room_summary?.catwise?.map(
                                                (item) => (
                                                    <tr
                                                        key={`cat-${item.cat_id}`}
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
                                                                    key={`total-${item.cat_id}-${date.dt}`}
                                                                    className="subtitle-2b primary-colori text-center align-middle"
                                                                    style={{
                                                                        fontFamily:
                                                                            "'Nunito', sans-serif",
                                                                        color: '2B363E',
                                                                    }}
                                                                >
                                                                    {
                                                                        date
                                                                            .summary
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
                                                    Reserved
                                                </td>
                                                {roomCateListData?.room_summary?.catwise?.[0]?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            style={{
                                                                color: '#0B641F',
                                                            }}
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.reserved
                                                            }{' '}
                                                            {/* Adjust this based on your actual reserved data */}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Blocked
                                                </td>
                                                {roomCateListData?.room_summary?.catwise?.[0]?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            // style={{
                                                            //     color: '#0b641f',
                                                            // }}
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.blocked
                                                            }{' '}
                                                            {/* Adjust this based on your actual reserved data */}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Out Of Order
                                                </td>
                                                {roomCateListData?.room_summary?.catwise?.[0]?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            style={{
                                                                color: '#E3001F',
                                                            }}
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.out_of_order
                                                            }{' '}
                                                            {/* Adjust this based on your actual reserved data */}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                            <tr style={{ height: '48px' }}>
                                                <td className="subtitle-2m align-middle px-3">
                                                    Available
                                                </td>
                                                {roomCateListData?.room_summary?.catwise?.[0]?.datewise.map(
                                                    (date) => (
                                                        <td
                                                            key={`reserved-${date.dt}`}
                                                            className="subtitle-2m text-center align-middle"
                                                            style={{
                                                                color: 'green',
                                                            }}
                                                        >
                                                            {
                                                                date.summary
                                                                    ?.available
                                                            }{' '}
                                                            {/* Adjust this based on your actual reserved data */}
                                                        </td>
                                                    ),
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
