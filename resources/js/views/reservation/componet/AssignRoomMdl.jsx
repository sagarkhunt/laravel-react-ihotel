import React, { useEffect, useState } from 'react';
import Modal from '../../../components/common/Modal';
import EditResMdl from './EditResMdl';
import actions from '../../../redux/Reservation/actions';
import { useDispatch, useSelector } from 'react-redux';

function AssignRoomMdl({ open, setOpen, rmbId, rmbData }) {
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const [isFormVisible, setIsFormVisible] = useState({});
    const [showEditRes, setShowEditRes] = useState(false);
    const [catWiseRoom, setCatWiseRoom] = useState([]);
    const [checkInDate, setCheckInDate] = useState('');
    const [roomDetail, setRoomDetail] = useState('');

    const dispatch = useDispatch();
    const { loader, catAssRoomList } = useSelector(
        (state) => state.reserReducer,
    );

    const toggleForm = (index) => {
        setIsFormVisible((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleAssignRoom = (event, index) => {
        event.preventDefault();
    };

    const handleRoomTypeChange = (event) => {
        setSelectedRoomType(event.target.value);
    };

    const handleRoomNumberChange = (event) => {
        setSelectedRoomNumber(event.target.value);
    };

    const openEditRes = (data) => {
        setRoomDetail(data);
        setShowEditRes(true);
    };

    const formatDate = (isoDateStr) => {
        const date = new Date(isoDateStr);
        const options = { day: '2-digit', month: 'short' };
        return date.toLocaleDateString('en-GB', options);
    };
    const clearCheckInDate = () => {
        setCheckInDate('');
    };
    const handleCheckInDateChange = (event) => {
        setCheckInDate(event.target.value);
    };

    const filterReservations = (reservations) => {
        if (!checkInDate) return reservations;

        const selectedDate = new Date(checkInDate);
        return reservations.filter((reservation) => {
            const checkIn = new Date(reservation.checkIn);
            return checkIn.toDateString() === selectedDate.toDateString();
        });
    };

    useEffect(() => {
        if (catAssRoomList) {
            setCatWiseRoom(Array.isArray(catAssRoomList) ? catAssRoomList : []);
        }
    }, [catAssRoomList]);

    useEffect(() => {
        const filters = { rmb_id: rmbId };
        dispatch({
            type: actions.CAT_ASSIGN_ROOMS_LIST,
            payload: filters,
        });
    }, [rmbId, dispatch]);

    const [dropDownData, setDropDownData] = useState(() => {
        const savedData = localStorage.getItem('dropDownList');
        return savedData ? JSON.parse(savedData) : [];
    });

    return (
        <>
            <Modal open={open} handleModal={() => setOpen(!open)}>
                <div
                    className="modal right show"
                    id="Assigns_rooms"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ display: 'block' }}
                >
                    <div className="modal-dialog modal-lg modal-lf">
                        <div className="modal-content modal-lf-container">
                            <div className="modal-header p-2">
                                <h5
                                    className="modal-title headline-h6m Assignroom mt-2"
                                    id="exampleModalLabel"
                                >
                                    Assign Rooms
                                </h5>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* <div
                                        className="mb-1 mt-1"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={clearCheckInDate}
                                        ></button>
                                    </div> */}

                                    <input
                                        type="date"
                                        className="form-control date custom-input"
                                        id="checkin-date"
                                        value={checkInDate}
                                        onChange={handleCheckInDateChange}
                                    />
                                </div>
                                <div
                                    className="mb-1 mt-1"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginRight: '10px',
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setOpen(false)}
                                    ></button>
                                </div>
                            </div>
                            <div
                                className="accordion scrollable-accordion"
                                id="roomAccordion"
                            >
                                {catWiseRoom &&
                                    catWiseRoom.map((roomType, typeIndex) => (
                                        <div
                                            className="accordion-item"
                                            key={typeIndex}
                                        >
                                            <button
                                                className="dropdown-item p-3 d-flex justify-content-between"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${typeIndex}`}
                                                aria-expanded="true"
                                                aria-controls={`collapse${typeIndex}`}
                                            >
                                                {roomType.title} (
                                                {
                                                    filterReservations(
                                                        roomType.reservations,
                                                    ).length
                                                }
                                                )
                                                <span className="material-icons-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                            </button>
                                            <div
                                                id={`collapse${typeIndex}`}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`heading${typeIndex}`}
                                            >
                                                <ul
                                                    className="col-12 p-0"
                                                    style={{
                                                        listStyle: 'none',
                                                    }}
                                                >
                                                    {filterReservations(
                                                        roomType.reservations,
                                                    ).map(
                                                        (
                                                            reservation,
                                                            index,
                                                        ) => (
                                                            <li
                                                                className="border-l m-3 p-2"
                                                                key={index}
                                                            >
                                                                <div className="dropdown-item dropdown-item-nohover">
                                                                    <div className="row mx-0">
                                                                        <div
                                                                            className="col-2 surface-s p-0"
                                                                            width="2px"
                                                                        >
                                                                            <div className="text-center">
                                                                                <div
                                                                                    className="p-1"
                                                                                    style={{
                                                                                        borderBottom:
                                                                                            '1px solid #c4cfd7',
                                                                                    }}
                                                                                >
                                                                                    {formatDate(
                                                                                        reservation.checkIn,
                                                                                    )}
                                                                                </div>
                                                                                <div className="p-1">
                                                                                    {formatDate(
                                                                                        reservation.checkOut,
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-7 mt-2">
                                                                            <div className="font-ternary">
                                                                                {
                                                                                    reservation.guestName
                                                                                }
                                                                            </div>
                                                                            <div className="body-2">
                                                                                RS
                                                                                {
                                                                                    reservation.reservationId
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-3 mt-2">
                                                                            <div className="body-2">
                                                                                Room
                                                                            </div>
                                                                            <div>
                                                                                <button
                                                                                    className="assign assign1 btn-secondary mt-1 mb-0 btn"
                                                                                    onClick={() =>
                                                                                        toggleForm(
                                                                                            `${typeIndex}-${index}`,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    Assign
                                                                                    Room
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {isFormVisible[
                                                                        `${typeIndex}-${index}`
                                                                    ] && (
                                                                        <div>
                                                                            <form
                                                                                onSubmit={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleAssignRoom(
                                                                                        event,
                                                                                        index,
                                                                                    )
                                                                                }
                                                                                className="mt-2"
                                                                            >
                                                                                <div className="row mb-2 mx-0">
                                                                                    <label
                                                                                        htmlFor="roomType"
                                                                                        className="body-2 form-label mb-0 px-0 mt-2"
                                                                                    >
                                                                                        Room
                                                                                        Type
                                                                                    </label>
                                                                                    <select
                                                                                        className="form-select mt-1"
                                                                                        id="roomType"
                                                                                        value={
                                                                                            selectedRoomType
                                                                                        }
                                                                                        onChange={
                                                                                            handleRoomTypeChange
                                                                                        }
                                                                                    >
                                                                                        <option value="">
                                                                                            Select
                                                                                            room
                                                                                            type
                                                                                        </option>
                                                                                        {dropDownData &&
                                                                                            dropDownData[
                                                                                                'room_cate'
                                                                                            ]?.map(
                                                                                                (
                                                                                                    item,
                                                                                                    index,
                                                                                                ) => {
                                                                                                    return (
                                                                                                        <option
                                                                                                            key={
                                                                                                                index
                                                                                                            }
                                                                                                            value={
                                                                                                                item.id
                                                                                                            }
                                                                                                        >
                                                                                                            {
                                                                                                                item.cat_name
                                                                                                            }
                                                                                                        </option>
                                                                                                    );
                                                                                                },
                                                                                            )}
                                                                                    </select>
                                                                                </div>
                                                                                <div className="row mb-2 mx-0">
                                                                                    <label
                                                                                        htmlFor="roomNumber"
                                                                                        className="body-2 form-label mb-0 px-0"
                                                                                    >
                                                                                        Room
                                                                                    </label>
                                                                                    <select
                                                                                        className="form-select mt-1"
                                                                                        id="roomNumber"
                                                                                        value={
                                                                                            selectedRoomNumber
                                                                                        }
                                                                                        onChange={
                                                                                            handleRoomNumberChange
                                                                                        }
                                                                                    >
                                                                                        <option value="">
                                                                                            Select
                                                                                            room
                                                                                            number
                                                                                        </option>
                                                                                        {dropDownData &&
                                                                                            dropDownData[
                                                                                                'rooms'
                                                                                            ]?.map(
                                                                                                (
                                                                                                    item,
                                                                                                    index,
                                                                                                ) => {
                                                                                                    return (
                                                                                                        <option
                                                                                                            key={
                                                                                                                index
                                                                                                            }
                                                                                                            value={
                                                                                                                item.id
                                                                                                            }
                                                                                                        >
                                                                                                            {
                                                                                                                item.room_no
                                                                                                            }
                                                                                                        </option>
                                                                                                    );
                                                                                                },
                                                                                            )}
                                                                                    </select>
                                                                                </div>
                                                                                <hr className="row border-l mb-2 mt-4" />
                                                                                <div className="mb-3 d-flex justify-content-end">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-outline me-2"
                                                                                        onClick={() =>
                                                                                            toggleForm(
                                                                                                `${typeIndex}-${index}`,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Cancel
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-secondary me-2"
                                                                                        onClick={() => {
                                                                                            openEditRes(
                                                                                                roomType,
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Check
                                                                                        In
                                                                                    </button>
                                                                                    <button
                                                                                        type="submit"
                                                                                        className="btn btn-primary"
                                                                                        onClick={() => {
                                                                                            openEditRes(
                                                                                                roomType,
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Assign
                                                                                        Room
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {showEditRes && (
                <EditResMdl
                    showEditRes={showEditRes}
                    setShowEditRes={setShowEditRes}
                    setOpen={setOpen}
                    rmbId={rmbId}
                    rmbData={rmbData}
                    roomDetail={roomDetail}
                />
            )}
        </>
    );
}

export default AssignRoomMdl;
