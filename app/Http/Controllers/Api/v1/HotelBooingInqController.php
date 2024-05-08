<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\BookingInq;
use App\Models\InquiryMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelBooingInqController extends BaseApiController
{
    # Get Floor Details
    public function getBookingInq()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getBookingList = BookingInq::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getBookingList, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    # Cerate Floor
    public function createBookingInq(Request $request)
    {
        // dd($request->all());
        $rule = [
            'chk_in_dt' => 'required',
            'chk_out_dt' => 'required',
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

            $chkFloorName = BookingInq::where('cust_name', $request["cust_name"])->where('email', $request["email"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Customer Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Inquiry with same " . $msg4 . " Already Exists");
            } else {
                $roomReqJson = json_encode($request["room_req"]);
                BookingInq::insertGetId([
                    'hotel_id' => $hotel_id,
                    'chk_in_dt' => $request["chk_in_dt"],
                    'chk_out_dt' => $request["chk_out_dt"],
                    'room_req' => $roomReqJson,
                    'total' => $request["total"],
                    'cust_name' => $request["cust_name"],
                    'mobile' => $request["mobile_no"],
                    'email' => $request["email"],
                    'cust_cat_id' => $request["cust_cat_id"],
                    'adult' => $request["adult"],
                    'child' => $request["child"],
                    'sp_req' => $request["sp_req"],
                    'sp_remark' => $request["sp_remark"],
                    'status' => $request['status'] == 'false' ? 0 : 1,
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse('success', 'Booking inq Data added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    public function updateBookingInq(Request $request)
    {

        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["booking_inq_id"]) && $request["booking_inq_id"] != "" && $request["booking_inq_id"] != null)) {
                $booking_inq_id = $request["booking_inq_id"];

                $chkBookingInq = BookingInq::where('hotel_id', $hotel_id)->where('id', $booking_inq_id)->first();
                if (empty($chkBookingInq)) {
                    return $this->sendResponse('fail', "The booking inquiry id is wrong");
                } else {
                    $chkBookingInq->chk_in_dt = (isset($request['chk_in_dt']) ? (empty($request['chk_in_dt']) ? "" : $request['chk_in_dt']) : $chkBookingInq->chk_in_dt);
                    $chkBookingInq->chk_out_dt = (isset($request['chk_out_dt']) ? (empty($request['chk_out_dt']) ? "" : $request['chk_out_dt']) : $chkBookingInq->chk_out_dt);
                    $chkBookingInq->room_req = (isset($request['room_req']) ? (empty($request['room_req']) ? "" : $request['room_req']) : $chkBookingInq->room_req);
                    $chkBookingInq->cust_name = (isset($request['cust_name']) ? (empty($request['cust_name']) ? "" : $request['cust_name']) : $chkBookingInq->cust_name);
                    $chkBookingInq->mobile = (isset($request['mobile_no']) ? (empty($request['mobile_no']) ? "" : $request['mobile_no']) : $chkBookingInq->mobile_no);
                    $chkBookingInq->email = (isset($request['email']) ? (empty($request['email']) ? "" : $request['email']) : $chkBookingInq->email);
                    $chkBookingInq->cust_cat_id = (isset($request['cust_cat_id']) ? (empty($request['cust_cat_id']) ? "" : $request['cust_cat_id']) : $chkBookingInq->cust_cat_id);
                    $chkBookingInq->adult = (isset($request['adult']) ? (empty($request['adult']) ? "" : $request['adult']) : $chkBookingInq->adult);
                    $chkBookingInq->child = (isset($request['child']) ? (empty($request['child']) ? 0 : $request['child']) : $chkBookingInq->child);
                    $chkBookingInq->sp_req = (isset($request['sp_req']) ? (empty($request['sp_req']) ? "" : $request['sp_req']) : $chkBookingInq->sp_req);
                    $chkBookingInq->total = (isset($request['total']) ? (empty($request['total']) ? "" : $request['total']) : $chkBookingInq->total);
                    $chkBookingInq->status = (isset($request['status']) ? ($request['status'] == 'false' ? 0 : 1) : $chkBookingInq->status);
                    $chkBookingInq->updated_by = $user_id;;
                    $chkBookingInq->updated_at = date('Y-m-d H:i:s');

                    $chkBookingInq->update();
                    return $this->sendResponse('success', 'Booking Inq Data updated successfully.');
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


    /*****************************************Inq Typq Master*******************************************/
    # Get Floor Details
    public function getInqType()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getBookingList = InquiryMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getBookingList, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    # Cerate Floor
    public function createInqType(Request $request)
    {
        //  dd($request->all());
        $rule = [
            'inq_type' => 'required',
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

            $chkFloorName = InquiryMaster::where('inq_type', $request["inq_type"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Inquery Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Inquiry type with same " . $msg4 . " Already Exists");
            } else {
                $createInq = InquiryMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'inq_type' => $request["inq_type"],
                    'inq_desc' => $request["inq_desc"],
                    'status' => $request['status'] == 1 ? 1 : 0,
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createInq, 'Inquery Type added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    public function updateInqType(Request $request)
    {

        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["inq_type_id"]) && $request["inq_type_id"] != "" && $request["inq_type_id"] != null)) {
                $inq_type_id = $request["inq_type_id"];

                $chkInqType = InquiryMaster::where('hotel_id', $hotel_id)->where('id', $inq_type_id)->first();
                if (empty($chkInqType)) {
                    return $this->sendResponse('fail', "The booking inquiry id is wrong");
                } else {
                    $chkInqType->inq_type = (isset($request['inq_type']) ? (empty($request['inq_type']) ? "" : $request['inq_type']) : $chkInqType->inq_type);
                    $chkInqType->inq_desc = (isset($request['inq_desc']) ? (empty($request['inq_desc']) ? "" : $request['inq_desc']) : $chkInqType->inq_desc);
                    $chkInqType->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $chkInqType->status);
                    $chkInqType->updated_by = $user_id;;
                    $chkInqType->updated_at = date('Y-m-d H:i:s');

                    $chkInqType->update();
                    return $this->sendResponse($chkInqType, 'Inq Type updated successfully.');
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
