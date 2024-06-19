<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'rate_type_id',
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
    public function roomCat(): HasOne
    {
        return $this->hasOne(RoomCatMaster::class, 'id', 'room_cat_id')->select('id', 'cat_name');
    }

    public function roomPlan(): HasOne
    {
        return $this->hasOne(RoomPlanMaster::class, 'id', 'rate_type_id')->select('id', 'plan_name');
    }
}
