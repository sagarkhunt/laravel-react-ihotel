<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomViewMaster extends Model
{
    use HasFactory;
    
    protected $table = 'room_view_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
