import React, { useState } from 'react';
import PaymentMdl from './PaymentMdl';
import '../../../css/AddReservation.css';
function AddReservation() {
    const [selectedOption, setSelectedOption] = useState();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [open, setOpen] = useState(false);
    /***
     * @param{handleAddPayment}
     */
    function handleAddPayment() {
        // setMode('Add Inquiry Type');
        setOpen(true);
    }
    return (
        <div className="row" style={{ width: '100%', marginLeft: '2px' }}>
            <div className="col-8 mt-3">
                <div className="card">
                    <h5 className="card-header headline-h6m mt-1">
                        Add Reservation
                    </h5>
                    <div className="card-body">
                        <form>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="checkin-date"
                                            className="custom-label"
                                        >
                                            Check In
                                        </label>
                                        <div className="row">
                                            <div className="col">
                                                <input
                                                    type="date"
                                                    className="form-control custom-input"
                                                    id="checkin-date"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="time"
                                                    id="checkin-time"
                                                    className="form-control custom-input checkinout"
                                                    name="checkin-time"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto nightcol">
                                    <div className="night-count">
                                        <p className="caption-2 font-white text-center mb-0">
                                            Night
                                        </p>
                                        <p className="caption-1b font-white mt-1 text-center mb-0">
                                            4
                                        </p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label
                                            htmlFor="checkout-date"
                                            className="custom-label"
                                        >
                                            Check Out
                                        </label>
                                        <div className="row">
                                            <div className="col">
                                                <input
                                                    type="date"
                                                    className="form-control custom-input"
                                                    id="checkout-date"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="time"
                                                    id="checkout-time"
                                                    className="form-control custom-input checkinout"
                                                    name="checkout-time"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col">
                                <div className="input-group">
                                    <label
                                        className="custom-label"
                                        htmlFor="dropdown2"
                                    >
                                        Reservation Type
                                    </label>
                                    <select
                                        className="form-select custom-input dropdown123"
                                        id="dropdown2"
                                        aria-label="Dropdown 2"
                                        value={selectedOption}
                                        onChange={handleChange}
                                    >
                                        <option selected value="">
                                            Select Reservation Type
                                        </option>
                                        <option value="1">
                                            Confirm Booking
                                        </option>
                                        <option value="2">
                                            Unconfirmed Booking Inquiry
                                        </option>
                                        <option value="3">
                                            Hold Confirm Booking
                                        </option>
                                        <option value="3">
                                            Hold Unconfirm Booking
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group">
                                    <label
                                        className="custom-label"
                                        htmlFor="dropdown2"
                                    >
                                        Booking Source
                                    </label>
                                    <select
                                        className="form-select custom-input dropdown123"
                                        id="dropdown2"
                                        aria-label="Dropdown 2"
                                        value={selectedOption}
                                        onChange={handleChange}
                                    >
                                        <option selected value="">
                                            Select Booking Sources
                                        </option>
                                        <option value="1">Direct</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group">
                                    <label
                                        className="custom-label"
                                        htmlFor="dropdown3"
                                    >
                                        Business Source
                                    </label>
                                    <select
                                        className="form-select custom-input dropdown123"
                                        id="dropdown3"
                                        aria-label="Dropdown 3"
                                        value={selectedOption}
                                        onChange={handleChange}
                                    >
                                        <option selected value="">
                                            Select Business Source
                                        </option>
                                        <option value="1">Select</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 mx-0 row12">
                            <div className="row mb-2">
                                <div className="col-6">
                                    <p className="subtitle-2m fw-bolder">
                                        Offered:
                                    </p>
                                </div>
                                <div className="col-6 d-flex justify-content-end align-items-center">
                                    <div className="form-check me-3">
                                        {/* Added margin className 'me-3' for space */}
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault1"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault1"
                                        >
                                            Book All Available Rooms
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        {/* Added margin className 'me-3' for space */}
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault2"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault2"
                                        >
                                            Complimentary Room
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <table className="table custom-table">
                                <thead>
                                    <tr className="">
                                        <th
                                            scope="col"
                                            className="th-custom"
                                            width="25%"
                                        >
                                            Room Type
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
                                            className="th-custom"
                                            width="12.5%"
                                        >
                                            Room
                                        </th>
                                        <th
                                            scope="col"
                                            className="th-custom"
                                            width="12.5%"
                                        >
                                            Adult
                                        </th>
                                        <th
                                            scope="col"
                                            className="th-custom"
                                            width="12.5%"
                                        >
                                            Child
                                        </th>
                                        <th
                                            scope="col"
                                            className="th-custom"
                                            width="12.5%"
                                        >
                                            Rate(RS.)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="td-custom">
                                            <div className="input-group">
                                                <select
                                                    className="form-select custom-input dropdown123"
                                                    aria-label=".form-select-sm example"
                                                    value={selectedOption}
                                                    onChange={handleChange}
                                                >
                                                    <option selected value="0">
                                                        Room Type
                                                    </option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="td-custom">
                                            <div className="input-group">
                                                <select
                                                    className="form-select custom-input dropdown123"
                                                    aria-label=".form-select-sm example"
                                                    value={selectedOption}
                                                    onChange={handleChange}
                                                >
                                                    <option selected value="0">
                                                        Room Plan
                                                    </option>
                                                    <option value="1">
                                                        Select
                                                    </option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="td-custom">
                                            <div className="input-group">
                                                <select
                                                    className="form-select custom-input dropdown123"
                                                    aria-label=".form-select-sm example"
                                                    value={selectedOption}
                                                    onChange={handleChange}
                                                >
                                                    <option selected value="0">
                                                        Room
                                                    </option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="td-custom">
                                            <div className="input-group">
                                                <select
                                                    className="form-select custom-input dropdown123"
                                                    aria-label=".form-select-sm example"
                                                    value={selectedOption}
                                                    onChange={handleChange}
                                                >
                                                    <option selected value="0">
                                                        Adult
                                                    </option>
                                                    <option value="1">1</option>
                                                    <option value="2">3</option>
                                                    <option value="3">4</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="td-custom">
                                            <div className="input-group">
                                                <select
                                                    className="form-select custom-input dropdown123"
                                                    aria-label=".form-select-sm example"
                                                    value={selectedOption}
                                                    onChange={handleChange}
                                                >
                                                    <option selected value="0">
                                                        Child
                                                    </option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="td-custom">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="custom-input dropdown123"
                                                    id="customInput"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="td-custom" colSpan="6">
                                            <div className="button-container">
                                                <button className="btn btn-sm btn-secondary d-flex custom-btn-1 th-custom">
                                                    <span className="material-icons-outlined">
                                                        add
                                                    </span>
                                                    Room
                                                </button>
                                                <button className="btn btn-sm d-flex custom-btn-2 th-custom">
                                                    <span className="material-icons-outlined">
                                                        add
                                                    </span>
                                                    Discount
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <p className="fw-bold primary-color">
                                    GUEST INFORMATION
                                </p>
                            </div>
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="customInput"
                                        className="custom-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="customInput"
                                        placeholder="Name"
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="customInput"
                                        className="custom-label"
                                    >
                                        Mobile No
                                    </label>
                                    <input
                                        type="mobile"
                                        className="form-control custom-input"
                                        id="customInput"
                                        placeholder="Mobile No"
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="customInput"
                                        className="custom-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control custom-input"
                                        id="customInput"
                                        placeholder="Email "
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="customInput"
                                        className="custom-label"
                                    >
                                        County
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="customInput"
                                        placeholder="County"
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="customInput"
                                        className="custom-label"
                                    >
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="customInput"
                                        placeholder="State"
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="customInput"
                                        className="custom-label"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="customInput"
                                        placeholder="City"
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="customInput"
                                        className="custom-label"
                                    >
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="customInput"
                                        placeholder="Zip Code"
                                    />
                                </div>
                            </div>
                            <div
                                className="modal-footer"
                                // style={{
                                //     display: 'flex',
                                //     justifyContent: 'flex-end',
                                //     borderTop: '1px solid black',
                                // }}
                            >
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary ms-2"
                                >
                                    Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4 mt-3">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-7 d-flex align-items-center">
                                <h6 className="headline-h6m mb-0">
                                    Booking Summary
                                </h6>
                            </div>
                            <div className="col-5 d-flex justify-content-end">
                                <h6 className="mb-0 Confirm font-success">
                                    Confirm Booking
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="card-body container-page">
                        <div className="">
                            <div className="border rounded">
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="item-name">
                                        Room Charges
                                    </div>
                                    <div className="item-price">₹11,200</div>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="item-name">Taxes</div>
                                    <div className="item-price">₹800</div>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="item-name">
                                        Payment(Cash)
                                    </div>
                                    <div className="item-price">
                                        <span className="pay-color">X</span>
                                        -₹2000
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="item-name primary-color">
                                        Due Amount
                                    </div>
                                    <div className="item-price primary-color">
                                        ₹12,000
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mt-3">
                            <label className="custom-label" htmlFor="dropdown2">
                                Bill To
                            </label>
                            <select
                                className="form-select custom-input dropdown123"
                                id="dropdown2"
                                aria-label="Dropdown 2"
                                value={selectedOption}
                                onChange={handleChange}
                            >
                                <option selected value="1">
                                    Guest
                                </option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        {/* <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >
                                Payment Mode
                            </label>
                        </div> */}
                        {/* <div className="row justify-content-center mt-3">
                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault1"
                                    >
                                        Cash
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        Credit
                                    </label>
                                </div>
                            </div>
                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <div className="mt-1" style={{ width: '80%' }}>
                                    <select
                                        className="form-select custom-input dropdown123"
                                        id="dropdown2"
                                        aria-label="Dropdown 2"
                                        value={selectedOption}
                                        onChange={handleChange}
                                    >
                                        <option selected value="1">
                                            Select
                                        </option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#add_creditCard"
                                onClick={handleAddPayment}
                            >
                                Add Payments
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {open && <PaymentMdl open={open} setOpen={setOpen} />}
        </div>
    );
}

export default AddReservation;
