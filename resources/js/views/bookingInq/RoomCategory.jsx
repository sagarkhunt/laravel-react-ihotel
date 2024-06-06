import React, { useEffect, useState } from 'react';
const RoomCategory = ({ category, index, handleInputChange, dropDownData }) => {
    return (
        <tr key={index}>
            <td className="td-custom" style={{ width: '70%' }}>
                <div className="input-group">
                    <select
                        className="form-select custom-input dropdown123"
                        aria-label=".form-select-sm example"
                        value={category.room_cat_id}
                        onChange={(e) =>
                            handleInputChange(
                                e,
                                index,
                                'room_cat_id',
                                'room_cat_name',
                            )
                        }
                    >
                        <option value="">Select Category</option>
                        {dropDownData?.room_cate &&
                        dropDownData?.room_cate.length > 0 ? (
                            dropDownData?.room_cate.map((roomCategory) => (
                                <option
                                    key={roomCategory.id}
                                    value={roomCategory.id}
                                >
                                    {roomCategory.cat_name ||
                                        roomCategory.cat_name}
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
            <td className="td-custom" style={{ width: '30%' }}>
                <div className="">
                    <input
                        list="ice-cream-flavors"
                        id="base_occu"
                        name="base_occu"
                        value={category.no_of_rooms}
                        onChange={(e) =>
                            handleInputChange(e, index, 'no_of_rooms')
                        }
                        className="custom-input"
                        // style={{ marginBottom: '18px' }}
                    />
                    <datalist id="ice-cream-flavors" className="custom-input ">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </datalist>
                </div>
            </td>
            {/* <td className="td-custom">
                <div className="input-group">
                    <select
                        className="form-select custom-input"
                        value={category.room_plan_id}
                        onChange={(e) =>
                            handleInputChange(e, index, 'room_plan_id')
                        }
                    >
                        <option value="">Select Room Plan</option>
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
            </td> */}
            {/* <td className="td-custom">
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
            </td> */}
        </tr>
    );
};

export default RoomCategory;
