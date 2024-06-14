<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingPayment extends BaseModel
{
    use HasFactory;
    protected $table = 'booking_payment';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
