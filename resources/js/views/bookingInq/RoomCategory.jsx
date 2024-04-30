import React from 'react';

const RoomCategory = ({ category, index, handleInputChange }) => {
    return (
        <tr key={index}>
            <td className="td-custom">
                <div className="input-group">
                    <select
                        className="form-select custom-input"
                        value={category.roomCatId}
                        onChange={(e) =>
                            handleInputChange(e, index, 'roomCatId')
                        }
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </td>
            <td className="td-custom">
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control custom-input text-end"
                        value={category.noOfRooms}
                        onChange={(e) =>
                            handleInputChange(e, index, 'noOfRooms')
                        }
                        placeholder="00"
                    />
                </div>
            </td>
            <td className="td-custom">
                <div className="input-group">
                    <select
                        className="form-select custom-input"
                        value={category.roomPlanId}
                        onChange={(e) =>
                            handleInputChange(e, index, 'roomPlanId')
                        }
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </td>
            <td className="td-custom">
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control custom-input text-end offered_rate"
                        value={category.offeredRate}
                        onChange={(e) =>
                            handleInputChange(e, index, 'offeredRate')
                        }
                        placeholder="00"
                    />
                </div>
            </td>
        </tr>
    );
};

export default RoomCategory;
