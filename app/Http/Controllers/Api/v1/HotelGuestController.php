<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\GuestClassMaster;
use App\Models\GuestMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelGuestController extends BaseApiController
{
    /**
     * get a Guest in storage.
     */
    public function getGuest(Request $request)
    {
        $guestList = GuestMaster::all();
        return $this->sendResponse($guestList, "");
    }

    /**
     * get a Guest in storage.
     */
    public function getGuestDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guest_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }

        $guest_id = $request->input('guest_id');

        $guests = GuestMaster::find($guest_id);

        if (!$guests) {
            return response()->json(['message' => 'Guest not found.'], 404);
        }

        return $this->sendResponse(['guest' => $guests], '');
    }

    /**
     * Store a newly created Guest in storage.
     */
    public function createGuest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:200',
            'email' => 'required|string|email|unique:guest_master',
            'mobile' => 'string|max:20',
            'address' => 'required|string|max:255',
            'city_id' => 'integer',
            'pincode' => 'numeric'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }

        $guest = GuestMaster::create($request->all());

        return $this->sendResponse(['guest_id' => $guest->id], 'Guest created successfully.');
    }

    /**
     * Store a newly created Guest in storage.
     */
    public function updateGuest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guest_id' => 'required',
            'name' => 'string|max:200',
            'email' => 'required|string|email|unique:guest_master',
            'mobile' => 'string|max:20',
            'address' => 'required|string|max:255',
            'city_id' => 'integer',
            'pincode' => 'numeric'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }

        $guest_id = $request->input('guest_id');
        $guest = GuestMaster::find($guest_id);

        if (!$guest) {
            return $this->sendError("Guest not found.");
        }

        $guest->update($request->all());

        return $this->sendResponse(['guest_id' => $guest->id], 'Guest updated successfully.');
    }
    # Get Guest Details
    public function getGuestClass()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = GuestClassMaster::where('hotel_id', $hotel_id)->get();
            if (count($getFloor) > 0) {
                return $this->sendResponse($getFloor, 'Get Guest Data Successfully');
            } else {
                return $this->sendResponse($getFloor, 'No Data Found!');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Guest
    public function createGuestClass(Request $request)
    {
        $rule = [
            'name' => 'string|max:100',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Required Parameter are Missing.', ['errors' => $validate->errors()]);
        }
        try {
            $user = Auth::user();
            $auth_user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $duplicate = 0;
            $msg1 = "";

            $chkFloorName = GuestClassMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Guest Class Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The" . $msg4 . " Already Exists");
            } else {
                $createFloor = GuestClassMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createFloor, 'Guest Class created successfully.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Guest
    public function updateGuestClass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guest_class_id' => 'required',
            'name' => 'string|max:200',
            'status' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }
        try {

            $user = Auth::user();
            $user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            if ((isset($request["guest_class_id"]) && $request["guest_class_id"] != "" && $request["guest_class_id"] != null)) {
                $guest_class_id = $request["guest_class_id"];
                $duplicate = 0;
                $msg1 = "";

                $chkGuestName = GuestClassMaster::where('name', $request['name'])->where('id', '!=', $guest_class_id)->count();
                if ($chkGuestName > 0) {
                    $duplicate = 1;
                    $msg1 = " Guest Class Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "Guest Class Name " . $msg4 . " Already Exists");
                } else {

                    $guest_Edit = GuestClassMaster::where('id', $guest_class_id)->where('hotel_id', $hotel_id)->first();
                    if ($guest_Edit) {
                        $guest_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $guest_Edit->name);
                        $guest_Edit->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $guest_Edit->status);
                        $guest_Edit->updated_by = $user_id;;
                        $guest_Edit->updated_at = date('Y-m-d H:i:s');
                        $guest_Edit->update();
                        return $this->sendResponse($guest_Edit, 'Guest Class updated successfully.');
                    } else {
                        return $this->sendResponse('fail', 'Guest Class not found.');
                    }
                }
                // }
            } else {
                return $this->sendResponse('fail', 'Required parameters missing.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    /**
     * Delete Guest
     */
    public function deleteGuestClass(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (isset($request["guest_class_id"]) && $request["guest_class_id"] != "" && $request["guest_class_id"] != null) {

                $deleteUser = GuestClassMaster::whereIn('id', is_array($request['guest_class_id']) ? $request['guest_class_id'] : [$request['guest_class_id']])->delete();

                return $this->sendResponse($deleteUser, 'Guest deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Required Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }
}
