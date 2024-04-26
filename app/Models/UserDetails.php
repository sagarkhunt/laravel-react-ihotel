<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Base\BaseModel;

class UserDetails extends BaseModel
{
    use HasFactory;
    protected $connection = 'store';
    protected $table = 'user_details';
    public $timestamps = true;

    protected $fillable = [
        'user_id', 'user_name'
    ];
}
