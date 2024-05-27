<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingSource extends Model
{
    use HasFactory;
    protected $table = 'booking_source_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
