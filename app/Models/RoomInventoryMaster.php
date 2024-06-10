<?php

namespace App\Models;

use App\Models\Base\BaseModel;

class RoomInventoryMaster extends BaseModel
{
    protected $table = 'kn_room_inv_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    protected $fillable = [
        'rbm_id', // RoomBookingMaster ID
        'hotel_id',
        'fy_id',
        'prev_id',
        'ref_id',
        'guest_id',
        'dt',
        'room_cat_id',
        'room_id',
        'nor',
        'pax',
        'rate_plan_id',
        'room_rate',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'dt' => 'date',
        'check_in' => 'date',
        'check_out' => 'date',
    ];
}