import React, { useEffect, useState } from 'react';
import '../../../css/AddReservation.css';
import AssignRoomMdl from './componet/AssignRoomMdl';
import AssignRoommdlNew from './componet/AssignRoommdlNew';
import GroupReservationMdl from './componet/GroupReservationMdl';
import BookingCard from './componet/BookingCard';
import FilterReservationList from './componet/FilterReservationList';
import { Link, useNavigate } from 'react-router-dom';
import actions from '../../redux/Reservation/actions';
import { useDispatch, useSelector } from 'react-redux';

function ReservationList() {
    const [isGridView, setIsGridView] = useState(true);
    const [open, setOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('reservations');
    const navigate = useNavigate();
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [reserListingData, setReserListingData] = useState([]);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const { loader, reserListData, resCreated } = useSelector(
        (state) => state.reserReducer,
    );
    const dispatch = useDispatch();

    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };
    const assignRooms = () => {
        setOpen(true);
    };
    const [open1, setOpen1] = useState(false);
    function handleshowFilteredData() {
        setOpen1(true);
    }

    const [open2, setOpen2] = useState(false);
    const openGroupReservationMdl = () => {
        setOpen2(true);
    };

    const toggleView = () => {
        setIsGridView(!isGridView);
    };
    function getGuestName(data) {
        let guest = {};
        try {
            guest = JSON.parse(data);
        } catch (error) {
            console.error(`Error parsing guest JSON at index ${index}:`, error);
        }

        const fullName = guest.full_name || 'No name available';
        return fullName;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    useEffect(() => {
        // setReserListingData(reserListData);
        setReserListingData(Array.isArray(reserListData) ? reserListData : []);
    }, [reserListData]);
    useEffect(() => {
        dispatch({
            type: actions.RESER_LIST,
        });
    }, [resCreated]);

    const getAdltTotal = (data) => {
        let adltTotal = 0;
        JSON.parse(data)?.map((item, index) => {
            adltTotal += parseInt(item.adlt);
        });
        return adltTotal;
    };
    const getChldTotal = (data) => {
        let chldTotal = 0;
        JSON.parse(data)?.map((item, index) => {
            chldTotal += parseInt(item.chld);
        });
        return chldTotal;
    };

    return (
        <div className="m-4">
            <div className="col-12 mt-3 pannel action-header px-3">
                <div className="row">
                    <div className="col-6 d-flex align-items-center">
                        <div className="col-6 d-flex align-items-end">
                            <h6
                                className={`subtitle-1m mb-0 p-2 cp ${
                                    activeButton === 'reservations'
                                        ? 'btn-primary reservations'
                                        : ''
                                }`}
                                onClick={() => setActiveButton('reservations')}
                            >
                                Reservations
                                <span
                                    className={`subtitle-2m ${
                                        activeButton === 'reservations'
                                            ? 'btn-primary rounded-circle'
                                            : ''
                                    }`}
                                >
                                    12
                                </span>
                            </h6>

                            <h6
                                className={`subtitle-1m mb-0 mx-3 p-2 cp ${
                                    activeButton === 'arrivals'
                                        ? 'btn-primary'
                                        : ''
                                }`}
                                onClick={() => setActiveButton('arrivals')}
                            >
                                Arrivals
                                <span
                                    className={`subtitle-2m ${
                                        activeButton === 'arrivals'
                                            ? 'btn-primary rounded-circle'
                                            : 'rounded-circle2'
                                    }`}
                                >
                                    21
                                </span>
                            </h6>
                        </div>
                    </div>
                    <div className="col-6 gap-3 action-right">
                        <div className="form-group mt-3 mb-3 position-relative search-container">
                            <span className="material-icons-outlined search-icon">
                                search
                            </span>
                            <input
                                type="text"
                                className="form-control search-input"
                                id="dt-serach-cstm"
                                placeholder="Search"
                            />
                        </div>

                        <div
                            className="btn-group btn-group-toggle border rounded"
                            data-toggle="buttons"
                        >
                            <label
                                className={`btn p-1 align-items-center justify-content-center d-flex w-50 ${!isGridView ? 'active' : ''}`}
                                onClick={() => {
                                    if (isGridView) toggleView();
                                }}
                            >
                                <input
                                    type="radio"
                                    name="options"
                                    id="option1"
                                    autoComplete="off"
                                    className="d-none"
                                    required
                                    checked={isGridView}
                                    readOnly
                                />
                                <span className="material-icons">
                                    view_comfy
                                </span>
                            </label>
                            <label
                                className={`btn p-1 align-items-center d-flex justify-content-center w-50 ${isGridView ? 'active' : ''}`}
                                onClick={() => {
                                    if (!isGridView) toggleView();
                                }}
                            >
                                <input
                                    type="radio"
                                    name="options"
                                    id="option2"
                                    autoComplete="off"
                                    className="d-none"
                                    required
                                    checked={!isGridView}
                                    readOnly
                                />
                                <span className="material-icons"> list </span>
                            </label>
                        </div>

                        <button
                            className="btn btn-secondary d-flex w-auto "
                            onClick={handleshowFilteredData}
                        >
                            {/* <span className="material-icons-outlined">
                                        tune
                                    </span> */}
                            <span className="material-icons-outlined me-0">
                                filter_alt
                            </span>
                        </button>
                        <button
                            className="btn btn-primary d-flex "
                            onClick={() => {
                                navigate('/add-reservation');
                            }}
                        >
                            <span className="material-icons-outlined">add</span>
                            Reservation
                        </button>
                    </div>
                </div>
            </div>

            {isGridView ? (
                <div className="col-12 pt-3">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th scope="col" className="th-custom">
                                    Guest Name
                                </th>
                                <th scope="col" className="th-custom">
                                    Res. No
                                </th>
                                <th scope="col" className="th-custom">
                                    Booking Date
                                </th>
                                <th scope="col" className="th-custom">
                                    Arrival
                                </th>
                                <th scope="col" className="th-custom">
                                    Departure
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    width="240px"
                                >
                                    Room Detail
                                </th>
                                <th scope="col" className="th-custom">
                                    Res. Type
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    style={{ textAlign: 'right' }}
                                >
                                    Total(₹)
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    style={{ textAlign: 'right' }}
                                >
                                    Paid(₹)
                                </th>
                                <th
                                    scope="col"
                                    className="th-custom"
                                    style={{ textAlign: 'right' }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserListingData &&
                                reserListingData?.map((row, index) => (
                                    <tr key={index}>
                                        <td className="td-custom subtitle-1m">
                                            <div className="mt-1">
                                                {getGuestName(row?.guest_json)}
                                            </div>
                                            <div className="icons-container d-flex align-items-center mt-1">
                                                <div className="icon-item d-flex align-items-center">
                                                    <span className="material-icons-outlined align-items-center icon">
                                                        man
                                                    </span>
                                                    <span className="align-items-center">
                                                        {getAdltTotal(
                                                            row?.room_json,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="icon-item d-flex align-items-center">
                                                    <span className="material-icons-outlined align-items-center icon">
                                                        boy
                                                    </span>
                                                    <span className="align-items-center">
                                                        {getChldTotal(
                                                            row?.room_json,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="td-custom body-2">
                                            RS{row.id}
                                        </td>
                                        <td className="td-custom body-2">
                                            {formatDate(row.created_at)}
                                        </td>
                                        <td className="td-custom body-2">
                                            <div className="mt-1">
                                                {row.arrivalDate}
                                                {formatDate(row.frm_dt)}
                                            </div>
                                            {/* <div className="mt-1">
                                                {row.departureTime}
                                            
                                            </div> */}
                                        </td>
                                        <td className="td-custom body-2">
                                            <div className="mt-1">
                                                {formatDate(row.to_dt)}
                                            </div>
                                            {/* <div className="mt-1">
                                                {row.departureTime}
                                            </div> */}
                                        </td>
                                        <td className="td-custom body-2">
                                            <div className="mt-1">
                                                {
                                                    row?.room_inventory[0]
                                                        ?.room_cat?.cat_name
                                                }
                                                {'/'}
                                                {
                                                    row?.room_inventory[0]
                                                        ?.room_plan?.plan_name
                                                }
                                                {/* Duplex Room/American Plan (CP) */}
                                            </div>
                                            <div
                                                className="mt-1 cp"
                                                onClick={() => assignRooms()}
                                            >
                                                <p className="assign mt-1 mb-0 cp">
                                                    Assign Room
                                                </p>
                                            </div>
                                        </td>
                                        <td className="td-custom body-2">
                                            {row.block_status == 1
                                                ? 'Confirm Booking'
                                                : 'Canceled'}
                                        </td>
                                        <td
                                            className="td-custom body-2"
                                            style={{ textAlign: 'right' }}
                                        >
                                            {row.total_amt}
                                        </td>
                                        <td
                                            className="td-custom body-2"
                                            style={{ textAlign: 'right' }}
                                        >
                                            {row?.room_adv_payment?.pay_amnt}
                                        </td>
                                        <td className="td-custom body-2 text-center">
                                            <div className="dropdown">
                                                <span
                                                    className="material-icons-outlined"
                                                    onClick={() =>
                                                        toggleDropdown(index)
                                                    }
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    more_vert
                                                </span>
                                                {dropdownIndex === index && (
                                                    <div className="dropdown-menu-re show">
                                                        <div className="px-3 py-4 dropdown-reservation_list">
                                                            <Link
                                                                className="dropdown-item subtitle-2m"
                                                                href="#"
                                                            >
                                                                <span
                                                                    className="material-icons-outlined me-2"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    print
                                                                </span>
                                                                Print GRC
                                                            </Link>
                                                        </div>
                                                        <div className="px-3 py-4 dropdown-reservation_list">
                                                            <Link
                                                                className="dropdown-item subtitle-2m"
                                                                href="#"
                                                            >
                                                                <span
                                                                    className="material-icons-outlined me-2"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    exit_to_app
                                                                </span>
                                                                Check In
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="col-12">
                    <div className="row">
                        {reserListingData.map((booking, index) => (
                            <BookingCard
                                key={index}
                                booking={booking}
                                index={index}
                                openDropdownIndex={openDropdownIndex}
                                setOpenDropdownIndex={setOpenDropdownIndex}
                            />
                        ))}
                    </div>
                </div>
            )}
            {open && <AssignRoomMdl open={open} setOpen={setOpen} />}
            {open1 && (
                <FilterReservationList open1={open1} setOpen1={setOpen1} />
            )}
            {/* {openn && <AssignRoommdlNew openn={openn} setOpenn={setOpenn} />} */}
            {open2 && <GroupReservationMdl open2={open2} setOpen2={setOpen2} />}
        </div>
    );
}

export default ReservationList;
