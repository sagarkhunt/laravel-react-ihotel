<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SampleDb extends BaseModel
{
    use HasFactory;
    protected $table = 'hotel_conn';
    public $timestamps = true;
}
