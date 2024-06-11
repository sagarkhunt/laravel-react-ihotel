import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import CreateEditMdl from './CreateEditMdl';
import DeleteMdl from '../../components/common/DeleteMdl';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/MarketSegment/actions';

function MarketSegment() {
    const [listingData, setListingData] = useState([]);

    const dispatch = useDispatch();
    const {
        loader,
        marketSegmentListData,
        marketSegmentCreated,
        marketSegmentUpdate,
        marketSegmentDelete,
    } = useSelector((state) => state?.marketSegmentReducer);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Market Segment');
    const [marketSegmentData, setMarketSegmentData] = useState(null);
    const [statusValue, setStatusValue] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        { data: 'name', label: 'Market Segment Name', width: '70%' },
        {
            data: 'status',
            label: 'Status',
            render: function (data, type, row) {
                if (data == 1) {
                    return `<div class=""><span class="material-icons-outlined check-table">
                                check_circle
                            </span></div>`;
                } else {
                    return `<div class=""><span class="material-icons-outlined cancel-table">
                                cancel
                            </span></div>`;
                }
            },
            className: 'table-right',
            width: '10%',
        },
        {
            data: null,
            label: 'Action',
            render: () => `
                <span class="material-icons-outlined edit-table">
                    edit
                </span>
                <span class="material-icons-outlined delete-table">
                    cancel_presentation
                </span>
            `,
            className: 'action-container',
            width: '10%',
        },
    ];

    /***
     * @param {handleAddMarketSegment}
     */
    function handleAddMarketSegment() {
        setMode('Add Market Segment');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditMarketSegment} segment
     */
    function handleEditMarketSegment(segment) {
        setMode('Edit Market Segment');
        setMarketSegmentData(segment);
        setOpen(true);
    }

    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        if (mode === 'Add Market Segment') {
            dispatch({
                type: actions.MARKETSEGMENT_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                name: formData.name,
                market_segment_id: formData.id,
                status: statusValue,
            };
            dispatch({
                type: actions.MARKETSEGMENT_UPDATE,
                payload: updatedFormData,
            });
        }
        setOpen(false);
    }
    /**
     *
     * @param {handleDelete} item
     */
    const handleDelete = (item) => {
        if (item && item.id) {
            setShowDel(true);
            setDelId(item.id);
        }
    };

    const handleDelSubmit = () => {
        const marketSegmentId = {
            market_segment_id: delId,
        };
        dispatch({
            type: actions.MARKETSEGMENT_DELETE,
            payload: marketSegmentId,
        });
        setShowDel(false);
    };
    useEffect(() => {
        setListingData(marketSegmentListData);
    }, [marketSegmentListData]);
    useEffect(() => {
        dispatch({
            type: actions.MARKETSEGMENT_LIST,
        });
    }, [marketSegmentCreated, marketSegmentUpdate, marketSegmentDelete]);

    return (
        <>
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
                                    Market Segment Master
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12 action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0">
                                    Market Segment List
                                </h5>
                            </div>
                            <div className="col-8 gap-3 action-right">
                                <div className="form-group position-relative search-container">
                                    <span className="material-icons-outlined search-icon">
                                        search
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control search-input"
                                        id="dt-serach-cstm"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                    {searchQuery && (
                                        <span
                                            className="material-icons-outlined close-icon"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                                <button
                                    className="btn btn-primary d-flex"
                                    onClick={handleAddMarketSegment}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    New Market Segment
                                </button>
                            </div>
                        </div>
                    </div>
                    {loader ? (
                        <Spinner />
                    ) : (
                        <div className="col-12 p-3 container-page">
                            <DataTableComponent
                                data={listingData}
                                onEdit={handleEditMarketSegment}
                                columnsConfig={columnsConfig}
                                onDelete={handleDelete}
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                            />
                        </div>
                    )}
                </div>
                {open && (
                    <CreateEditMdl
                        open={open}
                        setOpen={setOpen}
                        mode={mode}
                        onSubmit={handleSubmit}
                        marketSegmentData={marketSegmentData}
                        statusValue={statusValue}
                        setStatusValue={setStatusValue}
                    />
                )}
                {showDel && (
                    <DeleteMdl
                        open={showDel}
                        setOpen={setShowDel}
                        onSubmit={handleDelSubmit}
                        delId={setDelId}
                    />
                )}
            </div>
        </>
    );
}

export default MarketSegment;
