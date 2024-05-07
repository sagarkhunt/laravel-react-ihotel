<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\FloorMaster;
use App\Models\RoomCatMaster;
use App\Models\RoomMaster;
use App\Models\RoomViewMaster;
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
