import React from 'react';

function FrontView() {
    return (
        <>
            <div className="container-fluid pt-3 px-4">
                <h4>Front View</h4>

                <div className="container-page rounded-2 p-3">
                    <div className="row pl-5">
                        <h5 className="headline-h6m">Room Statistic</h5>
                    </div>
                    <div className="room-stats d-flex justify-content-around pt-2">
                        <div
                            className="flex-grow-1"
                            style={{ paddingRight: '3rem' }}
                        >
                            <span className="body-2">Today's</span>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="headline-h6m">Arrival</div>
                                <div className="headline-h4m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="flex-grow-1 px-5">
                            <span className="body-2">Today's</span>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="headline-h6m">Arrival</div>
                                <div className="headline-h4m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="flex-grow-1 px-5">
                            <span className="body-2">Today's</span>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="headline-h6m">Arrival</div>
                                <div className="headline-h4m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="flex-grow-1 px-5">
                            <span className="body-2">Today's</span>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="headline-h6m">Arrival</div>
                                <div className="headline-h4m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div
                            className="flex-grow-1"
                            style={{ paddingLeft: '3rem' }}
                        >
                            <span className="body-2">Today's</span>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="headline-h6m">Arrival</div>
                                <div className="headline-h4m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Category wise occupancy --> */}
            <div className="container-fluid px-4 d-flex justify-content-between">
                <div className="container-page p-4" style={{ width: '58.5%' }}>
                    <h6 className="headline-h6m">Category wise occupancy</h6>

                    <div>
                        <table className="table custom-table">
                            <colgroup>
                                <col className="w-25" />
                                <col className="w-15p" />
                                <col className="w-15p" />
                                <col className="w-15p" />
                                <col className="w-15p" />
                                <col className="w-15p" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th className="th-custom table-right"></th>
                                    <th
                                        className="body-1l table-right"
                                        style={{
                                            color: 'var(--accent-color-g700)',
                                        }}
                                    >
                                        Reserved
                                    </th>
                                    <th
                                        className="body-1l table-right"
                                        style={{
                                            color: 'var(--primary-color600)',
                                        }}
                                    >
                                        Available
                                    </th>
                                    <th
                                        className="body-1l table-right"
                                        style={{
                                            color: 'var(--accent-color-r600)',
                                        }}
                                    >
                                        Block
                                    </th>
                                    <th
                                        className="body-1l table-right"
                                        style={{
                                            color: 'var(--secondary-color700)',
                                        }}
                                    >
                                        OO
                                    </th>
                                    <th
                                        className="body-1l table-right"
                                        style={{
                                            color: 'var(--secondary-color700)',
                                        }}
                                    >
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="my-2">
                                    <td className="body-1l">Executive</td>
                                    <td
                                        className="table-right subtitle-1m"
                                        style={{
                                            color: 'var(--accent-color-g700)',
                                        }}
                                    >
                                        15
                                    </td>
                                    <td
                                        className="table-right subtitle-1m"
                                        style={{
                                            color: 'var(--primary-color600)',
                                        }}
                                    >
                                        15
                                    </td>
                                    <td
                                        className="table-right subtitle-1m"
                                        style={{
                                            color: 'var(--accent-color-r600)',
                                        }}
                                    >
                                        10
                                    </td>
                                    <td
                                        className="table-right subtitle-1m"
                                        style={{
                                            color: 'var(--secondary-color700)',
                                        }}
                                    >
                                        10
                                    </td>
                                    <td
                                        className="table-right subtitle-1m"
                                        style={{
                                            color: 'var(--secondary-color700)',
                                        }}
                                    >
                                        10
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="width-40p">
                    <div className="container-page p-4">
                        <h6 className="headline-h6m">House Keeping</h6>

                        <div className="d-flex justify-content-between pt-1">
                            <div className="width-45p">
                                <div className="d-flex justify-content-between py-2">
                                    <span className="subtitle-1m">
                                        Occupied rooms
                                    </span>
                                    <span className="subtitle-1m">57</span>
                                </div>
                                <div className="d-flex justify-content-between py-1">
                                    <span className="font-primary">Clean</span>
                                    <span className="font-primary">57</span>
                                </div>
                                <div className="d-flex justify-content-between py-1">
                                    <span className="font-primary">Dirty</span>
                                    <span className="font-primary">57</span>
                                </div>
                                <div className="d-flex justify-content-between py-1">
                                    <span className="font-primary">
                                        Out of order
                                    </span>
                                    <span className="font-primary">57</span>
                                </div>
                            </div>
                            <div className="width-45p">
                                <div className="d-flex justify-content-between py-2">
                                    <span className="subtitle-1m">
                                        Occupied rooms
                                    </span>
                                    <span className="subtitle-1m">57</span>
                                </div>
                                <div className="d-flex justify-content-between py-1">
                                    <span className="font-primary">Clean</span>
                                    <span className="font-primary">57</span>
                                </div>
                                <div className="d-flex justify-content-between py-1">
                                    <span className="font-primary">Dirty</span>
                                    <span className="font-primary">57</span>
                                </div>
                                <div className="d-flex justify-content-between py-1">
                                    <span className="font-primary">
                                        Out of order
                                    </span>
                                    <span className="font-primary">57</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-page p-4">
                        <h6 className="headline-h6m">Guests</h6>

                        <div>
                            <table className="table custom-table">
                                <colgroup>
                                    <col className="width-40p" />
                                    <col className="width-20p" />
                                    <col className="width-20p" />
                                    <col className="width-20p" />
                                </colgroup>

                                <thead>
                                    <tr>
                                        <th className="th-custom table-right"></th>
                                        <th className="body-1l table-right">
                                            Adult
                                        </th>
                                        <th className="body-1l table-right">
                                            Child
                                        </th>
                                        <th className="body-1l table-right">
                                            Total
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="body-1l">
                                            Current In-House
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            30
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="body-1l">
                                            Current In-House
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            30
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="body-1l">
                                            Current In-House
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            30
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="body-1l">
                                            Current In-House
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            30
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="body-1l">
                                            Current In-House
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            15
                                        </td>
                                        <td className="table-right subtitle-1m">
                                            30
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FrontView;
