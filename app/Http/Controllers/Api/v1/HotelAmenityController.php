<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\RoomAmntsMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelAmenityController extends BaseApiController
{

    # Get Amenity Details
    public function getAmenity()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getSection = RoomAmntsMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getSection, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
            // Log::debug($e->getMessage());
            // return $this->sendResponse('fail', 'Something went wrong.');
        }
    }


    # Cerate Floor
    public function createAmenity(Request $request)
    {
        $rule = [
            'amnt' => 'required|string',
            'amnt_icon' => 'required|string',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        try {
            $user = Auth::user();
            $auth_user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $duplicate = 0;
            $msg1 = "";

            $chkFloorName = RoomAmntsMaster::where('amnt', $request["amnt"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Amenity Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Amnt with same " . $msg4 . " Already Exists");
            } else {

                $createAmnt = RoomAmntsMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'amnt' => $request["amnt"],
                    'charge' => $request["charge"] ?? 0.00,
                    'description' => $request["description"],
                    'amnt_icon' => $request["amnt_icon"],
                    // 'status' => $request['status'] == 'false' ? 0 : 1,
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createAmnt, 'Amnt Data added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Floor
    public function updateAmenity(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["amnt_id"]) && $request["amnt_id"] != "" && $request["amnt_id"] != null)) {
                $amnt_id = $request["amnt_id"];

                // $duplicate = 0;
                // $msg1 = "";

                // $chkUserName = RoomAmntsMaster::where('amnt', $request['amnt'])->where('id', '!=', $amnt_id)->count();
                // if ($chkUserName > 0) {
                //     $duplicate = 1;
                //     $msg1 = " Amenity Name";
                // }

                // $msg4 = $msg1;

                // if ($duplicate != 0) {
                //     return $this->sendResponse('fail', "The Amnt with same " . $msg4 . " Already Exists");
                // } else {

                $Amnts_Edit = RoomAmntsMaster::where('id', $request["amnt_id"])->where('hotel_id', $hotel_id)->first();

                $Amnts_Edit->amnt = (isset($request['amnt']) ? (empty($request['amnt']) ? "" : $request['amnt']) : $Amnts_Edit->amnt);
                $Amnts_Edit->charge = (isset($request['charge']) ? (empty($request['charge']) ? 0.00 : $request['charge']) : $Amnts_Edit->charge);
                $Amnts_Edit->description = (isset($request['description']) ? (empty($request['description']) ? "" : $request['description']) : $Amnts_Edit->description);
                $Amnts_Edit->amnt_icon = (isset($request['amnt_icon']) ? (empty($request['amnt_icon']) ? "" : $request['amnt_icon']) : $Amnts_Edit->amnt_icon);
                $Amnts_Edit->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $Amnts_Edit->status);

                $Amnts_Edit->updated_by = $user_id;;
                $Amnts_Edit->updated_at = date('Y-m-d H:i:s');
                $Amnts_Edit->update();
                return $this->sendResponse($Amnts_Edit, 'Amnt Data updated successfully.');
                // }
                // }
            } else {
                return $this->sendResponse('fail', 'Required parameters missing.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
}
