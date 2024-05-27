<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\BookingSource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelBookingSourceController extends BaseApiController
{
    /*****************************************Booking Source Master*******************************************/
    # Get Floor Details
    public function getBooSou()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getBookingList = BookingSource::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getBookingList, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    # Cerate Floor
    public function createBooSou(Request $request)
    {
        //  dd($request->all());
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

            $chkFloorName = BookingSource::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Booking Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Inquiry type with same " . $msg4 . " Already Exists");
            } else {
                $createInq = BookingSource::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'status' => 1,
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createInq, 'Booking Source added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    public function updateBooSou(Request $request)
    {

        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["booking_sou_id"]) && $request["booking_sou_id"] != "" && $request["booking_sou_id"] != null)) {
                $booking_sou_id = $request["booking_sou_id"];

                $chkBusDel = BookingSource::where('hotel_id', $hotel_id)->where('id', $booking_sou_id)->first();
                if (empty($chkBusDel)) {
                    return $this->sendResponse('fail', "The business source id is wrong");
                } else {
                    $chkBusDel->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $chkBusDel->name);
                    $chkBusDel->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $chkBusDel->status);
                    $chkBusDel->updated_by = $user_id;;
                    $chkBusDel->updated_at = date('Y-m-d H:i:s');

                    $chkBusDel->update();

                    return $this->sendResponse($chkBusDel, 'Booking Source updated successfully.');
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
    #Delete Inq Type
    public function deleteBooSou(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);

        try {
            if (isset($request["booking_sou_id"]) && $request["booking_sou_id"] != "" && $request["booking_sou_id"] != null) {

                // $deleteTable = RoomViewMaster::find($request["inq_id"])->delete();
                $deleteBusDel = BookingSource::whereIn('id', is_array($request['booking_sou_id']) ? $request['booking_sou_id'] : [$request['booking_sou_id']])->delete();
                return $this->sendResponse($deleteBusDel, 'Booking Source deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Required Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendResponse('fail', 'Something went wrong');
        }
    }
}
