<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product')->insert([
            'category' => "Electronics",
            'sub_category' => "Gaming",
            'product_name' => str_random(10),
            'product_brand' => str_random(10),
            'description' => str_random(10),
            'price' => str_random(10),
            'features' => str_random(10),
            'guarantee' => str_random(10),
            'rating' => str_random(10),
            'in_stock' => str_random(10),
            'added_user' => 1,
            'approve_status' => "YES",
            'created_at' => new DateTime()
        ]);
    }
}
