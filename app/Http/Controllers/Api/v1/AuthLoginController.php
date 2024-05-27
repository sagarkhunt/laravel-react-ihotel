<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthLoginController extends BaseApiController
{
    public function login(Request $request)
    {

        $data = [
            'user_name' => $request['user_name'],
            'password' => $request['password']
        ];

        try {
            //code...
            if (!Auth::attempt($data)) {
                return response()->json(['message' => 'Invalid credentials'], 422);
            }
            $userDetails = array();
            $auth_user = Auth::user();
            $accesstoken = $auth_user->createToken('API TOKEN')->plainTextToken;;
            $userDetails['token'] = $accesstoken;
            $userDetails['isAuthenticated'] = true;
            $userDetails['user'] = $auth_user;
            // $request->session()->regenerate();

            return $this->sendResponse($userDetails, "Login Successfully!s");
        } catch (Exception $e) {
            dd($e);
        }
    }

    public function register(Request $request)
    {

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'user_name' => ['required', 'string', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'user_name' => $request['user_name'],
            'mobile' => $request['mobile_no'],
            'hotel_id' => 1,
            'role_id' => 1,
            'password' => Hash::make($request['password']),
        ]);
        // $accesstoken = $user->createToken('API TOKEN')->plainTextToken;;

        // $userDetails['token'] = $accesstoken;
        $userDetails['isAuthenticated'] = true;
        $userDetails['user'] = $user;
        return $this->sendResponse($userDetails, "Register Successfully!s");
        // return new UserResource($user);
    }

    public function registernew(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $request->session()->regenerate();
        return response()->json(['data' => $user], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(["message" => "User successfully logged out"], 204);
    }


    public function getUser()
    {

        try {
            $user = Auth::user();
            $data = array();
            $data['isAuthenticated'] = true;
            $data['user'] = Auth::user();
            return $this->sendResponse($data, 'Success');
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function verifyToken(Request $request)
    {
        $user = auth()->user();

        if ($user) {
            // The token is valid, and the user is authenticated
            return response()->json([
                'message' => 'You are authorized.',
                'isValid' => true
            ]);
        } else {
            // Token is invalid or user is not authenticated
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
