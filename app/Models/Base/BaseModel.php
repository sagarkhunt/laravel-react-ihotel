<?php

namespace App\Models\Base;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;

class BaseModel extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    /**
     * Prepare a date for array / JSON serialization. add by ketan 15122023
     *
     * @param  \DateTimeInterface  $date
     * @return string
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
