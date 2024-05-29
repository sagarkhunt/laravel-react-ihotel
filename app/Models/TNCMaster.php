<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TNCMaster extends BaseModel
{
    use HasFactory;
    protected $table = 'tnc_master';
    public $timestamps = true;
    protected $connection = 'ihotel';

    /**
     * Get the tnc_details
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    // protected function tncDetails(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn ($value) => json_decode($value, true),
    //         set: fn ($value) => is_array($value) ? json_encode($value) : $value,
    //     );
    // }
}
