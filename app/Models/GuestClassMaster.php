<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuestClassMaster extends BaseModel
{
    use HasFactory;

    protected $table = 'guest_class_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    protected $fillable = [
        'hotel_id',
        'name',
        'status',
        'created_by',
        'updated_by',
    ];
}
