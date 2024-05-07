<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomMaster extends BaseModel
{
    use HasFactory;

    protected $table = 'room_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    public function roomCate()
    {
        return $this->belongsTo(RoomCatMaster::class, 'room_cat_id', 'id')->select('id', 'cat_name');
    }
    public function roomSection()
    {
        return $this->belongsTo(SectionMaster::class, 'section_id', 'id')->select('id', 'name');
    }
    public function roomFloor()
    {
        return $this->belongsTo(FloorMaster::class, 'floor_id', 'id')->select('id', 'name');
    }
}
