<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\BookingSource;
use App\Models\BusinessSource;
use App\Models\FloorMaster;
use App\Models\RoomCatMaster;
use App\Models\RoomMaster;
use App\Models\RoomPlanMaster;
use App\Models\RoomViewMaster;
use App\Models\SalesPersonMaster;
use App\Models\SectionMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HotelLoginSyncController extends BaseApiController
{
    public function getLoginSyncData(Request $request)
    {

        $response = new \stdClass();
        $response->status = 0;

        Helper::change_database();
        $user = Auth::user();
        $hotel_id = $user->hotel_id;

        $pq = array();

        try {
            if ((isset($request["sync_req"]) && $request["sync_req"] != "" && $request["sync_req"] != null)) {
                $sync_req = explode(",", $request["sync_req"]);
                # Room category
                if (in_array("room_cate", $sync_req)) {
                    $tax_templates = RoomCatMaster::where('hotel_id', $hotel_id)
                        ->select('id', 'cat_name')
                        ->get();
                    $data['room_cate'] = $tax_templates;
                }
                # Floor
                if (in_array("hotel_floor", $sync_req)) {

                    $taxes = FloorMaster::where('hotel_id', $hotel_id)->select('id', 'name')->get();

                    $data['hotel_floor'] = $taxes;
                }

                # Section
                if (in_array("hotel_section", $sync_req)) {

                    $get_menu_cat = SectionMaster::where('hotel_id', $hotel_id)
                        ->select('id', 'name')
                        ->get();

                    $data['hotel_section'] = $get_menu_cat;
                }
                if (in_array("rooms", $sync_req)) {

                    $get_menu_cat = RoomMaster::where('hotel_id', $hotel_id)
                        ->select('id', 'room_no')
                        ->get();

                    $data['rooms'] = $get_menu_cat;
                }
                if (in_array("rooms_view", $sync_req)) {

                    $get_menu_cat = RoomViewMaster::where('hotel_id', $hotel_id)
                        ->select('id', 'room_view')
                        ->get();

                    $data['rooms_view'] = $get_menu_cat;
                }
                if (in_array("rooms_plan", $sync_req)) {

                    $get_menu_cat = RoomPlanMaster::where('hotel_id', $hotel_id)
                        ->select('id', 'plan_name')
                        ->get();

                    $data['rooms_plan'] = $get_menu_cat;
                }
                if (in_array("bsns_src", $sync_req)) {

                    $get_bsns_src = BusinessSource::where('hotel_id', $hotel_id)
                        ->select('id', 'name')
                        ->get();

                    $data['bsns_src'] = $get_bsns_src;
                }
                if (in_array("booking_src", $sync_req)) {

                    $get_booking_src = BookingSource::where('hotel_id', $hotel_id)
                        ->select('id', 'name')
                        ->get();

                    $data['booking_src'] = $get_booking_src;
                }
                if (in_array("sls_prsn", $sync_req)) {

                    $get_sls_prsn = SalesPersonMaster::where('hotel_id', $hotel_id)
                        ->select('id', 'name')
                        ->get();

                    $data['sls_prsn'] = $get_sls_prsn;
                }
                if (in_array("mrkt_sgmnt", $sync_req)) {

                    $get_mrkt_sgmnt = SalesPersonMaster::where('hotel_id', $hotel_id)
                        ->select('id', 'name')
                        ->get();

                    $data['mrkt_sgmnt'] = $get_mrkt_sgmnt;
                }
                return $this->sendResponse($data, "");
            } else {
                return $this->sendResponse('fail', 'Parameter Missing');
            }
        } catch (\Exception $e) {
            dd($e);
            Log::debug($e->getMessage());
            return $this->sendResponse('fail', 'Something went wrong');
        }
    }
}
