<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Users;
use Illuminate\Http\Request;
use Session;

class UsersController extends Controller
{


public function __construct(){
$this->middleware('cors');


}



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        //$users = users::paginate(25);
/**
		$user = Users::all();
 return response()->json(array(
 "users" => $user));
		 */
       // return response()->json(Users::all());
	   $data= Users::all();
	   //return response()->json(['success'=>true,'data'=>$data]);
	   //$result=Users::all();
	   //response()->json('data'->$result);
 return response()->json($data)->withCallback($request->input('callback'));;
	
	
	
	   //return $data;
	     //  return Users::orderBy('id', 'asc')->get();
		 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('API.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
	//$haber=json_decode($request);
        
        $requestData = $request->json()->all();
		
        $password=bcrypt($request->input('password'));
        $requestData['password'] = $password;
        
        users::create($requestData);

        //Session::flash('flash_message', 'users added!');

        return $requestData;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     *
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        $user = users::findOrFail($id);

       // return view('API.users.show', compact('user'));
		
		return $user;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     *
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $user = users::findOrFail($id);

        return view('API.users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update($id, Request $request)
    {
	
        
        $requestData = $request->json()->all();
        
		   $password=bcrypt($request->input('password'));
        $requestData['password'] = $password;
		
        $user = users::findOrFail($id);
		
        $user->update($requestData);

       // Session::flash('flash_message', 'users updated!');

        return 'funciono update';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy($id)
    {
        users::destroy($id);

     //   Session::flash('flash_message', 'users deleted!');

        //return redirect('API/users');
		$alo=Hash::make('123456');
		return $alo;
    }
}
