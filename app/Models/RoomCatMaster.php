<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomCatMaster extends BaseModel
{
    use HasFactory;

    protected $table = 'room_cat_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    public function cateRoom(): HasMany
    {
        return $this->hasMany(RoomMaster::class, 'room_cat_id', 'id')->select('id', 'room_no', 'room_cat_id');
    }
}
