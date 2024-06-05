import React from 'react';

function FrontView() {
    const guests = [
        {
            label: 'Current In-House',
            adult: 15,
            child: 15,
            total: 30,
        },
        {
            label: 'Expected Arrival',
            adult: 15,
            child: 15,
            total: 30,
        },
        {
            label: 'Expected Departure',
            adult: 15,
            child: 15,
            total: 30,
        },
        {
            label: 'Expected Stay Over',
            adult: 15,
            child: 15,
            total: 30,
        },
        {
            label: 'Projected In-House',
            adult: 15,
            child: 15,
            total: 30,
        },
    ];

    const occupancy = [
        {
            label: 'Executive 1',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'Executive 1',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'Executive 1',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'Executive 1',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'Executive 1',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'Single Sharing Rooms ',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'Single Sharing Rooms',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'Single Sharing Rooms',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'King Suit Room',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'King Suit Room',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'King Suit Room',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'King Suit Room',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
        {
            label: 'King Suit Room',
            reserved: 15,
            available: 15,
            block: 10,
            oo: 10,
            total: 10,
        },
    ];




    return (
        <div className="p-3">
            <div className="container-fluid">
                <h4 className="headline-h5m">Front View</h4>

                <div class="container-page rounded-2 p-3">
                    <div class="row pl-5">
                        <h5 class="headline-h6m">Room Statistic</h5>
                    </div>
                    <div class="row pt-2">
                        <div class="col flex-grow-1">
                            <span class="body-2">Today's</span>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="subtitle-1m f-weight-600">
                                    Arrival
                                </div>
                                <div class="headline-h5m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div class="separator w-auto"></div>
                        <div class="col flex-grow-1 ">
                            <span class="body-2">Today's</span>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="subtitle-1m f-weight-600">
                                    Departure
                                </div>
                                <div class="headline-h5m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div class="separator w-auto"></div>

                        <div class="col flex-grow-1 ">
                            <span class="body-2">Today's</span>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="subtitle-1m f-weight-600">
                                    Occupied Room
                                </div>
                                <div class="headline-h5m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div class="separator w-auto"></div>

                        <div class="col flex-grow-1 ">
                            <span class="body-2">Today's</span>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="subtitle-1m f-weight-600">
                                    Stay Over
                                </div>
                                <div class="headline-h5m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                        <div class="separator w-auto"></div>

                        <div class="col flex-grow-1">
                            <span class="body-2">Today's</span>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="subtitle-1m f-weight-600">
                                    Available Room
                                </div>
                                <div class="headline-h5m primary-colori">
                                    32
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Category wise occupancy --> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        <div className="container-page p-4">
                            <h6 className="headline-h6m">
                                Category Wise Occupancy
                            </h6>

                            <div>
                                <table className="table custom-table">
                                    <colgroup>
                                        <col width={"25%"} />
                                        <col width={"15%"} />
                                        <col width={"15%"} />
                                        <col width={"15%"} />
                                        <col width={"15%"} />
                                        <col width={"15%"} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className="table-right"></th>
                                            <th className="body-1l table-right  green-c-700">
                                                Reserved
                                            </th>
                                            <th className="body-1l table-right primary-c-600">
                                                Available
                                            </th>
                                            <th className="body-1l table-right red-c-600">
                                                Block
                                            </th>
                                            <th className="body-1l table-right secondary-c-700">
                                                OO
                                            </th>
                                            <th className="body-1l table-right secondary-c-700">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {occupancy.map((occupant, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className="my-2"
                                                >
                                                    <td className="body-1l align-middle secondary-c-700">
                                                        {occupant.label}
                                                    </td>
                                                    <td className="table-right align-middle subtitle-1m green-c-700">
                                                        {occupant.reserved}
                                                    </td>
                                                    <td className="table-right subtitle-1m align-middle primary-c-600">
                                                        {occupant.available}
                                                    </td>
                                                    <td className="table-right subtitle-1m align-middle red-c-600">
                                                        {occupant.block}
                                                    </td>
                                                    <td className="table-right subtitle-1m align-middle secondary-c-700">
                                                        {occupant.oo}
                                                    </td>
                                                    <td className="table-right subtitle-1m align-middle secondary-c-700">
                                                        {occupant.total}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-5 d-flex flex-column justify-content-start">
                        <div className="container-page p-4">
                            <h6 className="headline-h6m">House Keeping</h6>

                            <div className="row m-0">
                                <div className="col-6 p-0">
                                    <div className="row m-0 py-2">
                                        <span className="subtitle-1m col-8 p-0">
                                            Occupied rooms
                                        </span>
                                        <span className="subtitle-1m col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                    <div className="row py-1 m-0">
                                        <span className="font-primary col-8 p-0">
                                            Clean
                                        </span>
                                        <span className="font-primary col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                    <div className="row py-1 m-0">
                                        <span className="font-primary col-8 p-0">
                                            Dirty
                                        </span>
                                        <span className="font-primary col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                    <div className="row py-1 m-0">
                                        <span className="font-primary col-8 p-0">
                                            Out of order
                                        </span>
                                        <span className="font-primary col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row py-2 m-0">
                                        <span className="subtitle-1m col-8 p-0">
                                            Occupied rooms
                                        </span>
                                        <span className="subtitle-1m col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                    <div className="row py-1 m-0">
                                        <span className="font-primary col-8 p-0">
                                            Clean
                                        </span>
                                        <span className="font-primary col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                    <div className="row py-1 m-0">
                                        <span className="font-primary col-8 p-0">
                                            Dirty
                                        </span>
                                        <span className="font-primary col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                    <div className="row py-1 m-0">
                                        <span className="font-primary col-8 p-0">
                                            Out of order
                                        </span>
                                        <span className="font-primary col-4 p-0 text-end">
                                            57
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-page p-4">
                            <h6 className="headline-h6m">Guests</h6>

                            <div>
                                <table className="table custom-table">
                                    <colgroup>
                                        <col className="col-4" />
                                        <col className="col-2" />
                                        <col className="col-2" />
                                        <col className="col-2" />
                                    </colgroup>

                                    <thead>
                                        <tr>
                                            <th className="table-right"></th>
                                            <th className="body-1l secondary-c-700 table-right">
                                                Adult
                                            </th>
                                            <th className="body-1l secondary-c-700 table-right">
                                                Child
                                            </th>
                                            <th className="body-1l secondary-c-700 table-right">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {guests.map((guest, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="body-1l secondary-c-700">
                                                        {guest.label}
                                                    </td>
                                                    <td className="table-right subtitle-1m">
                                                        {guest.adult}
                                                    </td>
                                                    <td className="table-right subtitle-1m">
                                                        {guest.child}
                                                    </td>
                                                    <td className="table-right subtitle-1m">
                                                        {guest.total}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrontView;
