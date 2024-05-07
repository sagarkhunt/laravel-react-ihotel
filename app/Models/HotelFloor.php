<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelFloor extends BaseModel
{
    use HasFactory;
    
    protected $table = 'hotel_floors';
    public $timestamps = true;

    protected $connection = 'ihotel';
}
