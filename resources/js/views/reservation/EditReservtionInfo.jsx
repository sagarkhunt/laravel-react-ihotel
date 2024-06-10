import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Row, Col, Button } from 'react-bootstrap';
import ImgUpMdl from './componet/ImgUpMdl';
function EditReservtionInfo() {
    const navigate = useNavigate();
    const [showImgMdl, setShowImgMdl] = useState(false);
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
    const uploadImgMdlShow = () => {
        setShowImgMdl(true);
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
                            // href="#folioOperation"
                        >
                            Folio Operation
                        </a>
                    </li>
                    <li className="">
                        <a
                            className={`nav-link nav-link-custom ${activeTab === 'bookingDetails' ? 'active' : ''}`}
                            onClick={() => handleTabClick('bookingDetails')}
                            // href="#bookingDetails"
                        >
                            Booking Details
                        </a>
                    </li>
                    <li className="">
                        <a
                            className={`nav-link nav-link-custom ${activeTab === 'guestDetails' ? 'active' : ''}`}
                            onClick={() => handleTabClick('guestDetails')}
                            // href="#guestDetails"
                        >
                            Guest Details
                        </a>
                    </li>
                    <li className="">
                        <a
                            className={`nav-link nav-link-custom ${activeTab === 'roomCharges' ? 'active' : ''}`}
                            onClick={() => handleTabClick('roomCharges')}
                            // href="#roomCharges"
                        >
                            Room Charges
                        </a>
                    </li>
                </ul>
                <div className="modal-body pt-0">
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
                            <div id="guestDetails" className="tab-pane active">
                                <div className="row">
                                    <div className="col-3 p-0 d-flex flex-column border-right">
                                        <div className="button-container mt-2">
                                            <div
                                                className="btn subtitle-2m ms-2 col-12 d-flex align-items-center text-left pt-2"
                                                type="button"
                                            >
                                                Room/Folio
                                                <button className="ms-auto me-2 border border-primary rounded background">
                                                    <span className="material-icons-outlined primary-icon blue_colour text-center">
                                                        add
                                                    </span>
                                                </button>
                                            </div>

                                            <div
                                                className="accordion scrollable-accordion"
                                                id="accordionExample"
                                            >
                                                <div className="accordion-item m-2">
                                                    <button
                                                        className="accordion-button collapsed body-2 py-2 col-8 d-flex text-left"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        102
                                                    </button>
                                                    <div
                                                        id="collapseOne"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="headingOne"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="p-0">
                                                            <button
                                                                className="btn body-2 p-2 col-12 d-flex text-left modal-dropdown"
                                                                type="button"
                                                                id="dropdownMenuButton2"
                                                                aria-expanded="false"
                                                            >
                                                                <span className="dropdown-icon material-icons-outlined primary-icon blue_colour mx-2">
                                                                    person_outline
                                                                </span>
                                                                324 - Mr Alex
                                                                Polo
                                                                <span className="dropdown-icon material-icons-outlined primary-icon ms-auto blue_colour me-2">
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

                                                <div
                                                    className="accordion px-0"
                                                    id="identityAccordion"
                                                >
                                                    <div className="accordion-item accordion_btn">
                                                        <button
                                                            className="accordion_btn d-flex align-items-center mt-2 ps-0"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#identityCollapse"
                                                            aria-expanded="true"
                                                            aria-controls="identityCollapse"
                                                        >
                                                            <span className="material-icons-outlined">
                                                                keyboard_arrow_down
                                                            </span>
                                                            Identity Information
                                                        </button>

                                                        <div
                                                            id="identityCollapse"
                                                            className="accordion-collapse collapse"
                                                            aria-labelledby="identityHeading"
                                                            data-bs-parent="#identityAccordion"
                                                        >
                                                            <div className="accordion-body pb-0">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-4 mt-2 ps-0 cp"
                                                                        onClick={
                                                                            uploadImgMdlShow
                                                                        }
                                                                    >
                                                                        <div className="Neon-input-dragDrop d-flex text-center flex-column align-items-center">
                                                                            <span className="material-icons-outlined primary-icon blue_colour upload-button mt-2">
                                                                                upload
                                                                            </span>
                                                                            <button
                                                                                type="button "
                                                                                className="upload-images-btn subtitle-2m d-flex align-items-center mt-2"

                                                                                // data-bs-toggle="modal"
                                                                                // data-bs-target="#uploadImages"
                                                                            >
                                                                                Upload
                                                                                Images
                                                                            </button>
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
                                                                                        ID
                                                                                        Number
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
                                                                                        ID
                                                                                        Type
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
                                                                                        Issuing
                                                                                        City
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control custom-input"
                                                                                        id="customInput"
                                                                                        placeholder="Mumbai"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4 pe-1">
                                                                                <div className="form-group mb-3">
                                                                                    <label
                                                                                        htmlFor="customInput"
                                                                                        className="custom-label"
                                                                                    >
                                                                                        Expiry
                                                                                        Date
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
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="accordion px-0"
                                                    id="OtherAccordion"
                                                >
                                                    <div className="accordion-item accordion_btn">
                                                        <button
                                                            className="d-flex align-items-center accordion_btn mt-3 ps-0"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#OtherCollapse"
                                                            aria-expanded="true"
                                                            aria-controls="OtherCollapse"
                                                        >
                                                            <span className="material-icons-outlined">
                                                                keyboard_arrow_down
                                                            </span>
                                                            Other Information
                                                        </button>
                                                        <div
                                                            id="OtherCollapse"
                                                            className="accordion-collapse collapse"
                                                            aria-labelledby="OtherHeading"
                                                            data-bs-parent="#OtherAccordion"
                                                        >
                                                            <div className="accordion-body">
                                                                <div className="row">
                                                                    <div className="col ps-0">
                                                                        <div className="form-group mb-3">
                                                                            <label
                                                                                htmlFor="customInput"
                                                                                className="custom-label"
                                                                            >
                                                                                Birth
                                                                                Date
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
                                                                                Wedding
                                                                                Date
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
                                                                                Birth
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
                                                                    <div className="col pe-1">
                                                                        <div className="form-group mb-3">
                                                                            <label
                                                                                htmlFor="customInput"
                                                                                className="custom-label"
                                                                            >
                                                                                Birth
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
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 ps-0">
                                                                        <div className="form-group mb-3">
                                                                            <label
                                                                                htmlFor="customInput"
                                                                                className="custom-label"
                                                                            >
                                                                                Spouse
                                                                                Birthdate
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
                                                    className="btn-sm btn-secondary ms-1"
                                                    data-bs-dismiss="modal"
                                                >
                                                    C Form
                                                </button>
                                                <div className="btn-group">
                                                    <button
                                                        className="btn-sm btn-secondary d-flex align-items-center ms-1"
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
                                                    className="btn-sm btn-primary ms-1"
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
            {showImgMdl && (
                <ImgUpMdl
                    showImgMdl={showImgMdl}
                    setShowImgMdl={setShowImgMdl}
                />
            )}
        </div>
    );
}

export default EditReservtionInfo;
