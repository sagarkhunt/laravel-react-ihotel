<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\MarketSegmentMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelMrktSegmentController extends BaseApiController
{
    # Get Market segment Details
    public function getMarketSegment()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = MarketSegmentMaster::where('hotel_id', $hotel_id)->get();
            if (count($getFloor) > 0) {
                return $this->sendResponse($getFloor, 'Get Market Segment Data Successfully');
            } else {
                return $this->sendResponse($getFloor, 'No Data Found!');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Cerate Market segment
    public function createMarketSegment(Request $request)
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

            $chkSegmentName = MarketSegmentMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkSegmentName > 0) {
                $duplicate = 1;
                $msg1 = " Market Segment Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The" . $msg4 . " Already Exists");
            } else {
                $createFloor = MarketSegmentMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createFloor, 'Market Segment created successfully.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Market segment
    public function updateMarketSegment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mrkt_sgmt_id' => 'required',
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
            if ((isset($request["mrkt_sgmt_id"]) && $request["mrkt_sgmt_id"] != "" && $request["mrkt_sgmt_id"] != null)) {
                $mrkt_sgmt_id = $request["mrkt_sgmt_id"];
                $duplicate = 0;
                $msg1 = "";

                $chkSalesName = MarketSegmentMaster::where('name', $request['name'])->where('id', '!=', $mrkt_sgmt_id)->count();
                if ($chkSalesName > 0) {
                    $duplicate = 1;
                    $msg1 = "Market Segment Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "Market Segment Name " . $msg4 . " Already Exists");
                } else {

                    $mrkt_sgmt_Edit = MarketSegmentMaster::where('id', $mrkt_sgmt_id)->where('hotel_id', $hotel_id)->first();
                    if ($mrkt_sgmt_Edit) {
                        $mrkt_sgmt_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $mrkt_sgmt_Edit->name);
                        $mrkt_sgmt_Edit->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $mrkt_sgmt_Edit->status);
                        $mrkt_sgmt_Edit->updated_by = $user_id;;
                        $mrkt_sgmt_Edit->updated_at = date('Y-m-d H:i:s');
                        $mrkt_sgmt_Edit->update();
                        return $this->sendResponse($mrkt_sgmt_Edit, 'Market segment updated successfully.');
                    } else {
                        return $this->sendResponse('fail', 'Market segment not found.');
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
     * Delete Market segment
     */
    public function deleteMarketSegment(Request $request)
    {
        $user = Auth::user();
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (isset($request["mrkt_sgmt_id"]) && $request["mrkt_sgmt_id"] != "" && $request["mrkt_sgmt_id"] != null) {

                $deleteUser = MarketSegmentMaster::whereIn('id', is_array($request['mrkt_sgmt_id']) ? $request['mrkt_sgmt_id'] : [$request['mrkt_sgmt_id']])->delete();

                return $this->sendResponse($deleteUser, 'Market segment deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Market Segment Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }
}
