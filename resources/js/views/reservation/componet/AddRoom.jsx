import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

const AddRoom = ({
    formData,
    showAddRoom,
    setShowAddRoom,
    setFormData,
    dropDownData,
}) => {
    const addRoom = () => {
        setRDetails([
            ...rDetails,
            {
                rcid: '',
                pid: '',
                nor: '1',
                adlt: '1',
                chld: '0',
                amount: '',
                rate: 0.0,
            },
        ]);
    };

    const rooms = structuredClone(formData.room_json);

    const [rDetails, setRDetails] = useState(() => {
        if (rooms && rooms.length > 0) {
            return rooms;
        } else {
            return [
                {
                    rcid: '',
                    pid: '',
                    nor: '1',
                    adlt: '1',
                    chld: '0',
                    amount: '',
                    rate: 0.0,
                },
            ];
        }
    });

    const [isEditPrice, setIsEditPrice] = useState({});

    // const handleInputChange = (event, index, field) => {
    //     const { value } = event.target;
    //     const newRoomDetails = [...rDetails];
    //     newRoomDetails[index][field] = value;
    //     setRDetails(newRoomDetails);
    // };
    const handleInputChange = (e, index, field) => {
        const { name, value } = e.target;
        const newRooms = [...rDetails];

        if (field === 'amount') {
            newRooms[index][field] = value;
            let amount = parseFloat(value);
            let nor = parseInt(newRooms[index].nor);

            if (isNaN(amount)) amount = 0;
            if (isNaN(nor) || nor === 0) nor = 1;

            // Calculate rate as multiplication of amount and nor
            newRooms[index].rate = (amount * nor).toFixed(2); // Assuming 2 decimal places for rate
        } else if (field === 'nor') {
            // Handle direct input change for nor
            let nor = parseInt(value);
            if (isNaN(nor) || nor < 1) nor = 1;

            newRooms[index].nor = nor;

            // Recalculate rate based on new nor and existing amount
            let amount = parseFloat(newRooms[index].amount);
            if (isNaN(amount)) amount = 0;

            newRooms[index].rate = (amount * nor).toFixed(2); // Assuming 2 decimal places for rate
        } else {
            newRooms[index][field] = value;
        }

        // Update state with the modified rooms array
        setRDetails(newRooms);
    };

    const toggleEditPrice = (index) => {
        setIsEditPrice((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const deleteRoom = (index) => {
        const newRoomDetails = rDetails.filter((_, i) => i !== index);
        setRDetails(newRoomDetails);
    };
    const handleMinus = (index, field) => {
        const newRooms = [...rDetails];
        let value = parseInt(newRooms[index][field]);
        if (!isNaN(value) && value > 1) {
            value--;
            newRooms[index][field] = value.toString();

            // Recalculate rate based on new nor and existing amount
            let amount = parseFloat(newRooms[index].amount);
            let nor = value;
            if (isNaN(amount)) amount = 0;

            newRooms[index].rate = (amount * nor).toFixed(2); // Assuming 2 decimal places for rate

            // Update state with the modified rooms array
            setRDetails(newRooms);
        }
    };

    const handlePlus = (index, field) => {
        const newRooms = [...rDetails];
        let value = parseInt(newRooms[index][field]);
        if (!isNaN(value)) {
            value++;
        } else {
            value = 1;
        }

        newRooms[index][field] = value.toString();

        // Recalculate rate based on new nor and existing amount
        let amount = parseFloat(newRooms[index].amount);
        let nor = value;
        if (isNaN(amount)) amount = 0;

        newRooms[index].rate = (amount * nor).toFixed(2); // Assuming 2 decimal places for rate

        // Update state with the modified rooms array
        setRDetails(newRooms);
    };

    return (
        <Modal
            open={showAddRoom}
            handleModal={() => setShowAddRoom(!showAddRoom)}
        >
            <div
                className="modal"
                id="availibility_inquiry"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div
                    className="modal-dialog  modal-center"
                    style={{
                        minWidth: '80%',
                    }}
                >
                    <div className="modal-content h-75">
                        <div className="modal-header d-flex justify-content-between">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Add Room
                            </h5>
                            <div className="d-flex gap-4 align-items-center">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setRDetails([]);
                                        setShowAddRoom(false);
                                    }}
                                ></button>
                            </div>
                        </div>

                        <form
                            className="h-100"
                            onSubmit={(event) => {
                                event.preventDefault(); // Prevent default form submission

                                setFormData({
                                    ...formData,
                                    room_json: rDetails,
                                });
                                setShowAddRoom(false);
                            }}
                        >
                            <div
                                className="modal-body y_scrolling ps-0"
                                style={{
                                    height: 'calc(100vh - 375px)',
                                }}
                            >
                                <div className="light-blue-box py-2 px-1 d-flex">
                                    <div className="row m-0 w-100">
                                        <div className="col-1 ps-5">#</div>
                                        <div className="col-2 ps-0">
                                            Room Type
                                        </div>
                                        <div className="col-9 p-0">
                                            <div className="row mx-0">
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
                                                <div className="col-2 text-end">
                                                    Amount (₹)
                                                </div>
                                                <div className="col-2 text-end">
                                                    Rate (₹)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {rDetails.map((room, index) => (
                                    <div className="row my-3 mx-0" key={index}>
                                        <div className="col-1 ps-0 text-center">
                                            <span
                                                className="material-icons-outlined delete-table ms-4"
                                                onClick={() =>
                                                    deleteRoom(index)
                                                }
                                            >
                                                delete
                                            </span>
                                        </div>
                                        <div className="col-2 ps-0">
                                            <div className="d-flex">
                                                <select
                                                    className="form-select custom-input-sm"
                                                    name="rcid"
                                                    value={room.rcid}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            index,
                                                            'rcid',
                                                        )
                                                    }
                                                    required
                                                >
                                                    <option value="">
                                                        Select
                                                    </option>
                                                    {dropDownData[
                                                        'room_cate'
                                                    ]?.map((item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item.id}
                                                            >
                                                                {item.cat_name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-9 p-0">
                                            <div className="row mx-0">
                                                <div className="col-2">
                                                    <div className="d-flex">
                                                        <select
                                                            className="form-select custom-input-sm"
                                                            name="pid"
                                                            value={room.pid}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    index,
                                                                    'pid',
                                                                )
                                                            }
                                                            required
                                                        >
                                                            <option value="">
                                                                Select
                                                            </option>
                                                            {dropDownData[
                                                                'rooms_plan'
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
                                                                                item.plan_name
                                                                            }
                                                                        </option>
                                                                    );
                                                                },
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-2 mt-1">
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
                                                            className="input-number input-no-outline"
                                                            type="text"
                                                            value={room.nor}
                                                            data-index={index}
                                                            data-field="nor"
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    index,
                                                                    'nor',
                                                                )
                                                            }
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
                                                <div className="col-2 mt-1">
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
                                                            className="input-number input-no-outline"
                                                            type="text"
                                                            value={room.adlt}
                                                            data-index={index}
                                                            data-field="adlt"
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    index,
                                                                    'adlt',
                                                                )
                                                            }
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
                                                <div className="col-2 mt-1">
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
                                                            className="input-number input-no-outline"
                                                            type="text"
                                                            value={room.chld}
                                                            data-index={index}
                                                            data-field="chld"
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    index,
                                                                    'chld',
                                                                )
                                                            }
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
                                                <div className="col-2 position-relative">
                                                    <button
                                                        className="btn position-absolute start-1"
                                                        onClick={() =>
                                                            toggleEditPrice(
                                                                index,
                                                            )
                                                        }
                                                    ></button>
                                                    <input
                                                        type=""
                                                        className="form-control custom-input-sm text-end"
                                                        name="amount"
                                                        value={room.amount}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index,
                                                                'amount',
                                                            )
                                                        }
                                                        placeholder="00.00"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-2 position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input-sm text-end"
                                                        name="rate"
                                                        value={room.rate}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index,
                                                                'rate',
                                                            )
                                                        }
                                                        placeholder="1000.00"
                                                        disabled={
                                                            !isEditPrice[index]
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="row mx-0 my-2">
                                    <div className="col-12 pt-0 ps-4">
                                        <div className="button-container">
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={addRoom}
                                                type="button"
                                            >
                                                <span className="material-icons-outlined">
                                                    add
                                                </span>
                                                Room
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        setRDetails([]);
                                        setShowAddRoom(false);
                                    }}
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
                </div>
            </div>
        </Modal>
    );
};

export default AddRoom;
