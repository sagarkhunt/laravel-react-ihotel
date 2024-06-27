<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\RcptColl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelRcptCollectionController extends BaseApiController
{
    # Get Rcpt Details
    public function getRcpt()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = RcptColl::where('hotel_id', $hotel_id)->get();
            if (count($getFloor) > 0) {
                return $this->sendResponse($getFloor, 'Get Rcpt Data Successfully');
            } else {
                return $this->sendResponse($getFloor, 'No Data Found!');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Floor
    public function crRcpt(Request $request)
    {
        $rule = [
            'rcpt_type' => 'required',
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

            $chkFloorName = RcptColl::where('rcpt_type', $request["rcpt_type"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Rcpt Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Rcpt with same " . $msg4 . " Already Exists");
            } else {
                $createFloor = RcptColl::insertGetId([
                    'hotel_id' => $hotel_id,
                    'rcpt_type' => $request["rcpt_type"],
                    'is_show' => $request['is_show'] ?? 1,
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createFloor, 'Rcpt Data added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Floor
    public function updRcpt(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["rcpt_type_id"]) && $request["rcpt_type_id"] != "" && $request["rcpt_type_id"] != null)) {
                $rcpt_type_id = $request["rcpt_type_id"];
                // $user_name = $request["user_name"];
                // if (strlen($user_name) < 6 || strlen($user_name) > 16) {
                //     return $this->sendError('fail', 'The lenght User Name should be more than 6 and less than 16 characters.');
                // } else {

                $duplicate = 0;
                $msg1 = "";

                $chkUserName = RcptColl::where('rcpt_type', $request['rcpt_type'])->where('id', '!=', $rcpt_type_id)->count();
                if ($chkUserName > 0) {
                    $duplicate = 1;
                    $msg1 = " Rcpt Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "The Floor with same " . $msg4 . " Already Exists");
                } else {

                    $rcpt_Edit = RcptColl::where('id', $rcpt_type_id)->where('hotel_id', $hotel_id)->first();

                    $rcpt_Edit->rcpt_type = (isset($request['rcpt_type']) ? (empty($request['rcpt_type']) ? "" : $request['rcpt_type']) : $rcpt_Edit->rcpt_type);
                    $rcpt_Edit->is_show = (isset($request['is_show']) ? ($request['is_show'] == 0 ? 0 : 1) : $rcpt_Edit->is_show);
                    $rcpt_Edit->updated_by = $user_id;;
                    $rcpt_Edit->updated_at = date('Y-m-d H:i:s');
                    $rcpt_Edit->update();
                    return $this->sendResponse($rcpt_Edit, 'Floor Data updated successfully.');
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
     * Delete Floor
     */
    public function delRcpt(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (isset($request["rcpt_type_id"]) && $request["rcpt_type_id"] != "" && $request["rcpt_type_id"] != null) {
                // $deleteBookingInq = BookingInq::where('id', $request['rcpt_type_id'])->delete();
                $deleteUser = RcptColl::whereIn('id', is_array($request['rcpt_type_id']) ? $request['rcpt_type_id'] : [$request['rcpt_type_id']])->delete();

                return $this->sendResponse($deleteUser, 'Rcpt deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Required Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }
}
