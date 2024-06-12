import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import CreateEditMdl from './CreateEditMdl';
import DeleteMdl from '../../components/common/DeleteMdl';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import idTypeActions from '../../redux/IDType/actions';

function IDType() {
    const [listingData, setListingData] = useState([]);

    const dispatch = useDispatch();
    const {
        loader,
        idTypeListData,
        idTypeCreated,
        idTypeUpdate,
        idTypeDelete,
    } = useSelector((state) => state?.idTypeReducer);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add ID Type');
    const [idTypeData, setIdTypeData] = useState(null);
    const [statusValue, setStatusValue] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        { data: 'name', label: 'ID Type Name', width: '70%' },
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
     * @param {handleAddIDType}
     */
    function handleAddIDType() {
        setMode('Add ID Type');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditIDType} idType
     */
    function handleEditIDType(idType) {
        setMode('Edit ID Type');
        setIdTypeData(idType);
        setOpen(true);
    }

    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        if (mode === 'Add ID Type') {
            dispatch({
                type: idTypeActions.ID_TYPE_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                name: formData.name,
                id_type_id: formData.id,
                status: statusValue,
            };
            dispatch({
                type: idTypeActions.ID_TYPE_UPDATE,
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
            type: idTypeActions.ID_TYPE_DELETE,
            payload: idTypeId,
        });
        setShowDel(false);
    };
    useEffect(() => {
        setListingData(idTypeListData);
    }, [idTypeListData]);
    useEffect(() => {
        dispatch({
            type: idTypeActions.ID_TYPE_LIST,
        });
    }, [idTypeCreated, idTypeUpdate, idTypeDelete]);

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
                                    ID Type Master
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-12 action-header">
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <h5 className="headline-h6m mb-0 ">
                                    ID Type List
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
                                    onClick={handleAddIDType}
                                >
                                    <span className="material-icons-outlined">
                                        add
                                    </span>
                                    New ID Type
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
                                onEdit={handleEditIDType}
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
                        idTypeData={idTypeData}
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

export default IDType;
