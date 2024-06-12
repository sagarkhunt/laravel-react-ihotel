<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarketSegmentMaster extends Model
{
    use HasFactory;
    protected $table = 'market_segment_master';
    public $timestamps = true;
    protected $connection = 'ihotel';
}
