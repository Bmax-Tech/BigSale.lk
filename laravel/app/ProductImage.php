<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'id',
        'product_id',
        'image_1',
        'image_2',
        'image_3',
        'image_4',
        'created_at',
        'updated_at'
    ];

    public $timestamps = false;
    protected $table = 'product_image';
}
