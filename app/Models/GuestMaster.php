<?php

namespace App\Models;

use App\Models\Base\BaseModel;

class GuestMaster extends BaseModel
{
    protected $table = 'kn_guest_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    protected $fillable = [
        'full_name',
        'email',
        'mobile',
        'address',
        'city_id',
        'pincode',
        'created_by',
        'updated_by',
    ];
}
