import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, activeButton, setActiveButton, counts }) => {
    return (
        <div className="container-fluid py-3 px-4">
            <div className="row m-0">
                <div className="col-12 p-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-2">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Master</a>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Location Master
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12 action-header">
                    <div
                        className="row m-0"
                        style={{
                            height: '56px',
                        }}
                    >
                        <div className="col-4 p-0 d-flex align-items-center">
                            <h5 className="headline-h6m mb-0 ">Locations</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row m-0 d-flex  flex-nowrap">
                <div
                    className="col-2 card px-0 p-2"
                    style={{
                        minHeight: 'calc(100vh - 190px)',
                    }}
                >
                    <div className="row m-0">
                        <div className="col-12 d-flex align-items-center">
                            <div className="col-12 d-flex gap-2 flex-column align-items-end">
                                <h6
                                    className={`subtitle-1m mb-0 py-2 px-3 cp w-100 d-flex align-items-center gap-2 btn-h48 ${
                                        activeButton === 'country'
                                            ? 'btn-primary'
                                            : 'btn gray-bg-200'
                                    }`}
                                    onClick={() => setActiveButton('country')}
                                >
                                    Country
                                    <span
                                        className={`subtitle-1m ${
                                            activeButton === 'country'
                                                ? 'btn-primary rounded-circle'
                                                : 'rounded-circle2'
                                        }`}
                                    >
                                        {counts?.countryCount}
                                    </span>
                                </h6>

                                <h6
                                    className={`subtitle-1m mb-0 p-2 px-3 cp w-100 d-flex align-items-center gap-2 btn-h48 ${
                                        activeButton === 'state'
                                            ? 'btn-primary'
                                            : 'btn gray-bg-200'
                                    }`}
                                    onClick={() => setActiveButton('state')}
                                >
                                    State
                                    <span
                                        className={`subtitle-1m ${
                                            activeButton === 'state'
                                                ? 'btn-primary rounded-circle'
                                                : 'rounded-circle2'
                                        }`}
                                    >
                                        {counts?.stateCount}
                                    </span>
                                </h6>

                                <h6
                                    className={`subtitle-1m mb-0 p-2 px-3 cp w-100 d-flex align-items-center gap-2 btn-h48 ${
                                        activeButton === 'city'
                                            ? 'btn-primary'
                                            : 'btn gray-bg-200'
                                    }`}
                                    onClick={() => setActiveButton('city')}
                                >
                                    City
                                    <span
                                        className={`subtitle-1m ${
                                            activeButton === 'city'
                                                ? 'btn-primary rounded-circle'
                                                : 'rounded-circle2'
                                        }`}
                                    >
                                        {counts?.cityCount}
                                    </span>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10 p-0">
                    <div className="ms-3 mt-3">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
