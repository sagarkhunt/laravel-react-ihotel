<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\RoomCatMaster;
use App\Models\RoomMaster;
use App\Models\RoomPlanMaster;
use App\Models\RoomViewMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelRoomController extends BaseApiController
{
    # Get Room list
    public function getRoom()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getSection = RoomMaster::with(['roomCate', 'roomSection', 'roomFloor'])->where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getSection, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
            // Log::debug($e->getMessage());
            // return $this->sendResponse('fail', 'Something went wrong.');
        }
    }


    # Cerate Room
    public function createRoom(Request $request)
    {

        $rule = [
            'room_no' => 'required|string',
            'room_cat_id' => 'required|numeric',
            'section_id' => 'required|numeric',
            'floor_id' => 'required|numeric',
            'base_occu' => 'required|numeric',
            'base_rate' => 'required',
            'extra_person_charge' => 'required',
            'room_size' => 'required',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        // dd($request->all());
        try {
            $user = Auth::user();
            $auth_user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $duplicate = 0;
            $msg1 = "";

            $chkPlanName = RoomMaster::where('room_no', $request["room_no"])->where('hotel_id', $hotel_id)->count();

            if ($chkPlanName > 0) {
                $duplicate = 1;
                $msg1 = " Room Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Amnt with same " . $msg4 . " Already Exists");
            } else {
                // dd((isset($request['status']) ? ($request['status'] == 'true' ? 1 : $request['status']) : 0));
                $createRoom = RoomMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'room_no' => $request["room_no"],
                    'room_cat_id' => $request["room_cat_id"],
                    'section_id' => $request["section_id"],
                    'floor_id' => $request["floor_id"],
                    'room_desc' => $request["room_desc"] ?? '',
                    'room_size' => $request["room_size"] ?? '',
                    'room_view_id' => $request["room_view_id"] ?? 0,
                    'base_occu' => $request["base_occu"] ?? 0,
                    'extra_occu' => $request["extra_occu"] ?? 0,
                    'max_adult' => $request["max_adult"] ?? 0,
                    'max_child' => $request["max_child"] ?? 0,
                    'max_extra_bed' => $request["max_extra_bed"] ?? 0,
                    'base_rate' => $request["base_rate"],
                    'extra_person_charge' => $request["extra_person_charge"],
                    'extra_bed_charge' => $request["extra_bed_charge"],
                    'room_amnts_ids' => $request["room_amnts_ids"] ?? 0,
                    'status' => (isset($request['status']) ? ($request['status'] == 'true' ? 1 : $request['status']) : 0),
                    'room_status_id' => 0,
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                if ($request['action'] == 'save_and_duplicate') {
                    // dd($createRoom);
                    $room = RoomMaster::findOrFail($createRoom);

                    // Replicate the room
                    $newRoom = $room->replicate();

                    // Optionally modify any attributes before saving
                    // For example:
                    // $newRoom->room_no = 'New Room Number';

                    // Save the replicated room
                    $newRoom->save();
                }
                return $this->sendResponse('success', 'Room Data added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Floor
    public function updateRoom(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        $rule = [
            'room_no' => 'required|string',
            'room_cat_id' => 'required|numeric',
            'section_id' => 'required|numeric',
            'floor_id' => 'required|numeric',
            'base_occu' => 'required|numeric',
            'base_rate' => 'required',
            'extra_person_charge' => 'required',
            'room_size' => 'required',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        try {
            $room_id = $request["room_id"];

            $Room_Edit = RoomMaster::where('hotel_id', $hotel_id)->where('id', $room_id)->first();
            if ($Room_Edit) {
                $Room_Edit->room_no = (isset($request['room_no']) ? (empty($request['room_no']) ? "" : $request['room_no']) : $Room_Edit->room_no);
                $Room_Edit->room_amnts_ids = (isset($request['room_amnts_ids']) ? (empty($request['room_amnts_ids']) ? "" : $request['room_amnts_ids']) : $Room_Edit->room_amnts_ids);
                $Room_Edit->room_cat_id = (isset($request['room_cat_id']) ? (empty($request['room_cat_id']) ? "" : $request['room_cat_id']) : $Room_Edit->room_cat_id);
                $Room_Edit->section_id = (isset($request['section_id']) ? (empty($request['section_id']) ? "" : $request['section_id']) : $Room_Edit->section_id);
                $Room_Edit->floor_id = (isset($request['floor_id']) ? (empty($request['floor_id']) ? "" : $request['floor_id']) : $Room_Edit->floor_id);
                $Room_Edit->room_desc = (isset($request['room_desc']) ? (empty($request['room_desc']) ? "" : $request['room_desc']) : $Room_Edit->room_desc);
                $Room_Edit->room_size = (isset($request['room_size']) ? (empty($request['room_size']) ? "" : $request['room_size']) : $Room_Edit->room_size);
                $Room_Edit->room_view_id = (isset($request['room_view_id']) ? (empty($request['room_view_id']) ? 0 : $request['room_view_id']) : $Room_Edit->room_view_id);
                $Room_Edit->base_occu = (isset($request['base_occu']) ? (empty($request['base_occu']) ? 0.00 : $request['base_occu']) : $Room_Edit->base_occu);
                $Room_Edit->extra_occu = (isset($request['extra_occu']) ? (empty($request['extra_occu']) ? 0.00 : $request['extra_occu']) : $Room_Edit->extra_occu);
                $Room_Edit->max_adult = (isset($request['max_adult']) ? (empty($request['max_adult']) ? 0.00 : $request['max_adult']) : $Room_Edit->max_adult);
                $Room_Edit->max_child = (isset($request['max_child']) ? (empty($request['max_child']) ? 0.00 : $request['max_child']) : $Room_Edit->max_child);
                $Room_Edit->max_extra_bed = (isset($request['max_extra_bed']) ? (empty($request['max_extra_bed']) ? 0.00 : $request['max_extra_bed']) : $Room_Edit->max_extra_bed);
                $Room_Edit->base_rate = (isset($request['base_rate']) ? (empty($request['base_rate']) ? 0.00 : $request['base_rate']) : $Room_Edit->base_rate);
                $Room_Edit->extra_person_charge = (isset($request['extra_person_charge']) ? (empty($request['extra_person_charge']) ? 0.00 : $request['extra_person_charge']) : $Room_Edit->extra_person_charge);
                $Room_Edit->extra_bed_charge = (isset($request['extra_bed_charge']) ? (empty($request['extra_bed_charge']) ? 0.00 : $request['extra_bed_charge']) : $Room_Edit->extra_bed_charge);
                $Room_Edit->status = (isset($request['status']) ? ($request['status'] == 1 ? 1 : 0) : $Room_Edit->status);
                $Room_Edit->updated_by = $user_id;;
                $Room_Edit->updated_at = date('Y-m-d H:i:s');

                $Room_Edit->update();
                return $this->sendResponse($Room_Edit, 'Room Data updated successfully.');
            } else {
                return $this->sendResponse('fail', 'Room id is wrong');
            }
        } catch (\Exception $e) {
            dd($e);
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    // Get Room cate detilas
    public function getCatDetails(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            $cateDetails = RoomCatMaster::where('id', $request['id'])->where('hotel_id', $hotel_id)->first();
            if ($cateDetails) {
                return $this->sendResponse($cateDetails, 'Room Data');
            } else {
                return $this->sendResponse('fail', 'Category id is wrong');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    public function createMultiRoom(Request $request)
    {
        try {
            Helper::change_database();
            $user = Auth::user();
            $user_id = $user->id;
            $hotel_id = $user->hotel_id;
            $roomsName = [];

            // Set multiple roome name and prefix and Suffix start_no to_number
            if ($request['m_rooms_name'] == 'room_name') {
                $roomsName = explode(',', $request->input('m_room_no'));
            } else {
                $startNumber = $request['m_start_no']; // Start number
                $endNumber = $request['m_to_no']; // End number
                $room_prefix = $request['m_room_prefix'];
                $room_suffix = $request['m_room_suffix'];
                for ($i = $startNumber; $i <= $endNumber; $i++) {
                    $roomsName[] = $room_prefix . $i . $room_suffix;
                }
            }
            $addedRoom = [];
            foreach ($roomsName as $room) {
                $reqTableLabel = $room;

                $existingRoomCount = RoomMaster::where('hotel_id', $hotel_id)
                    ->where('room_no', $reqTableLabel)->count();
                if ($existingRoomCount === 0) {
                    $newRoom = new RoomMaster();
                    $newRoom->hotel_id = $hotel_id;
                    $newRoom->room_no = $reqTableLabel;
                    $newRoom->room_desc = $request['m_room_desc'];
                    $newRoom->room_cat_id = $request['m_room_cat_id'];
                    $newRoom->floor_id = $request['m_section_id'];
                    $newRoom->section_id = $request['m_floor_id'];
                    $newRoom->status = (isset($request['status']) ? ($request['status'] == 'true' ? 1 : $request['status']) : 0);
                    $newRoom->room_status_id = 0;
                    $newRoom->created_by = $user_id;
                    $newRoom->save();
                    $addedRoom[] = $reqTableLabel;
                } else {
                    $existingRoom[] = $reqTableLabel;
                }
            }
            return $this->sendResponse($addedRoom, 'Room added successfully.');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    /*****************************************Room Plan**************************************/
    # Get Room Plan list
    public function getRoomPlan()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getRoomPlan = RoomPlanMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getRoomPlan, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Room PLan
    public function createRoomPlan(Request $request)
    {

        $rule = [
            'plan_name' => 'required|string',
            'plan_code' => 'required|string'
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        // dd($request->all());
        try {
            $user = Auth::user();
            $auth_user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $duplicate = 0;
            $msg1 = "";

            $chkPlanName = RoomPlanMaster::where('plan_name', $request["plan_name"])->where('hotel_id', $hotel_id)->count();

            if ($chkPlanName > 0) {
                $duplicate = 1;
                $msg1 = " Room Plan Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Plan with same " . $msg4 . " Already Exists");
            } else {
                // dd((isset($request['status']) ? ($request['status'] == 'true' ? 1 : $request['status']) : 0));
                RoomPlanMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'plan_name' => $request["plan_name"],
                    'plan_code' => $request["plan_code"],
                    'plan_desc' => $request["plan_desc"],
                    'status' => (isset($request['status']) ? ($request['status'] == 'flase' ? 0 : 1) : 0),
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse('success', 'Room Plan added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Room Plan
    public function updateRoomPlan(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        $rule = [
            'plan_name' => 'required|string',
            'plan_code' => 'required|string'
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        try {
            $room_plan_id = $request["room_plan_id"];

            $Room_Edit = RoomPlanMaster::where('hotel_id', $hotel_id)->where('id', $room_plan_id)->first();
            if ($Room_Edit) {
                $Room_Edit->plan_name = (isset($request['plan_name']) ? (empty($request['plan_name']) ? "" : $request['plan_name']) : $Room_Edit->plan_name);
                $Room_Edit->plan_code = (isset($request['plan_code']) ? (empty($request['plan_code']) ? "" : $request['plan_code']) : $Room_Edit->plan_code);
                $Room_Edit->plan_desc = (isset($request['plan_desc']) ? (empty($request['plan_desc']) ? "" : $request['plan_desc']) : $Room_Edit->plan_desc);

                $Room_Edit->status = (isset($request['status']) ? ($request['status'] == 1 ? 1 : 0) : $Room_Edit->status);
                $Room_Edit->updated_by = $user_id;;
                $Room_Edit->updated_at = date('Y-m-d H:i:s');

                $Room_Edit->update();
                return $this->sendResponse($Room_Edit, 'Room Plan updated successfully.');
            } else {
                return $this->sendResponse('fail', 'Room  plam id is wrong');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    /*****************************************Room View**************************************/

    # Get Room View list
    public function getRoomView()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getRoomView = RoomViewMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getRoomView, 'Room view list');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Room View
    public function createRoomView(Request $request)
    {

        $rule = [
            'room_view' => 'required|string',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        // dd($request->all());
        try {
            $user = Auth::user();
            $auth_user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $duplicate = 0;
            $msg1 = "";

            $chkPlanName = RoomViewMaster::where('room_view', $request["room_view"])->where('hotel_id', $hotel_id)->count();

            if ($chkPlanName > 0) {
                $duplicate = 1;
                $msg1 = " Room View Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The room view with same " . $msg4 . " Already Exists");
            } else {
                $createRoomView = RoomViewMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'room_view' => $request["room_view"],
                    'desc' => $request["desc"],
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createRoomView, 'Room Plan added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Room View
    public function updateRoomView(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        $rule = [
            'room_view' => 'required|string',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        try {
            $room_plan_id = $request["room_view_id"];
            $Room_Edit = RoomViewMaster::where('hotel_id', $hotel_id)->where('id', $room_plan_id)->first();

            if ($Room_Edit) {
                $Room_Edit->room_view = (isset($request['room_view']) ? (empty($request['room_view']) ? "" : $request['room_view']) : $Room_Edit->room_view);
                $Room_Edit->desc = (isset($request['desc']) ? (empty($request['desc']) ? "" : $request['desc']) : $Room_Edit->desc);
                $Room_Edit->status = (isset($request['status']) ? ($request['status'] == 1 ? 1 : 0) : $Room_Edit->status);
                $Room_Edit->updated_by = $user_id;
                $Room_Edit->updated_at = date('Y-m-d H:i:s');

                $Room_Edit->update();
                return $this->sendResponse($Room_Edit, 'Room Plan updated successfully.');
            } else {
                return $this->sendResponse('fail', 'Room  plam id is wrong');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    #Delete room Plan
    public function deleteRoomView(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);

        try {
            if (isset($request["room_view_id"]) && $request["room_view_id"] != "" && $request["room_view_id"] != null) {

                $deleteTable = RoomViewMaster::find($request["room_view_id"])->delete();

                return $this->sendResponse('', 'Room View deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Required Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendResponse('fail', 'Something went wrong');
        }
    }
}
