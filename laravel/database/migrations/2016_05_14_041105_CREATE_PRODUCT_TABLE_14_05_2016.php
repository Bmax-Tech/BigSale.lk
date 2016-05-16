<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CREATEPRODUCTTABLE14052016 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->increments('id');
            $table->string('category');
            $table->string('sub_category');
            $table->string('product_name');
            $table->string('product_brand');
            $table->longText('description');
            $table->string('price');
            $table->longText('features');
            $table->string('guarantee');
            $table->string('rating');
            $table->string('in_stock');
            $table->integer('added_user');
            $table->string('approve_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('product');
    }
}
