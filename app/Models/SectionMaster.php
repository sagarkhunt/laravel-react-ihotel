<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionMaster extends BaseModel
{
    use HasFactory;
    protected $table = 'section_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
