import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import actions from '../../../../redux/Location/actions';
import DeleteMdl from '../../../../components/common/DeleteMdl';
import DataTableComponent from '../../../../components/common/DataTableComponent';
import Spinner from '../../../../components/Spinner';
import CreateEditMdl from './CreateEditMdl';

const Country = ({ listingData, loader }) => {
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        { data: 'name', label: 'Country Name', width: '50%' },
        {
            data: null,
            label: 'State',
            width: '15%',
            render: () => `
            <span>15</span>`,
        },
        {
            data: 'null',
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

    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('Add Country');
    const [countryData, setCountryData] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');
    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        if (mode === 'Add Country') {
            dispatch({
                type: actions.COUNTRY_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                ...formData,
                name: formData.name,
                country_id: formData.id,
                is_default: formData.is_default,
            };

            dispatch({
                type: actions.COUNTRY_UPDATE,
                payload: updatedFormData,
            });
        }
        setOpen(false);
    }

    /***
     * @param {handleAddResource}
     */
    function handleAddResource() {
        setMode('Add Country');
        setOpen(true);
    }
    /**
     *
     * @param {handleEditResource} resource
     */
    function handleEditResource(resource) {
        setMode('Edit Country');
        setCountryData(resource);
        setOpen(true);
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
        const countryId = {
            country_id: delId,
        };
        dispatch({
            type: actions.COUNTRY_DELETE,
            payload: countryId,
        });
        setShowDel(false);
    };

    return (
        <>
            <div className="row m-0">
                <div className="col-12  action-header">
                    <div className="row mx-0">
                        <div className="col-4 d-flex align-items-center p-1">
                            <h5 className="headline-h6m mb-0 p-1">Country</h5>
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
                                Add Country
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
                    data={countryData}
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

export default Country;
