import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import CreateEditMdl from './CreateEditMdl';
import DeleteMdl from '../../components/common/DeleteMdl';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/PayTyp/actions';

function PayTyp() {
    const [listingData, setListingData] = useState([]);

    const dispatch = useDispatch();
    const {
        loader,
        payTypListData,
        payTypCreated,
        payTypUpdate,
        payTypDelete,
    } = useSelector((state) => state?.payTypReducer);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Payment Type');
    const [payTypData, setPayTypData] = useState(null);
    const [statusValue, setStatusValue] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        { data: 'rcpt_type', label: 'Name', width: '70%' },
        // {
        //     data: 'status',
        //     label: 'Status',
        //     render: function (data, type, row) {
        //         if (data == 1) {
        //             return `<div class=""><span class="material-icons-outlined check-table">
        //                         check_circle
        //                     </span></div>`;
        //         } else {
        //             return `<div class=""><span class="material-icons-outlined cancel-table">
        //                         cancel
        //                     </span></div>`;
        //         }
        //     },
        //     className: 'table-right',
        //     width: '10%',
        // },
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
     * @param {handleAddPayTyp}
     */
    function handleAddPayTyp() {
        setMode('Add Payment Type');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditPayTyp} idType
     */
    function handleEditPayTyp(idType) {
        setMode('Edit Payment Type');
        setPayTypData(idType);
        setOpen(true);
    }

    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        if (mode === 'Add Payment Type') {
            dispatch({
                type: actions.PAY_TYP_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                rcpt_type: formData.rcpt_type,
                rcpt_type_id: formData.id,
                // status: statusValue,
            };
            dispatch({
                type: actions.PAY_TYP_UPD,
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
        // onDelete(item);
        if (item && item.id) {
            setShowDel(true);
            setDelId(item.id);
        }
    };

    const handleDelSubmit = () => {
        const idTypeId = {
            id_type_id: delId,
        };
        dispatch({
            type: actions.PAY_TYP_DEL,
            payload: idTypeId,
        });
        setShowDel(false);
    };
    useEffect(() => {
        setListingData(payTypListData);
    }, [payTypListData]);
    useEffect(() => {
        dispatch({
            type: actions.PAY_TYP_LIST,
        });
    }, [payTypCreated, payTypUpdate, payTypDelete]);

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
                                    Payment Type Master
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12 action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0 ">
                                    Payment Type List
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
                                        id="dt-search-cstm"
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
                                    onClick={handleAddPayTyp}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    Add Pay Type
                                </button>

                                {/* <button
                                    className="btn btn-outline d-flex"
                                    onClick={removeMultiple}
                                >
                                    <span className="material-icons-outlined">
                                        delete
                                    </span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    {loader ? (
                        <Spinner />
                    ) : (
                        <div className="col-12 p-3 container-page">
                            <DataTableComponent
                                data={listingData}
                                onEdit={handleEditPayTyp}
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
                        payTypData={payTypData}
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

export default PayTyp;
