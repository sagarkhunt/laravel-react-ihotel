import React from 'react';
import Modal from '../../../components/common/Modal';

function AvailableInqMdl({ showAvaInq, setShowAvaInq }) {
    return (
        <Modal
            showAvaInq={showAvaInq}
            handleModal={() => setShowAvaInq(!showAvaInq)}
        >
            <div
                className="modal right show"
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
                        <div className="modal-header">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Availibility Inquiry
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
                                {/* <!-- Check In --> */}
                                <div className="" style={{ width: '20%' }}>
                                    <p className="mb-1">Check In</p>
                                    <input
                                        type="date"
                                        className="custom-input w-100"
                                        value="2024-09-16"
                                    />
                                </div>

                                {/* <!-- Nights --> */}
                                <div
                                    className="border rounded surface-d text-center py-2"
                                    style={{ width: '5%' }}
                                >
                                    <p className="mb-1">Nights</p>
                                    <span>4</span>
                                </div>

                                {/* <!-- Check Out --> */}
                                <div className="" style={{ width: '20%' }}>
                                    <p className="mb-1">Check Out</p>
                                    <input
                                        type="date"
                                        className="custom-input w-100"
                                        value="2024-09-21"
                                    />
                                </div>

                                {/* <!-- Room Category --> */}
                                <div className="" style={{ width: '40%' }}>
                                    <p className="mb-2">Room Category</p>
                                    <div
                                        id="tag-container"
                                        style={{
                                            // border: '2px solid #a6b6c4',
                                            minHeight: '50px',
                                        }}
                                        className=""
                                    >
                                        <select
                                            className="form-select custom-input "
                                            aria-label=".form-select-sm example"
                                            id="cust_cat_id"
                                            name="cust_cat_id"
                                            style={{ minHeight: '50px' }}
                                        >
                                            <option value="">
                                                Please Select Room Cate
                                            </option>{' '}
                                            <option value="room1">
                                                Room 1
                                            </option>
                                            <option value="room2">
                                                Room 2
                                            </option>
                                            <option value="room3">
                                                Room 3
                                            </option>
                                            <option value="room4">
                                                Room 4
                                            </option>
                                            <option value="room5">
                                                Room 5
                                            </option>
                                            <option value="room6">
                                                Room 6
                                            </option>
                                            <option value="room7">
                                                Room 7
                                            </option>
                                            <option value="room8">
                                                Room 8
                                            </option>
                                            <option value="room9">
                                                Room 9
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* <!-- Search Button --> */}
                                <div className="" style={{ width: '7%' }}>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        style={{ height: '50px' }}
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
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                16 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                17 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                18 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                19 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                20 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                21 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                22 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                23 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                24 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                25 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                26 May
                                            </th>
                                            <th
                                                scope="col"
                                                className="th-custom align-middle text-center"
                                            >
                                                27 May
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            style={{
                                                height: '48px',
                                                backgroundColor: '#e6eff8',
                                            }}
                                        >
                                            <td
                                                className="subtitle-2b align-middle px-3"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                Executive
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Reserved Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Blocked Rooms
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Out of Order Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                        </tr>
                                        <tr
                                            style={{
                                                height: '48px',
                                                backgroundColor: '#e7f6eb',
                                            }}
                                        >
                                            <td className="subtitle-2m align-middle px-3">
                                                Available Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                        </tr>

                                        <tr
                                            style={{
                                                height: '48px',
                                                backgroundColor: '#e6eff8',
                                            }}
                                        >
                                            <td
                                                className="subtitle-2b align-middle px-3"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                Executive
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Reserved Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Blocked Rooms
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Out of Order Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                        </tr>
                                        <tr
                                            style={{
                                                height: '48px',
                                                backgroundColor: '#e7f6eb',
                                            }}
                                        >
                                            <td className="subtitle-2m align-middle px-3">
                                                Available Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                        </tr>

                                        <tr
                                            style={{
                                                height: '48px',
                                                backgroundColor: '#e6eff8',
                                            }}
                                        >
                                            <td
                                                className="subtitle-2b align-middle px-3"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                Executive
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                            <td
                                                className="subtitle-2b primary-colori text-center align-middle"
                                                style={{
                                                    fontFamily:
                                                        "'Nunito', sans-serif",
                                                }}
                                            >
                                                20
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Reserved Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Blocked Rooms
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                            <td className="subtitle-2m text-center align-middle">
                                                6
                                            </td>
                                        </tr>
                                        <tr style={{ height: '48px' }}>
                                            <td className="subtitle-2m align-middle px-3">
                                                Out of Order Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#e3001f' }}
                                            >
                                                6
                                            </td>
                                        </tr>
                                        <tr
                                            style={{
                                                height: '48px',
                                                backgroundColor: '#e7f6eb',
                                            }}
                                        >
                                            <td className="subtitle-2m align-middle px-3">
                                                Available Rooms
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
                                            <td
                                                className="subtitle-2m text-center align-middle"
                                                style={{ color: '#0b641f' }}
                                            >
                                                6
                                            </td>
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
                                Cancle
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
