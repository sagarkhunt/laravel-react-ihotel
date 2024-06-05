import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import EditResMdl from './EditResMdl';

function AssignRoomMdl({ open, setOpen }) {
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const [isFormVisible, setIsFormVisible] = useState({});
    const [showEdirRes, setShowEditRes] = useState(false);
    const toggleForm = (index) => {
        setIsFormVisible((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleAssignRoom = (event, index) => {
        event.preventDefault();
        // Handle room assignment logic here
        console.log(`Assigned Room: ${selectedRoomType} ${selectedRoomNumber}`);
    };

    const handleRoomTypeChange = (event) => {
        setSelectedRoomType(event.target.value);
    };

    const handleRoomNumberChange = (event) => {
        setSelectedRoomNumber(event.target.value);
    };

    const openEditRes = () => {
        setShowEditRes(true);
    };

    const roomTypes = [
        {
            title: 'Exclusive Rooms (43)',
            reservations: [
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
                // Add more reservations as needed
            ],
        },
        {
            title: 'Elegance Rooms (23)',
            reservations: [
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
            ],
        },
        {
            title: 'Duplex Rooms (12)',
            reservations: [
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
            ],
        },
        {
            title: 'Family Rooms (6)',
            reservations: [
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
            ],
        },
        {
            title: 'Kiing Suit Rooms (5)',
            reservations: [
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
                {
                    checkIn: '10 Oct',
                    checkOut: '12 Oct',
                    guestName: 'Amitava Kulkarni',
                    reservationId: 'RS1234',
                },
            ],
        },
    ];
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
                                    <input
                                        type="date"
                                        className="form-control date custom-input"
                                        id="checkin-date"
                                    />
                                </div>
                                <div
                                    className="mb-1 mt-1"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
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
                                {roomTypes.map((roomType, typeIndex) => (
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
                                            {roomType.title}
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
                                                style={{ listStyle: 'none' }}
                                            >
                                                {roomType.reservations.map(
                                                    (reservation, index) => (
                                                        <li
                                                            className="border-l m-3 p-1"
                                                            key={index}
                                                        >
                                                            <div className="dropdown-item dropdown-item-nohover">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-2 surface-s p-0"
                                                                        width="2px"
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                display:
                                                                                    'block',
                                                                            }}
                                                                            className="text-center"
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    borderBottom:
                                                                                        '1px solid #c4cfd7',
                                                                                }}
                                                                                className="p-1"
                                                                            >
                                                                                {
                                                                                    reservation.checkIn
                                                                                }
                                                                            </div>
                                                                            <div className="p-1">
                                                                                {
                                                                                    reservation.checkOut
                                                                                }
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
                                                                    <div className="">
                                                                        <form
                                                                            onSubmit={(
                                                                                event,
                                                                            ) =>
                                                                                handleAssignRoom(
                                                                                    event,
                                                                                    index,
                                                                                )
                                                                            }
                                                                        >
                                                                            <div className="row mb-2">
                                                                                <label
                                                                                    htmlFor="roomType"
                                                                                    className="body-2 form-label mb-0 px-0 mt-2"
                                                                                >
                                                                                    Room
                                                                                    Type
                                                                                </label>
                                                                                <select
                                                                                    className="form-select"
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
                                                                                    <option value="Single">
                                                                                        Single
                                                                                    </option>
                                                                                    <option value="Double">
                                                                                        Double
                                                                                    </option>
                                                                                    <option value="Suite">
                                                                                        Suite
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="row mb-2">
                                                                                <label
                                                                                    htmlFor="roomNumber"
                                                                                    className="body-2 form-label mb-0 px-0"
                                                                                >
                                                                                    Room
                                                                                </label>
                                                                                <select
                                                                                    className="form-select"
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
                                                                                    <option value="101">
                                                                                        101
                                                                                    </option>
                                                                                    <option value="102">
                                                                                        102
                                                                                    </option>
                                                                                    <option value="103">
                                                                                        103
                                                                                    </option>
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
                                                                                    onClick={
                                                                                        openEditRes
                                                                                    }
                                                                                >
                                                                                    Check
                                                                                    In
                                                                                </button>
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-primary"
                                                                                    onClick={
                                                                                        openEditRes
                                                                                    }
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
            {showEdirRes && (
                <EditResMdl
                    showEdirRes={showEdirRes}
                    setShowEditRes={setShowEditRes}
                    setOpen={setOpen}
                />
            )}
        </>
    );
}

export default AssignRoomMdl;
