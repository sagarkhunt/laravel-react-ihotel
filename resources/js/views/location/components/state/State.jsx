import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import actions from '../../../../redux/Location/actions';
import DeleteMdl from '../../../../components/common/DeleteMdl';
import DataTableComponent from '../../../../components/common/DataTableComponent';
import Spinner from '../../../../components/Spinner';
import CreateEditMdl from './CreateEditMdl';

const State = ({ listingData, loader }) => {
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        {
            data: 'name',
            label: 'State Name',
            width: '50%',
            render: function (data, type, row) {
                if (row.is_default) {
                    return `
                    <span class="d-flex align-items-center gap-2">
                    ${data} <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.113 8.11536L13.1213 7.5987L10.7796 2.08203L8.43796 7.60703L2.44629 8.11536L6.99629 12.057L5.62962 17.9154L10.7796 14.807L15.9296 17.9154L14.5713 12.057L19.113 8.11536ZM10.7796 13.2487L7.64629 15.1404L8.47962 11.5737L5.71296 9.1737L9.36296 8.85703L10.7796 5.4987L12.2046 8.86536L15.8546 9.18203L13.088 11.582L13.9213 15.1487L10.7796 13.2487Z"
                        fill="#0863B5"
                    />{' '}
                </svg> </span>`;
                } else {
                    return data;
                }
            },
        },
        {
            data: 'country.name',
            label: 'Country',
            width: '15%',
        },
        {
            data: 'get_city_count',
            label: 'City',
            width: '15%',
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
            console.log(formData);
            console.log({ ...formData, name: formData.name });
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
