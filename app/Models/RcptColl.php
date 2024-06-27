<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RcptColl extends BaseModel
{
    use HasFactory;
    protected $table = 'rcpt_coll';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
