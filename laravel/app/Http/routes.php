<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/**
 * ------------------------------
 * Define Normal User Side Routes
 * ------------------------------
 */

Route::get('/','FrontEndController@LoadHome');



/**
 * ----------------------------------
 * Define ALl Admin Panel Side Routes
 * ----------------------------------
 */
Route::get('/AdminPanel','AdminController@LoadAdminHome');

Route::post('/AdminPanel/ChangeSideTab','AdminController@ChangeSideTab');
Route::post('/AdminPanel/SaveProduct','AdminController@SaveProduct');
