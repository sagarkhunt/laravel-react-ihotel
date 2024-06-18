<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CityMaster extends BaseModel
{
    use HasFactory;
    protected $table = 'city_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
