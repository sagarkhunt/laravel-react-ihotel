import React, { useState } from 'react';
import AddStaff from './AddStaff';

function HouseKeeoing() {
    const [open, setOpen] = useState(false);
    function showAddStaff() {
        setOpen(true);
    }
    return (
        <main className="container-fluid px-4 d-flex justify-content-between main-container">
            <section className="container-page width-60p">
                <div className="header p-4 pb-2">
                    <h6 className="headline-h6m">House Keeping</h6>

                    <ul
                        className="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active d-flex align-items-center gap-3"
                                id="dirty-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#dirty"
                                href="#"
                                role="tab"
                                aria-controls="dirty"
                                aria-selected="true"
                            >
                                Dirty
                                <span className="tab-counts">19</span>
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link d-flex align-items-center gap-3"
                                id="inspect-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#inspect"
                                role="tab"
                                aria-controls="inspect"
                                aria-selected="false"
                            >
                                Inspect
                                <span className="tab-counts">19</span>
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link d-flex align-items-center gap-3"
                                id="clean-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#clean"
                                role="tab"
                                aria-controls="clean"
                                aria-selected="false"
                            >
                                Clean
                                <span className="tab-counts">19</span>
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link d-flex align-items-center gap-3"
                                id="outoforder-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#outoforder"
                                role="tab"
                                aria-controls="outoforder"
                                aria-selected="false"
                            >
                                Out of Order
                                <span className="tab-counts">19</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content px-4" id="pills-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="dirty"
                        role="tabpanel"
                        aria-labelledby="dirty-tab"
                        tabIndex="0"
                    >
                        <div className="px-4">
                            <div className="d-flex align-items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#899EB0"
                                    className="bi bi-check-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                                <h6 className="headline-h6m mb-0">Executive</h6>
                                <p className="caption-1 mb-0">
                                    Select room to complete
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="w-100 px-4 d-flex flex-wrap pb-5 mt-neg-1">
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab select-room-number-tab">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-check-circle-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </span>
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                        </div>

                        <div className="px-4">
                            <div className="d-flex align-items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#899EB0"
                                    className="bi bi-check-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                                <h6 className="headline-h6m mb-0">Elegance</h6>
                                <p className="caption-1 mb-0">
                                    Select room to complete
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="w-100 px-4 d-flex flex-wrap pb-5 mt-neg-1">
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                        </div>

                        <div className="px-4">
                            <div className="d-flex align-items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#899EB0"
                                    className="bi bi-check-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                                <h6 className="headline-h6m mb-0">
                                    Family Room
                                </h6>
                                <p className="caption-1 mb-0">
                                    Select room to complete
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="w-100 px-4 d-flex flex-wrap pb-5 mt-neg-1">
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab select-red-room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                        </div>

                        <div className="px-4">
                            <div className="d-flex align-items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#899EB0"
                                    className="bi bi-check-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                                <h6 className="headline-h6m mb-0">
                                    King Suit Room
                                </h6>
                                <p className="caption-1 mb-0">
                                    Select room to complete
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="w-100 px-4 d-flex flex-wrap pb-5 mt-neg-1">
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                            <div className="rounded px-2 py-1 text-center room-number-tab">
                                R1
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="inspect"
                        role="tabpanel"
                        aria-labelledby="inspect-tab"
                        tabIndex="1"
                    >
                        ...
                    </div>
                    <div
                        className="tab-pane fade"
                        id="clean"
                        role="tabpanel"
                        aria-labelledby="clean-tab"
                        tabIndex="2"
                    >
                        ...
                    </div>
                    <div
                        className="tab-pane fade"
                        id="outoforder"
                        role="tabpanel"
                        aria-labelledby="outoforder-tab"
                        tabIndex="3"
                    >
                        ...
                    </div>
                </div>
            </section>
            <section className="container-page p-4 pt-0 width-39p">
                <div className="d-flex justify-content-around py-2">
                    <div className="flex-grow-1 text-center">
                        <span className="caption-1">Upcoming</span>
                        <div className="subtitle-1m">4</div>
                    </div>

                    <div className="separator"></div>
                    <div className="flex-grow-1 text-center">
                        <span className="caption-1">Ongoing</span>
                        <div className="subtitle-1m">4</div>
                    </div>
                    <div className="separator"></div>

                    <div className="flex-grow-1 text-center">
                        <span className="caption-1">Check Out</span>
                        <div className="subtitle-1m">4</div>
                    </div>
                </div>

                <div className="container-seperator"></div>

                <div
                    className="my-2"
                    style={{ minHeight: 'calc(100vh - 300px)' }}
                >
                    <div className="header">
                        <h6 className="headline-h6m">
                            Select Housekeeping Staff
                        </h6>
                    </div>

                    <div className="w-100 my-4 d-flex flex-wrap rounded pt-1 px-2 pb-2 border-d">
                        <span className="light-gray-box-1">Sahil</span>
                        <span className="light-gray-box-1">Sahil</span>
                        <span className="light-gray-box-1">Sahil</span>
                        <span className="light-gray-box-1">Sahil</span>
                        <span className="light-gray-box-1">Sahil</span>
                        <span className="light-gray-box-1">Sahil</span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={showAddStaff}
                        >
                            <span
                                className="subtitle-2m d-flex align-items-center primary-colori"
                                data-bs-toggle="modal"
                                data-bs-target="#addStaff"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#0863B5"
                                    className="bi bi-plus"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                Add Staff
                            </span>
                        </button>
                        <button type="button" className="btn btn-primary">
                            <span className="subtitle-2m font-white">
                                Assign Room
                            </span>
                        </button>
                    </div>
                </div>

                <div className="container-seperator"></div>

                <div className="">
                    <button type="button" className="w-100 btn mt-4 border-li">
                        <span className="font-red subtitle-2m">
                            Mark Out of Order
                        </span>
                    </button>
                    <button
                        type="button"
                        className="w-100 btn btn-primary mt-2"
                    >
                        <span className="subtitle-2m font-white">Complete</span>
                    </button>
                </div>
            </section>
            {open && <AddStaff open={open} setOpen={setOpen} />}
        </main>
    );
}

export default HouseKeeoing;
