<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelUser extends BaseModel
{
    use HasFactory;
    protected $table = 'hotel_users';
    public $timestamps = true;

    protected $connection = 'ihotel';

    protected $hidden = [
        'password', 'remember_token',
    ];
}
