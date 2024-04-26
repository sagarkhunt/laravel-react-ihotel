<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Base\BaseModel;

class FyMaster extends BaseModel
{
    use HasFactory;
    protected $table = 'fy_master';
    public $timestamps = true;
    protected $connection = 'store';
}
