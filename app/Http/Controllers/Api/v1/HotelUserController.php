<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\HotelUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class HotelUserController extends BaseApiController
{
    # Get Users Details
    public function getUsers()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getMasterUsers = User::leftjoin('user_role', 'users.role_id', 'user_role.id')
                ->where('users.hotel_id', $hotel_id)
                ->select('users.*', 'user_role.name as role_name')
                ->get();

            $yess = [];
            for ($i = 0; $i < sizeof($getMasterUsers); $i++) {
                $getWorkingHr = HotelUser::where('id', $getMasterUsers[$i]->id)->first();

                if ($getWorkingHr) {
                    $yes['id'] = $getMasterUsers[$i]->id;
                    $yes['role_id'] = $getMasterUsers[$i]->role_id;
                    $yes['designation_id'] = $getWorkingHr->designation_id;
                    $yes['user_name'] = $getMasterUsers[$i]->user_name;
                    $yes['name'] = $getMasterUsers[$i]->name;
                    $yes['short_name'] = $getMasterUsers[$i]->sh_name;
                    $yes['email'] = $getMasterUsers[$i]->email;
                    $yes['mobile'] = $getMasterUsers[$i]->mobile;
                    $yes['IMEI'] = $getMasterUsers[$i]->IMEI;
                    $yes['status'] = $getMasterUsers[$i]->status;
                    $yes['address'] = $getWorkingHr->address;
                    $yes['pin'] = $getWorkingHr->pin;
                    $yes['city'] = $getWorkingHr->city;
                    $yess[] = $yes;
                }
            }
            $data = $yess;
            return $this->sendResponse($data, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
            // dd($e);
            // Log::debug($e->getMessage());
            // return $this->sendResponse('fail', 'Something went wrong.');
        }
    }


    # Cerate User
    public function createUser(Request $request)
    {
        // MainHelper::change_database();
        $response = new \stdClass();
        $response->status = 0;
        $response->message = "";

        $user = Auth::user();
        $auth_user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (
                (isset($request["name"]) && $request["name"] != "" && $request["name"] != null) &&
                (isset($request["user_name"]) && $request["user_name"] != "" && $request["user_name"] != null) &&
                (isset($request["mobile"]) && $request["mobile"] != "" && $request["mobile"] != null) &&
                (isset($request["password"]) && $request["password"] != "" && $request["password"] != null) &&
                (isset($request["designation_id"]) && $request["designation_id"] != "" && $request["designation_id"] != null)
            ) {
                $user_name = $request["user_name"];
                if (strlen($user_name) < 6 || strlen($user_name) > 16) {
                    return $this->sendResponse('fail', 'The lenght User Name should be more than 6 and less than 16 characters.');
                } else {
                    $duplicate = 0;
                    $msg1 = $msg2 = $msg3 = "";
                    if (isset($request["email"]) && $request["email"] != "" && $request["email"] != null) {
                        $chkMail = HotelUser::where('email', $request["email"])->count();
                        if ($chkMail > 0) {
                            $duplicate = 1;
                            $msg1 = "Email Id";
                        }
                    }


                    $chkMobile = HotelUser::where('mobile', $request["mobile"])->count();
                    if ($chkMobile > 0) {
                        $duplicate = 1;
                        $msg2 = " Mobile No";
                    }

                    $chkUserName = User::where('user_name', $user_name)->count();
                    if ($chkUserName > 0) {
                        $duplicate = 1;
                        $msg3 = " User Name";
                    }

                    $msg4 = $msg1 . $msg2 . $msg3;

                    if ($duplicate != 0) {
                        return $this->sendResponse('fail', "The User with same " . $msg4 . " Already Exists");
                    } else {
                        // dd($request["user_status"] == 'false' ? 0 : 1);
                        $getUserRole = true;
                        // $getUserRole = RestoDesignationMaster::where('resto_id', $resto_id)
                        // ->where('id', $request["designation_id"])
                        // ->select('default_role_id')
                        // ->first();

                        if ($getUserRole) {

                            $user_time_out = $request["user_time_out"] ?? 1440;

                            $getMasterUid = User::insertGetId([
                                'hotel_id' => $hotel_id,
                                'user_name' => $user_name,
                                'name' => $request["name"],
                                'sh_name' => $request["short_name"] ?? '',
                                'mobile' => $request["mobile"],
                                'email' => $request["email"],
                                'password' => Hash::make($request["password"]),
                                'role_id' => 1, //$getUserRole->default_role_id,
                                // 'is_att' => $request["is_att"] ?? 0,
                                'dlock' => $request["device_lock"] ?? 0,
                                // 'status' => $request["user_status"] == 'false' ? 0 : 1,
                                'status' => $request["user_status"],
                                'uto' => $user_time_out,
                                'created_by' => $auth_user_id,
                                'created_at' => date('Y-m-d H:i:s')
                            ]);

                            $getUserId = HotelUser::insertGetId([
                                'id' => $getMasterUid,
                                'hotel_id' => $hotel_id,
                                'name' => $request["name"],
                                'mobile' => $request["mobile"],
                                'address' => $request["address"],
                                'city' => $request["city"],
                                'email' => $request["email"],
                                'password' => Hash::make($request["password"]),
                                'role_id' => 1, //$getUserRole->default_role_id,
                                'designation_id' => $request["designation_id"],
                                // 'pin' => $request["pincode"],
                                'short_name' => $request["short_name"] ?? '',
                                'working_hr' => $request["working_hr"] ?? 0,
                                'status' => $request["user_status"],
                                'created_by' => $auth_user_id,
                                'created_at' => date('Y-m-d H:i:s')
                            ]);

                            #updating user rights
                            // LoginHelper::create_user_rights($getMasterUid, $resto_id);

                            // $getUser = $this->RestoUsers::where('id', $getMasterUid)->first();

                            return $this->sendResponse('success', 'User Data added successfully');
                        } else {
                            return $this->sendResponse('fail', 'Proper Designation missing');
                        }
                    }
                }
            } else {
                return $this->sendResponse('fail', 'Required parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
            // dd($e);
            // Log::debug($e->getMessage());
            // return $this->sendResponse('fail', 'Something went wrong.');
        }
    }

    # Update User
    public function updateUser(Request $request)
    {

        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["user_id"]) && $request["user_id"] != "" && $request["user_id"] != null) &&
                (isset($request["user_name"]) && $request["user_name"] != "" && $request["user_name"] != null)
            ) {

                $user_id = $request["user_id"];
                $flag = $request["flag"];

                $user_name = $request["user_name"];
                if (strlen($user_name) < 6 || strlen($user_name) > 16) {
                    return $this->sendError('fail', 'The lenght User Name should be more than 6 and less than 16 characters.');
                } else {

                    $duplicate = 0;
                    $msg1 = $msg2 = $msg3 = "";
                    if (isset($request["email"]) && $request["email"] != "" && $request["email"] != null) {
                        $chkMail = HotelUser::where('email', $request["email"])->where('id', '!=', $user_id)->count();
                        if ($chkMail > 0) {
                            $duplicate = 1;
                            $msg1 = "Email Id";
                        }
                    }


                    $chkMobile = HotelUser::where('mobile', $request["mobile"])->where('id', '!=', $user_id)->count();
                    if ($chkMobile > 0) {
                        $duplicate = 1;
                        $msg2 = " Mobile No";
                    }

                    $chkUserName = User::where('user_name', $user_name)->where('id', '!=', $user_id)->count();
                    if ($chkUserName > 0) {
                        $duplicate = 1;
                        $msg3 = " User Name";
                    }

                    $msg4 = $msg1 . $msg2 . $msg3;

                    if ($duplicate != 0) {
                        return $this->sendResponse('fail', "The User with same " . $msg4 . " Already Exists");
                    } else {

                        $Hotel_User_Edit = HotelUser::where('hotel_id', $hotel_id)->where('id', $user_id)->first();

                        $User_Edit = User::where('hotel_id', $hotel_id)->where('id', $user_id)->first();
                        $check_token_status = 0;

                        if ($request["password"] != '') {
                            $Hotel_User_Edit->password = Hash::make($request["password"]) ?? $Hotel_User_Edit->password;
                            $check_token_status = 1;
                        }
                        if (isset($request["status"])) {
                            if ($User_Edit->status != $request["status"]) {
                                $check_token_status = 1;
                            }
                        }

                        if (isset($request["device_lock"])) {
                            if ($User_Edit->dlock != $request["device_lock"]) {
                                $check_token_status = 1;
                            }
                        }

                        #check if designation changed coz in that case only user_rights will change

                        // if ($flag == 1) {

                        //     $check_token_status = 1;
                        //     $getUserRole = $this->RestoDesignationMaster::where('resto_id', $resto_id)
                        //         ->where('id', $request["designation_id"])
                        //         ->select('default_role_id')
                        //         ->first();

                        //     $User_Edit->role_id = $getUserRole->default_role_id;
                        // }
                        // dump($request['user_status']);
                        // dump($request['user_status'] == 'false' ? 0 : 1);
                        // dd((isset($request['user_status']) ? (empty($request['user_status']) == 'false' ? 0 : 1) : $User_Edit->status));
                        $User_Edit->user_name = (isset($request['user_name']) ? (empty($request['user_name']) ? "" : $request['user_name']) : $User_Edit->user_name);
                        $User_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $User_Edit->name);
                        $User_Edit->email = (isset($request['email']) ? (empty($request['email']) ? "" : $request['email']) : $User_Edit->email);
                        $User_Edit->mobile = (isset($request['mobile']) ? (empty($request['mobile']) ? "" : $request['mobile']) : $User_Edit->mobile);
                        $User_Edit->sh_name = (isset($request['short_name']) ? (empty($request['short_name']) ? "" : $request['short_name']) : $User_Edit->short_name);
                        $User_Edit->IMEI = (isset($request['IMEI']) ? (empty($request['IMEI']) ? "" : $request['IMEI']) : $User_Edit->IMEI);
                        // $User_Edit->status = (isset($request['user_status']) ? ($request['user_status'] == 'Active' ? 1 : 0) : $User_Edit->status);
                        $User_Edit->status = (isset($request['status']) ? ($request['status'] == 1 ? 1 : 0) : $User_Edit->status);
                        $User_Edit->uto = (isset($request['user_time_out']) ? (empty($request['user_time_out']) ? 0 : $request['user_time_out']) : $User_Edit->uto);
                        $User_Edit->dlock = (isset($request['device_lock']) ? (empty($request['device_lock']) ? 0 : $request['device_lock']) : $User_Edit->dlock);
                        // $User_Edit->is_att = (isset($request['is_att']) ? (empty($request['is_att']) ? 0 : $request['is_att']) : $User_Edit->is_att);
                        // $User_Edit->att_gf = (isset($request['att_gf']) ? (empty($request['att_gf']) ? 0.00 : $request['att_gf']) : $User_Edit->att_gf);
                        // $User_Edit->app_gf = (isset($request['app_gf']) ? (empty($request['app_gf']) ? 0.00 : $request['app_gf']) : $User_Edit->app_gf);
                        // $User_Edit->can_day_end = (isset($request['can_day_end']) ? (empty($request['can_day_end']) ? 0 : $request['can_day_end']) : $User_Edit->can_day_end);

                        if ($request["password"] != '') {
                            $User_Edit->password = Hash::make($request["password"]) ?? $User_Edit->password;
                        }


                        // $chk_notification = $User_Edit->notification == $request["notification"] ? 0 : 1;

                        // $User_Edit->notification = (isset($request["notification"]) ? (empty($request["notification"]) ? null : $request["notification"]) : $User_Edit->notification);

                        $User_Edit->updated_by = $user_id;;
                        $User_Edit->updated_at = date('Y-m-d H:i:s');
                        $User_Edit->update();

                        // if ($flag == 1) {
                        //     LoginHelper::create_user_rights($user_id, $resto_id);
                        // }

                        // $Hotel_User_Edit->role_id = $getUserRole->default_role_id ?? $Hotel_User_Edit->role_id;
                        $Hotel_User_Edit->role_id = 1;

                        $Hotel_User_Edit->designation_id = (isset($request['designation_id']) ? (empty($request['designation_id']) ? "" : $request['designation_id']) : $Hotel_User_Edit->designation_id);
                        $Hotel_User_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $Hotel_User_Edit->name);
                        $Hotel_User_Edit->mobile = (isset($request['mobile']) ? (empty($request['mobile']) ? "" : $request['mobile']) : $Hotel_User_Edit->mobile);
                        $Hotel_User_Edit->address = (isset($request['address']) ? (empty($request['address']) ? "" : $request['address']) : $Hotel_User_Edit->address);
                        $Hotel_User_Edit->city = (isset($request['city']) ? (empty($request['city']) ? "" : $request['city']) : $Hotel_User_Edit->city);
                        $Hotel_User_Edit->short_name = (isset($request['short_name']) ? (empty($request['short_name']) ? "" : $request['short_name']) : $Hotel_User_Edit->short_name);
                        $Hotel_User_Edit->email = (isset($request['email']) ? (empty($request['email']) ? "" : $request['email']) : $Hotel_User_Edit->email);
                        // $Hotel_User_Edit->status = (isset($request['status']) ? (empty($request['status']) ? 0 : $request['status']) : $Hotel_User_Edit->status);
                        $Hotel_User_Edit->working_hr = (isset($request['working_hr']) ? (empty($request['working_hr']) ? "" : $request['working_hr']) : $Hotel_User_Edit->working_hr);
                        $Hotel_User_Edit->pin = (isset($request['pincode']) ? (empty($request['pincode']) ? "" : $request['pincode']) : $Hotel_User_Edit->pin);

                        $Hotel_User_Edit->update();

                        // if ($chk_notification == 1) {
                        //     MiscHelper::UpdateUserNotification($resto_id, 0);
                        // }

                        // if ($check_token_status == 1) {

                        //     $token_data = DB::table('oauth_access_tokens')->where('user_id', $user_id)->delete();
                        // }                        
                        return $this->sendResponse($User_Edit, 'User Data updated successfully.');
                    }
                }
            } else {
                return $this->sendResponse('fail', 'Required parameters missing.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    public function deleteUser(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        // dd($request->all());
        try {
            if (isset($request["user_id"]) && $request["user_id"] != "" && $request["user_id"] != null) {
                // $deleteBookingInq = BookingInq::where('id', $request['user_id'])->delete();
                $deleteUser = User::whereIn('id', is_array($request['user_id']) ? $request['user_id'] : [$request['user_id']])->delete();

                return $this->sendResponse($deleteUser, 'User deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Required Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }
}
