import React, { useEffect, useState } from 'react';
import Modal from '../../../components/common/Modal';
import actions from '../../../redux/Reservation/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function FilterReservationList({
    open,
    setOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    bsnsSrcId,
    setBsnsSrcId,
    status,
    setStatus,
}) {
    const [dropDownData, setDropDownData] = useState({});
    const [selectedStartDate, setSelectedStartDate] = useState(startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(endDate);
    const [selectedBsnsSrcId, setSelectedBsnsSrcId] = useState(bsnsSrcId);
    const [selectedStatus, setSelectedStatus] = useState(status);

    const { dropDownList } = useSelector((state) => state?.reserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setDropDownData(dropDownList);
    }, [dropDownList]);

    useEffect(() => {
        const sync_req = ['bsns_src'];
        dispatch({
            type: actions.RESER_DROPDOWN_LIST,
            payload: {
                sync_req: sync_req.join(','),
            },
        });
    }, []);

    return (
        <Modal open={open} handleModal={() => setOpen(!open)}>
            <div
                className="modal show"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                style={{ display: 'block' }}
                aria-modal="true"
                role="dialog"
            >
                <div
                    className="modal-dialog  modal-xs modal-dialog-centered"
                    style={{ height: 'calc(100vh - 100px)' }}
                >
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5
                                className="modal-title headline-h6m"
                                id="exampleModalLabel"
                            >
                                Filter
                            </h5>
                            <div className="gap-4 me-1">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setOpen(false)}
                                ></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row ">
                                <div className="col">
                                    <label
                                        htmlFor="checkin-date"
                                        className="custom-label mb-1"
                                    >
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control custom-input"
                                        id="checkin-date"
                                        value={selectedStartDate}
                                        onChange={(e) =>
                                            setSelectedStartDate(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <label
                                        htmlFor="checkout-date"
                                        className="custom-label mb-1"
                                    >
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control custom-input"
                                        id="checkout-date"
                                        value={selectedEndDate}
                                        onChange={(e) =>
                                            setSelectedEndDate(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="input-group">
                                    <label className="custom-label mb-1">
                                        Business Source
                                    </label>
                                </div>
                                <div className="input-group">
                                    <select
                                        className="form-select custom-input"
                                        id="reservationTypeDropdown"
                                        aria-label="Reservation Type Dropdown"
                                        value={selectedBsnsSrcId}
                                        onChange={(e) =>
                                            setSelectedBsnsSrcId(e.target.value)
                                        }
                                    >
                                        <option value="0">All</option>
                                        {dropDownData['bsns_src']?.map(
                                            (item, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            },
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div>
                                    <h6>Inquiry Status</h6>
                                </div>
                                <div>
                                    <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="inquiryStatus"
                                        id="statusAll"
                                        value="all"
                                        checked={selectedStatus === 'all'}
                                        onChange={(e) =>
                                            setSelectedStatus(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label me-3"
                                        htmlFor="statusAll"
                                    >
                                        All
                                    </label>

                                    <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="inquiryStatus"
                                        id="statusActive"
                                        value="active"
                                        checked={selectedStatus === 'active'}
                                        onChange={(e) =>
                                            setSelectedStatus(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label me-3"
                                        htmlFor="statusActive"
                                    >
                                        Active
                                    </label>

                                    <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="inquiryStatus"
                                        id="statusInactive"
                                        value="inactive"
                                        checked={selectedStatus === 'inactive'}
                                        onChange={(e) =>
                                            setSelectedStatus(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="statusInactive"
                                    >
                                        Inactive
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div>
                                <button
                                    type="button"
                                    className="btn-sm btn-outline"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        setSelectedStartDate('');
                                        setSelectedEndDate('');
                                        setSelectedBsnsSrcId('0');
                                        setSelectedStatus('all');
                                    }}
                                >
                                    Clear All
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn-sm btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        setStartDate(selectedStartDate);
                                        setEndDate(selectedEndDate);
                                        setBsnsSrcId(selectedBsnsSrcId);
                                        setStatus(selectedStatus);
                                        setOpen(false);
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
