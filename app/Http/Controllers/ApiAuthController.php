<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Users;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class ApiAuthController extends Controller
{
 
 

public function __construct(Users $user){
$this->middleware('cors');
$this->user = $user;

}

 public function userAuth(Request $request){
 $credentials=$request->only('userName', 'password');
 
 
         $token = null;

        try {
            $token =JWTAuth::attempt($credentials);
            if (!$token) {
                return response()->json(['invalid_email_or_password'], 422);
            }
        } catch (JWTAuthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

	
	public function register(Request $request)
    {
        $newUser = $this->user->create([
            'firstName' => $request->get('firstName'),
            'lastName' => $request->get('lastName'),
			'userName' => $request->get('userName'),
            'password' => bcrypt($request->get('password')),
			'program' => $request->get('program'),
			'role' => $request->get('role')
        ]);

        if (!$newUser) {
            return response()->json(['failed_to_create_new_user'], 500);
        }

        return response()->json([
            'token' =>JWTAuth::fromUser($newUser)
        ]);
    }

    public function getAuthUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->userAuth()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }
    
}