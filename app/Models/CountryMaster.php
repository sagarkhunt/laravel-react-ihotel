<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountryMaster extends BaseModel
{
    use HasFactory;
    protected $table = 'country_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    public function getCity()
    {
        return $this->hasMany(CityMaster::class, 'state_id', 'id');
    }
    public function getState()
    {
        return $this->hasMany(StateMaster::class, 'country_id', 'id');
    }
}
