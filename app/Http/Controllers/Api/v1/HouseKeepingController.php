<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\RoomCatMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HouseKeepingController extends BaseApiController
{
    public function getCateRoom()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $careRoomData = RoomCatMaster::with(['cateRoom'])
                ->where('hotel_id', $hotel_id)
                ->select('id', 'cat_name')
                ->get();

            if ($careRoomData->isEmpty()) {
                return $this->sendError('No Data Found', 'No housekeeping category rooms found.');
            }

            return $this->sendResponse($careRoomData, 'Get HouseKeeping cate room successful!');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
}
