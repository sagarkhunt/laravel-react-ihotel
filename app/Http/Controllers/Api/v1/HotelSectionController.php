<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\SectionMaster;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelSectionController extends BaseApiController
{
    # Get Section Details
    public function getSection()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getSection = SectionMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getSection, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Floor
    public function createSection(Request $request)
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

            $chkFloorName = SectionMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Section Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The Floor with same " . $msg4 . " Already Exists");
            } else {
                $creaetSection = SectionMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'description' => $request["description"],
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($creaetSection, 'Floor Data added successfully');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Floor
    public function updateSection(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if ((isset($request["section_id"]) && $request["section_id"] != "" && $request["section_id"] != null)) {
                $section_id = $request["section_id"];

                $duplicate = 0;
                $msg1 = "";

                $chkUserName = SectionMaster::where('name', $request['name'])->where('id', '!=', $section_id)->count();
                if ($chkUserName > 0) {
                    $duplicate = 1;
                    $msg1 = " Section Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "The Floor with same " . $msg4 . " Already Exists");
                } else {

                    $section_Edit = SectionMaster::where('hotel_id', $hotel_id)->where('id', $section_id)->first();

                    $section_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $section_Edit->name);
                    $section_Edit->description = (isset($request['description']) ? (empty($request['description']) ? "" : $request['description']) : $section_Edit->description);
                    $section_Edit->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $section_Edit->status);
                    $section_Edit->updated_by = $user_id;;
                    $section_Edit->updated_at = date('Y-m-d H:i:s');
                    $section_Edit->update();
                    return $this->sendResponse($section_Edit, 'Section Data updated successfully.');
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
