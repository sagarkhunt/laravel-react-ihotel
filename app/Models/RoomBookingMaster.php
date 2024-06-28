<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RoomBookingMaster extends BaseModel
{
    protected $table = 'kn_room_booking_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    // protected $fillable = [
    //     'hotel_id',
    //     'fy_id',
    //     'group_id',
    //     'guest_id',
    //     'frm_dt',
    //     'to_dt',
    //     'block_type',
    //     'block_status',
    //     'nor',
    //     'non',
    //     'bsns_src_id',
    //     'booking_src_id',
    //     'guest_name',
    //     'guest_mobile',
    //     'guest_json',
    //     'room_json',
    //     'pax_json',
    //     'sp_req_json',
    //     'sp_remarks',
    //     'created_by',
    //     'updated_by',
    // ];

    protected $casts = [
        'frm_dt' => 'date',
        'to_dt' => 'date',
    ];

    public function roomInventory(): HasMany
    {
        return $this->hasMany(RoomInventoryMaster::class, 'ref_id', 'id');
    }
    public function roomAdvPayment(): HasMany
    {
        return $this->hasMany(BookingPayment::class, 'rbm_id', 'id');
    }
}
