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
/*
Route::get('/', function () {
    return view('welcome');
});
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
  return view('index');
});

Route::delete('API/Admin/{id}', ['uses' => 'UsersController@destroy','middleware'=>'cors']);

//Route::delete('API/Admin/{id}','UsersController@destroy');

Route::get('API/Admin', 'UsersController@index');

Route::resource('/Admin', 'UsersController');
Route::post('/auth_login','ApiAuthController@userAuth');

Route::post('api/register', 'ApiAuthController@register');
Route::get('api/authenticate/user', 'ApiAuthController@getAuthUser');