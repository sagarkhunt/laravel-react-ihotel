import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Row, Col, Button } from 'react-bootstrap';
function EditReservtionInfo() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('folioOperation');
    const handleBackClick = () => {
        navigate(-1); // This will navigate to the previous page
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);
    const uploaderRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        uploaderRef.current.classList.add('dragover');
    };

    const handleDragLeave = () => {
        uploaderRef.current.classList.remove('dragover');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        uploaderRef.current.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        handleFileUpload(files);
    };

    const handleFileUpload = (files) => {
        if (files.length > 0) {
            const file = files[0];
            setFileName(file.name);

            document.getElementById('upload-image-label').style.display =
                'none';
            document.getElementById('image-dimension-label').style.display =
                'none';
        }
    };
    return (
        <div className="container-fluid py-3 px-4">
            <div className="col-12 py-2 pannel action-header px-3">
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <div className="col-7 d-flex align-items-center">
                                <h6 className="headline-h6m mt-2 d-flex align-items-center">
                                    <span
                                        className="material-icons-outlined me-1 cp"
                                        onClick={handleBackClick}
                                    >
                                        arrow_back
                                    </span>
                                    Mr. Alex Polo
                                </h6>
                            </div>
                            <div className="col-5 mt-2 ps-0 ms-0">
                                <div className="icons-container d-flex align-items-center">
                                    <div className="icon-item d-flex align-items-center me-3">
                                        <span className="material-icons-outlined icon mx-1">
                                            man
                                        </span>
                                        <span>2</span>
                                    </div>
                                    <div className="icon-item d-flex align-items-center">
                                        <span className="material-icons-outlined icon mx-1">
                                            boy
                                        </span>
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-2 py-1">
                        <p className="mb-0 caption-1b">Arrival Date</p>
                        <p className="mb-0 body-2l">
                            10/10/2024 <span className="body-1l">11:00 AM</span>
                        </p>
                    </div>
                    <div className="col-2 pt-1">
                        <p className="mb-0 caption-1b">Booking Date</p>
                        <p className="mb-0 body-2l">
                            3/10/2024 <span className="body-1l">11:00 AM</span>
                        </p>
                    </div>
                    <div className="col pt-1">
                        <p className="mb-0 caption-1b">Nights</p>
                        <p className="mb-0 body-2l">1</p>
                    </div>
                    <div className="col-2 pt-1">
                        <p className="mb-0 caption-1b">Room/Room Type</p>
                        <p className="mb-0 body-2l">102/Superior Delux</p>
                    </div>
                    <div className="col pt-1">
                        <p className="mb-0 caption-1b">Res. No.</p>
                        <p className="body-2l mb-0">RS1233</p>
                    </div>
                    <div className="col pt-2 d-flex justify-content-end">
                        <h6 className="green-btn">Reserved</h6>
                    </div>
                </div>
            </div>
            <div className="col-12 p-0 container-page static-height d-flex flex-column">
                <ul className="nav tab-nav nav-pills" role="tablist">
                    <li className="">
                        <a
                            className={`nav-link nav-link-custom ${activeTab === 'folioOperation' ? 'active' : ''}`}
                            onClick={() => handleTabClick('folioOperation')}
                            href="#folioOperation"
                        >
                            Folio Operation
                        </a>
                    </li>
                    <li className="">
                        <a
                            className={`nav-link nav-link-custom ${activeTab === 'bookingDetails' ? 'active' : ''}`}
                            onClick={() => handleTabClick('bookingDetails')}
                            href="#bookingDetails"
                        >
                            Booking Details
                        </a>
                    </li>
                    <li className="">
                        <a
                            className={`nav-link nav-link-custom ${activeTab === 'guestDetails' ? 'active' : ''}`}
                            onClick={() => handleTabClick('guestDetails')}
                            href="#guestDetails"
                        >
                            Guest Details
                        </a>
                    </li>
                    <li className="">
                        <a
                            className={`nav-link nav-link-custom ${activeTab === 'roomCharges' ? 'active' : ''}`}
                            onClick={() => handleTabClick('roomCharges')}
                            href="#roomCharges"
                        >
                            Room Charges
                        </a>
                    </li>
                </ul>
                <div className="modal-body">
                    <div className="tab-content">
                        {activeTab === 'folioOperation' && (
                            <div
                                id="folioOperationo"
                                className="tab-pane active"
                            >
                                <div className="row">
                                    <div className="col-3 p-0 d-flex flex-column border-right">
                                        <div className="button-container p-1">
                                            <div
                                                className="btn subtitle-2m p-1 col-12 d-flex text-left"
                                                type="button"
                                            >
                                                Room/Folio
                                                <button className="ms-auto border border-primary rounded background">
                                                    <span className="material-icons-outlined primary-icon blue_colour">
                                                        add
                                                    </span>
                                                </button>
                                            </div>
                                            <div
                                                className="accordion"
                                                id="accordionExample"
                                            >
                                                <div className="accordion-item border-none mt-2">
                                                    <h2
                                                        className="accordion-header"
                                                        id="headingOne"
                                                    >
                                                        <button
                                                            className="accordion-button collapsed body-2 btn-secondary-add py-3 col-12 d-flex text-left"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne"
                                                            aria-expanded="true"
                                                            aria-controls="collapseOne"
                                                        >
                                                            102
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseOne"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="headingOne"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body p-0">
                                                            <button
                                                                className="btn body-2 p-2 col-12 d-flex text-left modal-dropdown"
                                                                type="button"
                                                                id="dropdownMenuButton2"
                                                                aria-expanded="false"
                                                            >
                                                                <span className="dropdown-icon material-icons-outlined primary-icon blue_colour">
                                                                    person_outline
                                                                </span>
                                                                324 - Mr Alex
                                                                Polo
                                                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto blue_colour">
                                                                    chevron_right
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="body-2 p-2 col-12 text-center">
                                                        Total
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="subtitle-2m primary-colori p-2 col-12 d-flex">
                                                        ₹3,860.00
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="body-2 light-red p-2 col-12 text-center">
                                                        Balance
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="subtitle-2m light-red p-2 col-12 d-flex">
                                                        ₹1,560.00
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-9 p-0">
                                        <div className="row">
                                            <div className="col-12 ms-3">
                                                <button className="btn-secondary btn-sm mt-1 mb-0 me-2 btn">
                                                    Add Payment
                                                </button>
                                                <button className="btn-secondary btn-sm mt-1 mb-0 me-2 btn">
                                                    Add Changes
                                                </button>
                                                <button className="btn-secondary btn-sm mt-1 mb-0 me-2 btn">
                                                    Apply Discount
                                                </button>
                                                <button className="btn-secondary btn-sm mt-1 mb-0 me-2 btn">
                                                    Folio Operations
                                                </button>
                                                <button className="btn-secondary btn-sm mt-1 mb-0 me-2 btn">
                                                    Print Invoice
                                                </button>
                                                <button className="btn-secondary btn-sm mt-1 mb-0 me-2 btn align-items-center">
                                                    More
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className="ms-3 height-adjust"
                                            style={{ overflowY: 'auto' }}
                                        >
                                            <table className="table custom-table mt-3">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width="50px"
                                                        >
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck1"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customCheck1"
                                                                ></label>
                                                            </div>
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width="180px"
                                                        >
                                                            Day
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width="80px"
                                                        >
                                                            Ref No.
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width=""
                                                        >
                                                            Particulars
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width=""
                                                        >
                                                            Description
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width="190px"
                                                        >
                                                            User
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width="100px"
                                                        >
                                                            Amount
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="th-custom"
                                                            width="20px"
                                                        ></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="td-custom body-2">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck1"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customCheck1"
                                                                ></label>
                                                            </div>
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            10/10/2022 Tuesday
                                                        </td>
                                                        <td className="td-custom body-2"></td>
                                                        <td className="td-custom body-2">
                                                            Room Charge
                                                        </td>
                                                        <td className="td-custom body-2"></td>
                                                        <td className="td-custom body-2">
                                                            helperdesksiport
                                                        </td>
                                                        <td className="td-custom subtitle-2m primary-colori">
                                                            3,360.00
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            <span className="material-icons-outlined align-items-center icon mx-1 gray-c-700">
                                                                more_vert
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-custom body-2">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck1"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customCheck1"
                                                                ></label>
                                                            </div>
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            11/10/2022 Tuesday
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            32
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            Cash
                                                        </td>
                                                        <td className="td-custom body-2"></td>
                                                        <td className="td-custom body-2">
                                                            helperdesksiport
                                                        </td>
                                                        <td className="td-custom subtitle-2m green-c-700">
                                                            -2,000.00
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            <span className="material-icons-outlined align-items-center icon mx-1 gray-c-700">
                                                                more_vert
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-custom body-2">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck1"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customCheck1"
                                                                ></label>
                                                            </div>
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            12/10/2022 Tuesday
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            54
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            Cash
                                                        </td>
                                                        <td className="td-custom body-2"></td>
                                                        <td className="td-custom body-2">
                                                            helperdesksiport
                                                        </td>
                                                        <td className="td-custom subtitle-2m green-c-700">
                                                            -300.00
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            <span className="material-icons-outlined align-items-center icon mx-1 gray-c-700">
                                                                more_vert
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td-custom body-2">
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="customCheck1"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customCheck1"
                                                                ></label>
                                                            </div>
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            13/10/2022 Tuesday
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            54
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            Laundary
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            Qty:3
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            helperdesksiport
                                                        </td>
                                                        <td className="td-custom subtitle-2m primary-colori">
                                                            500.00
                                                        </td>
                                                        <td className="td-custom body-2">
                                                            <span className="material-icons-outlined align-items-center icon mx-1 gray-c-700">
                                                                more_vert
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-footer pt-1 p-0">
                                            <div className="row">
                                                <div className="col-10">
                                                    <div className="body-2 p-2 me-3 col-12 text-end">
                                                        Balance
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="subtitle-2m primary-colori p-2 col-12 text-center">
                                                        ₹1,560.00
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'bookingDetails' && (
                            <div
                                id="bookingDetails"
                                className="tab-pane fade show active"
                            >
                                {/* Booking Details content here */}
                                <h3>Booking Details</h3>
                                <p>Content for Booking Details.</p>
                            </div>
                        )}
                        {activeTab === 'guestDetails' && (
                            <div
                                id="folioOperationo"
                                className="tab-pane active"
                            >
                                <div className="row">
                                    <div className="col-3 p-0 d-flex flex-column border-right">
                                        <div className="button-container p-1">
                                            <div
                                                className="btn subtitle-2m p-1 col-12 d-flex text-left"
                                                type="button"
                                            >
                                                Guest
                                                <button className="ms-auto border border-primary rounded background">
                                                    <span className="material-icons-outlined primary-icon blue_colour">
                                                        add
                                                    </span>
                                                </button>
                                            </div>
                                            <div
                                                className="accordion"
                                                id="accordionExample"
                                            >
                                                <div className="accordion-item border-none mt-2">
                                                    <h2
                                                        className="accordion-header"
                                                        id="headingOne"
                                                    >
                                                        <button
                                                            className="accordion-button collapsed body-2 btn-secondary-add py-3 col-12 d-flex text-left"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne"
                                                            aria-expanded="true"
                                                            aria-controls="collapseOne"
                                                        >
                                                            102
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseOne"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="headingOne"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body p-0">
                                                            <button
                                                                className="btn body-2 p-2 col-12 d-flex text-left modal-dropdown"
                                                                type="button"
                                                                id="dropdownMenuButton2"
                                                                aria-expanded="false"
                                                            >
                                                                <span className="dropdown-icon material-icons-outlined primary-icon blue_colour">
                                                                    person_outline
                                                                </span>
                                                                324 - Mr Alex
                                                                Polo
                                                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto blue_colour">
                                                                    chevron_right
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="body-2 p-2 col-12 text-center">
                                                        Total
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="subtitle-2m primary-colori p-2 col-12 d-flex">
                                                        ₹3,860.00
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="body-2 light-red p-2 col-12 text-center">
                                                        Balance
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="subtitle-2m light-red p-2 col-12 d-flex">
                                                        ₹1,560.00
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="col-9 p-0">
                                        <div
                                            className="ps-3 height-adjust pe-1"
                                            style={{ overflowY: 'auto' }}
                                        >
                                            <form>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <div className="row">
                                                            <div className="col-4 pe-0">
                                                                <label
                                                                    htmlFor="guestName"
                                                                    className="custom-label"
                                                                >
                                                                    Name
                                                                </label>
                                                                <select
                                                                    className="form-select custom-input custom_input_1"
                                                                    name="gender"
                                                                >
                                                                    <option value="">
                                                                        Mr.
                                                                    </option>
                                                                    <option value="1">
                                                                        1
                                                                    </option>
                                                                    <option value="2">
                                                                        2
                                                                    </option>
                                                                    <option value="3">
                                                                        3
                                                                    </option>
                                                                </select>
                                                            </div>
                                                            <div className="col-8 ps-0">
                                                                <div className="mb-2">
                                                                    <label
                                                                        htmlFor="guestName"
                                                                        className="custom-label"
                                                                    ></label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control custom-input"
                                                                        id="guestName"
                                                                        name="guestName"
                                                                        placeholder="Enter Guest Name"
                                                                        style={{
                                                                            marginTop:
                                                                                '2px',
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-4 ps-1">
                                                        <div className="form-group mb-2">
                                                            <label
                                                                htmlFor="mobile"
                                                                className="custom-label"
                                                            >
                                                                Mobile
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control custom-input"
                                                                id="guestName"
                                                                name="mobile"
                                                                placeholder="Enter Mobile Number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-4 ps-1">
                                                        <div className="form-group mb-2">
                                                            <label
                                                                htmlFor="phone"
                                                                className="custom-label"
                                                            >
                                                                Phone
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control custom-input"
                                                                id="phone"
                                                                name="phone"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <div className="form-group mb-2">
                                                            <label
                                                                htmlFor="email"
                                                                className="custom-label"
                                                            >
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control custom-input"
                                                                id="email"
                                                                name="email"
                                                                placeholder="Enter Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <label
                                                            htmlFor="gender"
                                                            className="custom-label"
                                                        >
                                                            Gender
                                                        </label>
                                                        <select
                                                            className="form-select custom-input custom_input_1"
                                                            name="gender"
                                                        >
                                                            <option value="">
                                                                Select Gender
                                                            </option>
                                                            <option value="1">
                                                                1
                                                            </option>
                                                            <option value="2">
                                                                2
                                                            </option>
                                                            <option value="3">
                                                                3
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <label
                                                            htmlFor="geuestType"
                                                            className="custom-label"
                                                        >
                                                            Guest Type
                                                        </label>
                                                        <select
                                                            className="form-select custom-input custom_input_1"
                                                            name="geust_type"
                                                        >
                                                            <option value="">
                                                                Select guest
                                                                type
                                                            </option>
                                                            <option value="1">
                                                                1
                                                            </option>
                                                            <option value="2">
                                                                2
                                                            </option>
                                                            <option value="3">
                                                                3
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <label
                                                            htmlFor="vipstatus"
                                                            className="custom-label"
                                                        >
                                                            VIP Status
                                                        </label>
                                                        <select
                                                            className="form-select custom-input custom_input_1"
                                                            name="vip_status"
                                                        >
                                                            <option value="">
                                                                Select vip
                                                                status
                                                            </option>
                                                            <option value="1">
                                                                1
                                                            </option>
                                                            <option value="2">
                                                                2
                                                            </option>
                                                            <option value="3">
                                                                3
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className=" col-12">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="address"
                                                                className="custom-label"
                                                            >
                                                                Address
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="addres"
                                                                name="address"
                                                                placeholder="Enter Address"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="city"
                                                                className="custom-label"
                                                            >
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="city"
                                                                name="City"
                                                                placeholder="Enter City"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="state"
                                                                className="custom-label"
                                                            >
                                                                State
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="stae"
                                                                name="state"
                                                                placeholder="Enter State"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="country"
                                                                className="custom-label"
                                                            >
                                                                Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="country"
                                                                name="country"
                                                                placeholder="Enter Country"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="zipCode"
                                                                className="custom-label"
                                                            >
                                                                Zip
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="zip"
                                                                name="zip"
                                                                placeholder="Enter Zip code"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="nantionality"
                                                                className="custom-label"
                                                            >
                                                                Nationality
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="nationality"
                                                                name="nationality"
                                                                placeholder="Enter Nationality"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="company"
                                                                className="custom-label"
                                                            >
                                                                Company
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="company"
                                                                name="company"
                                                                placeholder="Enter Company"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="fax"
                                                                className="custom-label"
                                                            >
                                                                Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="fax"
                                                                name="fax"
                                                                placeholder="Enter Fax"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="registrationNo"
                                                                className="custom-label"
                                                            >
                                                                Registration No
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="registrationNo"
                                                                name="registrationNo"
                                                                placeholder="Enter Registration No"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h6>Identity Information</h6>
                                                <div className="row my-3">
                                                    <div className="col-3">
                                                        <label
                                                            htmlFor="hotel_name"
                                                            className="body-2 pb-1"
                                                        >
                                                            Upload Company Logo
                                                        </label>
                                                        <div
                                                            id="uploader1"
                                                            ref={uploaderRef}
                                                            className="uploader"
                                                            onDragOver={
                                                                handleDragOver
                                                            }
                                                            onDragLeave={
                                                                handleDragLeave
                                                            }
                                                            onDrop={handleDrop}
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            <svg
                                                                width="24"
                                                                height="25"
                                                                viewBox="0 0 24 25"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M9 16.9121H15V10.9121H19L12 3.91211L5 10.9121H9V16.9121ZM12 6.74211L14.17 8.91211H13V14.9121H11V8.91211H9.83L12 6.74211ZM5 18.9121H19V20.9121H5V18.9121Z"
                                                                    fill="#0863B5"
                                                                />
                                                            </svg>
                                                            <p
                                                                id="upload-image-label"
                                                                className="subtitle-2m my-2"
                                                            >
                                                                Upload Image
                                                            </p>
                                                            <p
                                                                id="image-dimension-label"
                                                                className="caption-1"
                                                            >
                                                                Image Dimensions
                                                                300px x 225px
                                                            </p>
                                                            <p id="file-name1">
                                                                {fileName || ''}
                                                            </p>
                                                            <input
                                                                type="file"
                                                                id="file-input1"
                                                                ref={
                                                                    fileInputRef
                                                                }
                                                                className="d-none"
                                                                onChange={
                                                                    handleFileChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-9">
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <div className="mt-1 mb-3">
                                                                    <label
                                                                        htmlFor="idnumber`"
                                                                        className="custom-label"
                                                                    >
                                                                        ID
                                                                        Number
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control custom-input"
                                                                        id="idnumber"
                                                                        name="idnumber"
                                                                        placeholder="Enter ID Number"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-4">
                                                                <div className="mt-1 mb-3">
                                                                    <label
                                                                        htmlFor="idType"
                                                                        className="custom-label"
                                                                    >
                                                                        ID Type
                                                                    </label>
                                                                    <select
                                                                        className="form-select custom-input custom_input_1"
                                                                        name="gender"
                                                                    >
                                                                        <option value="">
                                                                            Select
                                                                            id
                                                                            type
                                                                        </option>
                                                                        <option value="1">
                                                                            Election
                                                                            id
                                                                        </option>
                                                                        <option value="2">
                                                                            Pan
                                                                            card
                                                                        </option>
                                                                        <option value="3">
                                                                            Adhar
                                                                            Card
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <div className="mt-1 mb-3">
                                                                    <label
                                                                        htmlFor="issuinfcountry"
                                                                        className="custom-label"
                                                                    >
                                                                        Issuing
                                                                        Country
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control custom-input"
                                                                        id="issuingcountry"
                                                                        name="iss_country"
                                                                        placeholder="Enter Issuing Country"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-4">
                                                                <div className="mt-1 mb-3">
                                                                    <label
                                                                        htmlFor="isuuing city"
                                                                        className="custom-label"
                                                                    >
                                                                        Issuing
                                                                        City
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control custom-input"
                                                                        id="iss_city"
                                                                        name="iss_City"
                                                                        placeholder="Enter Issuing City"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-4">
                                                                <div className="mt-1 mb-3">
                                                                    <label
                                                                        htmlFor="ex_date"
                                                                        className="custom-label"
                                                                    >
                                                                        Expiry
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control custom-input"
                                                                        id="city"
                                                                        name="City"
                                                                        placeholder="Enter City"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h6>Other Information</h6>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="birthdate"
                                                                className="custom-label"
                                                            >
                                                                Birthdate
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control custom-input"
                                                                id="birthdate"
                                                                name="birthdate"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="weddingdate"
                                                                className="custom-label"
                                                            >
                                                                Weding Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control custom-input"
                                                                id="wdate"
                                                                name="wdates"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="Birthcity"
                                                                className="custom-label"
                                                            >
                                                                Birth City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="birthcity"
                                                                name="birth_date"
                                                                placeholder="Enter Country"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 ps-1">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="birth_city"
                                                                className="custom-label"
                                                            >
                                                                Birth Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control custom-input"
                                                                id="birth_country"
                                                                name="birthcountry"
                                                                placeholder="Enter Birth Country"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <div className="mt-1 mb-3">
                                                            <label
                                                                htmlFor="spousebithadte"
                                                                className="custom-label"
                                                            >
                                                                Spouse Birthdate
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control custom-input"
                                                                id="spouse_bithadte"
                                                                name="spouse_bithadte"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer pt-1 p-0">
                                            <div className="row">
                                                <div className="button-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                    >
                                                        Black List
                                                    </button>
                                                    <div className="right-buttons me-3">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                        >
                                                            Pick Up / Drop Off
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                        >
                                                            C Form
                                                        </button>
                                                        <div className="btn-group">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary dropdown-toggle"
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                More
                                                            </button>
                                                            <div className="dropdown-menu">
                                                                <a
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                >
                                                                    Action 1
                                                                </a>
                                                                <a
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                >
                                                                    Action 2
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>   */}
                                    <div className="col-9 p-0">
                                        <div className="ms-3 scrollable-div p-2">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="row mb-3">
                                                        <div className="col-2 pe-0">
                                                            <div className="input-group">
                                                                <label className="custom-label mb-1">
                                                                    Name
                                                                </label>
                                                            </div>
                                                            <div className="">
                                                                <select
                                                                    className="form-select custom-input"
                                                                    id="reservationTypeDropdown"
                                                                    aria-label="Reservation Type Dropdown"
                                                                >
                                                                    <option
                                                                        selected
                                                                        value="1"
                                                                    >
                                                                        Mr.
                                                                    </option>
                                                                    <option value="2">
                                                                        Mrs.
                                                                    </option>
                                                                    <option value="3"></option>
                                                                    <option value="4"></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-10 ps-0">
                                                            <div className="form-group">
                                                                <label
                                                                    htmlFor="customInput"
                                                                    className="custom-label"
                                                                ></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control custom-input"
                                                                    id="customInput"
                                                                    placeholder="Alex Polo"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label
                                                                    htmlFor="customInput"
                                                                    className="custom-label"
                                                                >
                                                                    Mobile
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control custom-input"
                                                                    id="customInput"
                                                                    placeholder="9898989898"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label
                                                                    htmlFor="customInput"
                                                                    className="custom-label"
                                                                >
                                                                    Phone
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control custom-input"
                                                                    id="customInput"
                                                                    placeholder="9898989898"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="alex@gmail.com"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="input-group">
                                                        <label className="custom-label mb-1">
                                                            Gender
                                                        </label>
                                                    </div>
                                                    <div className="">
                                                        <select
                                                            className="form-select custom-input"
                                                            id="reservationTypeDropdown"
                                                            aria-label="Reservation Type Dropdown"
                                                        >
                                                            <option
                                                                selected
                                                                value="1"
                                                            >
                                                                Male
                                                            </option>
                                                            <option value="2">
                                                                Female
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="input-group">
                                                        <label className="custom-label mb-1">
                                                            Guest Type
                                                        </label>
                                                    </div>
                                                    <div className="">
                                                        <select
                                                            className="form-select custom-input"
                                                            id="reservationTypeDropdown"
                                                            aria-label="Reservation Type Dropdown"
                                                        >
                                                            <option
                                                                selected
                                                                value="1"
                                                            >
                                                                Adult
                                                            </option>
                                                            <option value="2"></option>
                                                            <option value="3"></option>
                                                            <option value="4"></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="input-group">
                                                        <label className="custom-label mb-1">
                                                            VIP Status
                                                        </label>
                                                    </div>
                                                    <div className="">
                                                        <select
                                                            className="form-select custom-input"
                                                            id="reservationTypeDropdown"
                                                            aria-label="Reservation Type Dropdown"
                                                        >
                                                            <option
                                                                selected
                                                                value="1"
                                                            >
                                                                Select
                                                            </option>
                                                            <option value="2"></option>
                                                            <option value="3"></option>
                                                            <option value="4"></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="Loren"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
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
                                                            placeholder="Pune"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
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
                                                            placeholder="Maharastra"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Country
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="India"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Zip
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="989898"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Nationality
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="Indian"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Company
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="Company"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Fax
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="Fax"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Registration No
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="Registration No"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="subtitle-2m d-flex align-items-center">
                                                <span className="material-icons-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                                Identity Information
                                            </div>

                                            <div className="row">
                                                <div className="col-4 mt-2">
                                                    <div
                                                        className="Neon-input-dragDrop"
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            alignItems:
                                                                'center',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <span
                                                            className="material-icons-outlined primary-icon blue_colour"
                                                            style={{
                                                                marginBottom:
                                                                    '0',
                                                            }}
                                                        >
                                                            upload
                                                        </span>
                                                        <label
                                                            className="upload-button pt-0"
                                                            htmlFor="filer_input2"
                                                        >
                                                            <span>
                                                                Upload Images
                                                            </span>
                                                        </label>
                                                        <input
                                                            name="files[]"
                                                            id="filer_input2"
                                                            multiple="multiple"
                                                            type="file"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-8">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <div className="form-group mb-3">
                                                                <label
                                                                    htmlFor="customInput"
                                                                    className="custom-label"
                                                                >
                                                                    ID Number
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control custom-input"
                                                                    id="customInput"
                                                                    placeholder="9898989898"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="input-group">
                                                                <label className="custom-label mb-1">
                                                                    ID Type
                                                                </label>
                                                            </div>
                                                            <div className="input-group">
                                                                <select
                                                                    className="form-select custom-input"
                                                                    id="reservationTypeDropdown"
                                                                    aria-label="Reservation Type Dropdown"
                                                                >
                                                                    <option
                                                                        selected
                                                                        value="1"
                                                                    >
                                                                        Election
                                                                        Card
                                                                    </option>
                                                                    <option value="2">
                                                                        Adhar
                                                                        Card
                                                                    </option>
                                                                    <option value="3"></option>
                                                                    <option value="4"></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <div className="form-group mb-3">
                                                                <label
                                                                    htmlFor="customInput"
                                                                    className="custom-label"
                                                                >
                                                                    Issuing
                                                                    County
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control custom-input"
                                                                    id="customInput"
                                                                    placeholder="India"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="form-group mb-3">
                                                                <label
                                                                    htmlFor="customInput"
                                                                    className="custom-label"
                                                                >
                                                                    Issuing City
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control custom-input"
                                                                    id="customInput"
                                                                    placeholder="Mumbai"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="form-group mb-3">
                                                                <label
                                                                    htmlFor="customInput"
                                                                    className="custom-label"
                                                                >
                                                                    Expiry Date
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control custom-input"
                                                                    id="checkin-date"
                                                                    placeholder=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="subtitle-2m d-flex align-items-center">
                                                <span className="material-icons-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                                Other Information
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Birth Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control custom-input"
                                                            id="checkin-date"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Wedding Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control custom-input"
                                                            id="checkin-date"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Birth City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="Pune"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Birth Country
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control custom-input"
                                                            id="customInput"
                                                            placeholder="India"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="form-group mb-3">
                                                        <label
                                                            htmlFor="customInput"
                                                            className="custom-label"
                                                        >
                                                            Spouse Birthdate
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control custom-input"
                                                            id="checkin-date"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-footer card-footer-background p-2 d-flex justify-content-between">
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn-sm btn-outline"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Black List
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn-sm btn-secondary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Pick Up / Drop Off
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-sm btn-secondary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    C Form
                                                </button>
                                                <div className="btn-group">
                                                    <button
                                                        className="btn-sm btn-secondary d-flex align-items-center"
                                                        type="button"
                                                        id="dropdownMenuButton1"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        More
                                                        <span
                                                            className="material-icons-outlined primary-icon"
                                                            style={{
                                                                color: '#0863b5',
                                                            }}
                                                        >
                                                            keyboard_arrow_down
                                                        </span>
                                                    </button>
                                                    <ul
                                                        className="dropdown-menu"
                                                        aria-labelledby="dropdownMenuButton1"
                                                    >
                                                        <li>
                                                            <button
                                                                className="dropdown-item"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#Edit_res"
                                                            >
                                                                <div>
                                                                    Action
                                                                </div>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="dropdown-item"
                                                                href="#"
                                                            >
                                                                Another action
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="dropdown-item"
                                                                href="#"
                                                            >
                                                                Something else
                                                                here
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-sm btn-primary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'roomCharges' && (
                            <div
                                id="roomCharges"
                                className="tab-pane fade show active"
                            >
                                {/* Room Charges content here */}
                                <h3>Room Charges</h3>
                                <p>Content for Room Charges.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditReservtionInfo;
