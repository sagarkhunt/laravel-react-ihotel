<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Base\BaseModel;

class UserRole extends BaseModel
{
    use HasFactory;
    protected $table = 'user_role';

}
