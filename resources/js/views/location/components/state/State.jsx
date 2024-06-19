import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import actions from '../../../../redux/Location/State/actions';
import DeleteMdl from '../../../../components/common/DeleteMdl';
import DataTableComponent from '../../../../components/common/DataTableComponent';
import Spinner from '../../../../components/Spinner';
import CreateEditMdl from './CreateEditMdl';

const State = () => {
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        { data: 'name', label: 'State Name', width: '50%' },
        {
            data: 'country_id',
            label: 'Country',
            width: '15%',
        },
        {
            data: null,
            label: 'City',
            width: '15%',
            render: () => `
        <span>50</span>`,
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

    const dispatch = useDispatch();
    const { loader, stateListData, stateCreated, stateUpdate, stateDelete } =
        useSelector((state) => state?.stateReducer);

    const [listingData, setListingData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add State');
    const [stateData, setStateData] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        if (mode === 'Add State') {
            dispatch({
                type: actions.STATE_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                ...formData,
                name: formData.name,
                state_id: formData.id,
                country_id: formData.country_id,
                is_default: formData.is_default,
            };
            dispatch({
                type: actions.STATE_UPDATE,
                payload: updatedFormData,
            });
        }
        setOpen(false);
    }
    /***
     * @param {handleAddResource}
     */
    function handleAddResource() {
        setMode('Add State');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditResource} resource
     */
    function handleEditResource(resource) {
        setMode('Edit State');
        setStateData(resource);
        setOpen(true);
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
        const stateId = {
            state_id: delId,
        };
        dispatch({
            type: actions.STATE_DELETE,
            payload: stateId,
        });
        setShowDel(false);
    };

    useEffect(() => {
        setListingData(stateListData);
    }, [stateListData]);

    useEffect(() => {
        dispatch({
            type: actions.STATE_LIST,
        });
    }, [stateCreated, stateDelete, stateUpdate]);

    return (
        <>
            <div className="row m-0">
                <div className="col-12  action-header">
                    <div className="row mx-0">
                        <div className="col-4 d-flex align-items-center p-1">
                            <h5 className="headline-h6m mb-0 p-1">State</h5>
                        </div>
                        <div className="col-8 gap-3 action-right">
                            <div className="form-group  position-relative search-container">
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
                                className="btn btn-primary d-flex "
                                onClick={handleAddResource}
                            >
                                <span className="material-icons-outlined">
                                    add
                                </span>
                                New State
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
                            onEdit={handleEditResource}
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
                    data={stateData}
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
        </>
    );
};

export default State;
