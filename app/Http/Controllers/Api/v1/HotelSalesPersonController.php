<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\SalesPersonMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelSalesPersonController extends BaseApiController
{
    # Get Guest Details
    public function getSalasePerson()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = SalesPersonMaster::where('hotel_id', $hotel_id)->get();
            if (count($getFloor) > 0) {
                return $this->sendResponse($getFloor, 'Get Sales Person Data Successfully');
            } else {
                return $this->sendResponse($getFloor, 'No Data Found!');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Guest
    public function createSalasePerson(Request $request)
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

            $chkFloorName = SalesPersonMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkFloorName > 0) {
                $duplicate = 1;
                $msg1 = " Salase Person Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The" . $msg4 . " Already Exists");
            } else {
                $createFloor = SalesPersonMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'status' => $request['status'],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createFloor, 'Sales Person created successfully.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Guest
    public function updateSalasePerson(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sls_psrn_id' => 'required',
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
            if ((isset($request["sls_psrn_id"]) && $request["sls_psrn_id"] != "" && $request["sls_psrn_id"] != null)) {
                $sls_psrn_id = $request["sls_psrn_id"];
                $duplicate = 0;
                $msg1 = "";

                $chkSalesName = SalesPersonMaster::where('name', $request['name'])->where('id', '!=', $sls_psrn_id)->count();
                if ($chkSalesName > 0) {
                    $duplicate = 1;
                    $msg1 = "Sales Person Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "Sales Person Name " . $msg4 . " Already Exists");
                } else {

                    $sls_prsn_Edit = SalesPersonMaster::where('id', $sls_psrn_id)->where('hotel_id', $hotel_id)->first();
                    if ($sls_prsn_Edit) {
                        $sls_prsn_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $sls_prsn_Edit->name);
                        $sls_prsn_Edit->status = (isset($request['status']) ? ($request['status'] == 0 ? 0 : 1) : $sls_prsn_Edit->status);
                        $sls_prsn_Edit->updated_by = $user_id;;
                        $sls_prsn_Edit->updated_at = date('Y-m-d H:i:s');
                        $sls_prsn_Edit->update();
                        return $this->sendResponse($sls_prsn_Edit, 'Sales Person updated successfully.');
                    } else {
                        return $this->sendResponse('fail', 'Sales Person not found.');
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
     * Delete Guest
     */
    public function deleteSalasePerson(Request $request)
    {
        $user = Auth::user();
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (isset($request["sls_psrn_id"]) && $request["sls_psrn_id"] != "" && $request["sls_psrn_id"] != null) {

                $deleteUser = SalesPersonMaster::whereIn('id', is_array($request['sls_psrn_id']) ? $request['sls_psrn_id'] : [$request['sls_psrn_id']])->delete();

                return $this->sendResponse($deleteUser, 'Sales Person deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Required Parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }
}
