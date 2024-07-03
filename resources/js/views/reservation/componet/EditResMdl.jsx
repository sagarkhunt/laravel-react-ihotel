import React, { useEffect, useState } from 'react';
import Modal from '../../../components/common/Modal';
import { useNavigate } from 'react-router-dom';

function EditResMdl({
    showEdirRes,
    setShowEditRes,
    setOpen,
    rmbId,
    rmbData,
    roomDetail,
}) {
    const [activeButton, setActiveButton] = useState(null);
    const [totalAdults, setTotalAdults] = useState(0);
    const [totalChildren, setTotalChildren] = useState(0);
    const [roomJsonArray, setRoomJsonArray] = useState([]);
    const navigate = useNavigate();
    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    const editReservstion = () => {
        navigate('/edit_res_info');
    };
    const [dropDownData, setDropDownData] = useState(() => {
        const savedData = localStorage.getItem('dropDownList');
        return savedData ? JSON.parse(savedData) : [];
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    const guestData = rmbData && JSON.parse(rmbData?.guest_json);
    useEffect(() => {
        try {
            const parsedJson = JSON.parse(rmbData?.room_json);
            setRoomJsonArray(parsedJson);
        } catch (error) {
            console.error('Error parsing room_json:', error);
        }
    }, [rmbData?.room_json]);
    useEffect(() => {
        let adultsCount = 0;
        let childrenCount = 0;

        roomJsonArray.forEach((room) => {
            adultsCount += parseInt(room.adlt) || 0; // Ensure to parse as integer and handle NaN
            childrenCount += parseInt(room.chld) || 0; // Ensure to parse as integer and handle NaN
        });

        setTotalAdults(adultsCount);
        setTotalChildren(childrenCount);
    }, [roomJsonArray]);

    return (
        <Modal
            showEdirRes={showEdirRes}
            handleModal={() => setShowEditRes(!showEdirRes)}
        >
            <div
                className="modal right fade show"
                id="Edit_res"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-lg modal-lf">
                    <div className="modal-content modal-lf-container">
                        <div className="modal-header p-2">
                            <div>
                                <h5
                                    className="modal-title headline-h6m title-modal"
                                    id="exampleModalLabel"
                                >
                                    {guestData?.full_name}
                                </h5>
                                <p className="mb-0 contact-info">
                                    <span className="material-icons-outlined align-items-center icon">
                                        call
                                    </span>
                                    <span className="sapn_header">
                                        {guestData?.mobile}
                                    </span>
                                    <span className="material-icons-outlined align-items-center icon">
                                        location_on
                                    </span>
                                    <span>
                                        {dropDownData &&
                                            dropDownData['state'].find(
                                                (state) =>
                                                    state.id ==
                                                    guestData?.state_id,
                                            )?.name}
                                    </span>
                                    <span className="material-icons-outlined align-items-center icon">
                                        email
                                    </span>
                                    <span>{guestData?.email}</span>
                                </p>
                            </div>
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="btn-close mx-2"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setOpen(true);
                                        setShowEditRes(false);
                                    }}
                                ></button>
                            </div>
                        </div>

                        <div
                            className="modal-body scrollable-modal-body"
                            style={{ overflowY: 'auto' }}
                        >
                            <div className="row ms-1">
                                <div className="col-6">
                                    <div>
                                        <p className="mb-0 body-2">
                                            Reservation Number
                                        </p>
                                        <p className="subtitle-1m">
                                            RS {rmbData?.id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Arrival Date
                                        </p>
                                        <p className="subtitle-1m">
                                            {formatDate(rmbData?.frm_dt)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Booking Date
                                        </p>
                                        <p className="subtitle-1m">
                                            {formatDate(rmbData?.created_at)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">Pax</p>
                                        <div className="icons-container d-flex align-items-center mt-0">
                                            <div className="icon-item d-flex align-items-center">
                                                <span className="material-icons-outlined align-items-center icon">
                                                    man
                                                </span>
                                                <span className="align-items-center">
                                                    {totalAdults}
                                                </span>
                                            </div>
                                            <div className="icon-item d-flex align-items-center">
                                                <span className="material-icons-outlined align-items-center icon">
                                                    boy
                                                </span>
                                                <span className="align-items-center">
                                                    {totalChildren}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div>
                                        <p className="mb-0 body-2">Status</p>
                                        <p className="subtitle-1m">
                                            {rmbData?.block_status == 1
                                                ? 'Confirmed Reservation'
                                                : 'Cancel Reservation'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Departure Date
                                        </p>
                                        <p className="subtitle-1m">
                                            {formatDate(rmbData.to_dt)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Room Category
                                        </p>
                                        <p className="subtitle-1m">
                                            {/* {rmbData?.room_inventory &&
                                                rmbData?.room_inventory[0]
                                                    ?.room_cat?.cat_name} */}
                                            {roomDetail?.title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0 body-2">
                                            Average Daily Rate
                                        </p>
                                        <p className="subtitle-1m">
                                            RS{' '}
                                            {rmbData?.total_amt
                                                ? Number(
                                                      rmbData.total_amt,
                                                  ).toFixed(2)
                                                : '0.00'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="row row_sapn">
                                    <button
                                        className={`col-md-4 bordered-column border-l btn-outline col-4_span d-flex flex-column align-items-center ${activeButton === 'Check In' ? 'active-btn' : ''}`}
                                        onClick={() => handleClick('Check In')}
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            check_circle
                                        </span>
                                        <p className="text-center mb-0">
                                            Check In
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l btn-outline col-4_span d-flex flex-column align-items-center ${activeButton === 'Print Reg. Card' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Print Reg. Card')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            print
                                        </span>
                                        <p className="text-center mb-0">
                                            Print Reg. Card
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Amend Stay' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Amend Stay')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            edit_calendar
                                        </span>
                                        <p className="text-center mb-0">
                                            Amend Stay
                                        </p>
                                    </button>
                                </div>
                                <div className="row row_sapn mt-2">
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Add Payment' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Add Payment')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2 mb-2">
                                            credit_card
                                        </span>
                                        <p className="text-center mb-0">
                                            Add Payment
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Room Move' ? 'active-btn' : ''}`}
                                        onClick={() => handleClick('Room Move')}
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            move_up
                                        </span>
                                        <p className="text-center mb-0">
                                            Room Move
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Exchange Room' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Exchange Room')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            change_circle
                                        </span>
                                        <p className="text-center mb-0">
                                            Exchange Room
                                        </p>
                                    </button>
                                </div>
                                <div className="row row_sapn mt-2">
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span btn-outline d-flex flex-column align-items-center ${activeButton === 'Stop Room Move' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Stop Room Move')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            front_hand
                                        </span>
                                        <p className="text-center mb-0">
                                            Stop Room Move
                                        </p>
                                    </button>
                                    <button
                                        className={`col-md-4 bordered-column border-l col-4_span d-flex btn-outline flex-column align-items-center ${activeButton === 'Void Transaction' ? 'active-btn' : ''}`}
                                        onClick={() =>
                                            handleClick('Void Transaction')
                                        }
                                    >
                                        <span className="material-icons-outlined align-items-center icon2">
                                            highlight_off
                                        </span>
                                        <p className="text-center mb-0">
                                            Void Transaction
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary d-flex"
                                // data-bs-toggle="modal"
                                // data-bs-target="#"
                                onClick={editReservstion}
                            >
                                Edit Reservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default EditResMdl;
