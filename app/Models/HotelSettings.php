<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelSettings extends BaseModel
{
    use HasFactory;

    protected $table = 'hotel_settings';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
