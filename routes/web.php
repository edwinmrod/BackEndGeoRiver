<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('API/Admin', 'UsersController@index');

Route::delete('API/Admin/{id}','UsersController@destroy');
Route::resource('/Admin', 'UsersController');
