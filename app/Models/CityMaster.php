<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CityMaster extends BaseModel
{
    use HasFactory;
    protected $table = 'city_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    public function country(): HasOne
    {
        return $this->hasOne(CountryMaster::class, 'id', 'country_id')->select('id', 'name');
    }
    public function state(): HasOne
    {
        return $this->hasOne(StateMaster::class, 'id', 'state_id')->select('id', 'name');
    }
}
