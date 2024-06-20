import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import actions from '../../../../redux/Location/actions';
import DeleteMdl from '../../../../components/common/DeleteMdl';
import DataTableComponent from '../../../../components/common/DataTableComponent';
import Spinner from '../../../../components/Spinner';

const City = ({ listingData, loader }) => {
    const columnsConfig = [
        { data: 'id', label: '#', className: 'table-left', width: '10%' },
        { data: 'name', label: 'City Name', width: '50%' },
        {
            data: 'country_id',
            label: 'Country',
            width: '15%',
        },
        {
            data: 'state_id',
            label: 'State',
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
    const [mode, setMode] = useState('Add City');
    const [cityData, setCityData] = useState([]);
    const [isDefault, setIsDefault] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const [delId, setDelId] = useState('');

    /**
     *
     * @param {handleSubmit} formData
     */
    function handleSubmit(formData) {
        if (mode === 'Add City') {
            dispatch({
                type: actions.CITY_ADD,
                payload: formData,
            });
        } else {
            const updatedFormData = {
                ...formData,
                name: formData.name,
                city_id: formData.id,
                is_default: isDefault,
            };
            dispatch({
                type: actions.CITY_UPDATE,
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
        const cityId = {
            city_id: delId,
        };
        dispatch({
            type: actions.CITY_DELETE,
            payload: cityId,
        });
        setShowDel(false);
    };

    return (
        <>
            <div className="row m-0">
                <div className="col-12  action-header">
                    <div className="row m-0">
                        <div className="col-4 d-flex align-items-center p-1">
                            <h5 className="headline-h6m mb-0 p-1">City</h5>
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
                                // onClick={handleAddBusinessResource}
                            >
                                <span className="material-icons-outlined">
                                    add
                                </span>
                                New City
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
                            // onEdit={handleEditBusinessResource}
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

export default City;
