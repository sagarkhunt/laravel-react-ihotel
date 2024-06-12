<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdTypeMaster extends BaseModel
{
    use HasFactory;
    protected $table = 'id_type_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
