<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingInq extends BaseModel
{
    use HasFactory;

    protected $table = 'booking_inq';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
