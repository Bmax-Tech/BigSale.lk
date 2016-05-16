<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'id',
        'category',
        'sub_category',
        'product_name',
        'product_brand',
        'description',
        'price',
        'features',
        'guarantee',
        'rating',
        'in_stock',
        'added_user',
        'approve_status',
        'created_at',
        'updated_at'
    ];

    public $timestamps = false;
    protected $table = 'product';
}
