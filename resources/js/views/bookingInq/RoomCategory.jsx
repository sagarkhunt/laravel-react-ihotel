import React, { useEffect, useState } from 'react';
const RoomCategory = ({ category, index, handleInputChange, dropDownData }) => {
    return (
        <tr key={index}>
            <td className="td-custom">
                <div className="input-group">
                    <select
                        className="form-select custom-input"
                        value={category.room_cat_id}
                        onChange={(e) =>
                            handleInputChange(e, index, 'room_cat_id')
                        }
                    >
                        {/* <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option> */}
                        {dropDownData?.room_cate &&
                        dropDownData?.room_cate.length > 0 ? (
                            dropDownData?.room_cate.map((roomCategory) => (
                                <option
                                    key={roomCategory.id || roomCategory.id}
                                    value={roomCategory.id || roomCategory.id}
                                >
                                    {roomCategory.name || roomCategory.cat_name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                No Room Categories Available
                            </option>
                        )}
                    </select>
                </div>
            </td>
            <td className="td-custom">
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control custom-input text-end"
                        value={category.no_of_rooms}
                        onChange={(e) =>
                            handleInputChange(e, index, 'no_of_rooms')
                        }
                        placeholder="00"
                    />
                </div>
            </td>
            <td className="td-custom">
                <div className="input-group">
                    <select
                        className="form-select custom-input"
                        value={category.room_plan_id}
                        onChange={(e) =>
                            handleInputChange(e, index, 'room_plan_id')
                        }
                    >
                        {/* <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option> */}
                        {dropDownData?.rooms_plan &&
                        dropDownData?.rooms_plan.length > 0 ? (
                            dropDownData?.rooms_plan.map((roomPlan) => (
                                <option
                                    key={roomPlan.id || roomPlan.id}
                                    value={roomPlan.id || roomPlan.id}
                                >
                                    {roomPlan.plan_name || roomPlan.plan_name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                No Room Categories Available
                            </option>
                        )}
                    </select>
                </div>
            </td>
            <td className="td-custom">
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control custom-input text-end offered_rate"
                        value={category.offered_rate}
                        onChange={(e) =>
                            handleInputChange(e, index, 'offered_rate')
                        }
                        placeholder="00"
                    />
                </div>
            </td>
        </tr>
    );
};

export default RoomCategory;
