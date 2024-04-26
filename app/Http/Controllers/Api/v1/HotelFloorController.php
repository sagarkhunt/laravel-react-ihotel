<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Helpers\Helper;
use App\Models\FloorMaster;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class HotelFloorController extends BaseApiController
{
    # Get Floor Details
    public function getFloor()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = FloorMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getFloor, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Floor
    public function createFloor(Request $request)
    {
        $rule = [
            'name' => 'required',
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

            $chkFloorName = FloorMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Floor Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Floor with same " . $msg4 . " Already Exists");
            } else {
                FloorMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'description' => $request["description"],
                    'status' => $request['status'] == 'false' ? 0 : 1,
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse('success', 'Floor Data added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Floor
    public function updateFloor(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["floor_id"]) && $request["floor_id"] != "" && $request["floor_id"] != null)) {
                $floor_id = $request["floor_id"];
                // $user_name = $request["user_name"];
                // if (strlen($user_name) < 6 || strlen($user_name) > 16) {
                //     return $this->sendError('fail', 'The lenght User Name should be more than 6 and less than 16 characters.');
                // } else {

                $duplicate = 0;
                $msg1 = "";

                $chkUserName = FloorMaster::where('name', $request['name'])->where('id', '!=', $floor_id)->count();
                if ($chkUserName > 0) {
                    $duplicate = 1;
                    $msg1 = " Floor Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "The Floor with same " . $msg4 . " Already Exists");
                } else {

                    $floor_Edit = FloorMaster::where('id', $floor_id)->where('hotel_id', $hotel_id)->first();

                    $floor_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $floor_Edit->name);
                    $floor_Edit->description = (isset($request['description']) ? (empty($request['description']) ? "" : $request['description']) : $floor_Edit->description);
                    $floor_Edit->status = (isset($request['status']) ? ($request['status'] == 'false' ? 0 : 1) : $floor_Edit->status);
                    $floor_Edit->updated_by = $user_id;;
                    $floor_Edit->updated_at = date('Y-m-d H:i:s');
                    $floor_Edit->update();
                    return $this->sendResponse($floor_Edit, 'Floor Data updated successfully.');
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
}
