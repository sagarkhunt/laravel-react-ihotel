<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FloorMaster extends BaseModel
{
    use HasFactory;

    protected $table = 'floor_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
