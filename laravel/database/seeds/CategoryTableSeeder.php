<?php

use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category')->insert([
            'category' => "Electronics",
            'sub_category' => "Gaming",
            'features' => str_random(10),
            'created_at' => new DateTime()
        ]);
    }
}
