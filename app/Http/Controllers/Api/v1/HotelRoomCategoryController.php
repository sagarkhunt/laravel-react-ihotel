<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\RoomCatMaster;
use App\Models\RoomMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelRoomCategoryController extends BaseApiController
{
    # Get Floor Details
    public function getRoomCat()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getSection = RoomCatMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getSection, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
            // Log::debug($e->getMessage());
            // return $this->sendResponse('fail', 'Something went wrong.');
        }
    }


    # Cerate Room cate
    public function createRoomCat(Request $request)
    {

        $rule = [
            'cat_name' => 'required|string',
            'short_name' => 'required|string',
            'short_name' => 'required|string',
            'base_rate' => 'required',
            'qty' => 'required',
            'extra_person_charge' => 'required',
            'base_occu' => 'required',
            'room_size' => 'required',
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

            $chkFloorName = RoomCatMaster::where('cat_name', $request["cat_name"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Category Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Amnt with same " . $msg4 . " Already Exists");
            } else {

                $createRoomCate = RoomCatMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'cat_name' => $request["cat_name"],
                    'short_name' => $request["short_name"],
                    'description' => $request["description"],
                    'base_occu' => $request["base_occu"] ?? 0,
                    'max_occu' => $request["max_occu"] ?? 0,
                    'max_adult' => $request["max_adult"] ?? 0,
                    'max_child' => $request["max_child"] ?? 0,
                    'qty' => $request["qty"] ?? 0,
                    'room_amnts_ids' => $request["room_amnts_ids"] ?? 0,
                    'max_extra_bed' => $request["max_extra_bed"] ?? 0,
                    'base_rate' => $request["base_rate"],
                    'extra_person_charge' => $request["extra_person_charge"],
                    'extra_bed_charge' => $request["extra_bed_charge"],
                    'room_size' => $request["room_size"] ?? '',
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createRoomCate, 'Category Data added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update room cat
    public function updateRoomCat(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        $rule = [
            'cat_name' => 'required|string',
            'short_name' => 'required|string',
            'short_name' => 'required|string',
            'base_rate' => 'required|numeric',
            'extra_person_charge' => 'required|numeric',
            'base_occu' => 'required|numeric',
            // 'cat_id' => 'required|numeric'
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        try {
            // if ((isset($request["amnt_id"]) && $request["amnt_id"] != "" && $request["amnt_id"] != null)) {
            $cat_id = $request["id"];

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

            $Cate_Edit = RoomCatMaster::where('hotel_id', $hotel_id)->where('id', $cat_id)->first();
            if ($Cate_Edit) {
                $Cate_Edit->cat_name = (isset($request['cat_name']) ? (empty($request['cat_name']) ? "" : $request['cat_name']) : $Cate_Edit->cat_name);
                $Cate_Edit->room_amnts_ids = (isset($request['room_amnts_ids']) ? (empty($request['room_amnts_ids']) ? "" : $request['room_amnts_ids']) : $Cate_Edit->room_amnts_ids);
                $Cate_Edit->short_name = (isset($request['short_name']) ? (empty($request['short_name']) ? "" : $request['short_name']) : $Cate_Edit->short_name);
                $Cate_Edit->description = (isset($request['description']) ? (empty($request['description']) ? "" : $request['description']) : $Cate_Edit->description);
                $Cate_Edit->base_occu = (isset($request['base_occu']) ? (empty($request['base_occu']) ? 0.00 : $request['base_occu']) : $Cate_Edit->base_occu);
                $Cate_Edit->max_occu = (isset($request['max_occu']) ? (empty($request['max_occu']) ? 0.00 : $request['max_occu']) : $Cate_Edit->max_occu);
                $Cate_Edit->max_adult = (isset($request['max_adult']) ? (empty($request['max_adult']) ? 0.00 : $request['max_adult']) : $Cate_Edit->max_adult);
                $Cate_Edit->max_child = (isset($request['max_child']) ? (empty($request['max_child']) ? 0.00 : $request['max_child']) : $Cate_Edit->max_child);
                $Cate_Edit->max_extra_bed = (isset($request['max_extra_bed']) ? (empty($request['max_extra_bed']) ? 0.00 : $request['max_extra_bed']) : $Cate_Edit->max_extra_bed);
                $Cate_Edit->base_rate = (isset($request['base_rate']) ? (empty($request['base_rate']) ? 0.00 : $request['base_rate']) : $Cate_Edit->base_rate);
                $Cate_Edit->extra_person_charge = (isset($request['extra_person_charge']) ? (empty($request['extra_person_charge']) ? 0.00 : $request['extra_person_charge']) : $Cate_Edit->extra_person_charge);
                $Cate_Edit->extra_bed_charge = (isset($request['extra_bed_charge']) ? (empty($request['extra_bed_charge']) ? 0.00 : $request['extra_bed_charge']) : $Cate_Edit->extra_bed_charge);
                $Cate_Edit->room_size = (isset($request['room_size']) ? (empty($request['room_size']) ? 0.00 : $request['room_size']) : $Cate_Edit->room_size);
                $Cate_Edit->qty = (isset($request['qty']) ? (empty($request['qty']) ? 0 : $request['qty']) : $Cate_Edit->qty);
                $Cate_Edit->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $Cate_Edit->status);
                $Cate_Edit->updated_by = $user_id;;
                $Cate_Edit->updated_at = date('Y-m-d H:i:s');
                $Cate_Edit->update();
                return $this->sendResponse($Cate_Edit, 'Category Data updated successfully.');
            } else {
                return $this->sendResponse('fail', 'Category id is wrong');
            }

            // }
            // }
            // } else {
            //     return $this->sendResponse('fail', 'Required parameters missing.');
            // }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    // Get Room by category id
    public function getRoomsOnRoomCatId(Request $request)
    {

        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            $cateRoomDetails = RoomMaster::where('room_cat_id', $request['id'])->where('hotel_id', $hotel_id)
                ->select('id', 'room_no', 'room_cat_id')
                ->get();
            if ($cateRoomDetails) {
                return $this->sendResponse($cateRoomDetails, 'Category Room Data updated successfully.');
            } else {
                return $this->sendResponse('fail', 'Room Category id is wrong');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    /**
     * Delete Room Category
     */
    public function deleteRoomCat(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        // dd($request->all());
        try {
            if (isset($request["cate_id"]) && $request["cate_id"] != "" && $request["cate_id"] != null) {
                // $deleteBookingInq = BookingInq::where('id', $request['cate_id'])->delete();
                $deleteRoomCate = RoomCatMaster::whereIn('id', is_array($request['cate_id']) ? $request['cate_id'] : [$request['cate_id']])->delete();

                return $this->sendResponse($deleteRoomCate, 'Room Cate deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Required Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }
}
