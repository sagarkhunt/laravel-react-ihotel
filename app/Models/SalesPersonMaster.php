<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesPersonMaster extends BaseModel
{
    use HasFactory;

    protected $table = 'salse_person_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
