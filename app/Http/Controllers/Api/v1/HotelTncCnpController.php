<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\CPMaster;
use App\Models\SectionMaster;
use App\Models\TNCMaster;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelTncCnpController extends BaseApiController
{
    # Get Tnc Details
    public function getTnc()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getTnc = TNCMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getTnc, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Tnc
    public function createTnc(Request $request)
    {
        $rule = [
            'name' => 'required:max:20',
            'description' => 'required'
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

            $chkTncName = TNCMaster::where('tnc_name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkTncName > 0) {
                return $this->sendResponse('fail', "The Terms & Condition Name Already Exists");
            }

            $createTnc = TNCMaster::insertGetId([
                'hotel_id' => $hotel_id,
                'tnc_name' => $request["name"],
                'tnc_details' => $request["description"],
                'created_by' => $auth_user_id,
                'created_at' => Carbon::now()
            ]);
            return $this->sendResponse($createTnc, 'Terms & Condition added successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Floor
    public function updateTnc(Request $request)
    {
        $rule = [
            'tnc_id' => 'required|integer',
            'name' => 'required:max:20',
            'description' => 'required',
            'status' => 'required|in:1,0'
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

            $tnc_id = $request->input('tnc_id');

            $chkUserName = TNCMaster::where('tnc_name', $request['name'])->where('hotel_id', $hotel_id)->where('id', '!=', $tnc_id)->count();
            if ($chkUserName > 0) {
                return $this->sendResponse('fail', "The Terms & Condition Name Already Exists");
            }

            $getTnc = TNCMaster::where('hotel_id', $hotel_id)->where('id', $tnc_id)->first();

            $getTnc->tnc_name = $request['name'];
            $getTnc->tnc_details = $request['description'];
            $getTnc->status = $request['status'];
            $getTnc->updated_by = $auth_user_id;;
            $getTnc->updated_at = Carbon::now();
            $getTnc->save();

            return $this->sendResponse($getTnc, 'Terms & Condition updated successfully.');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    /**
     * Delete Tnc
     */
    public function deleteTnc(Request $request)
    {
        $rule = [
            'tnc_id' => 'required|integer',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        try {
            $user = Auth::user();
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);

            $tnc_id = $request->input('tnc_id');

            $deleteSection = TNCMaster::where('id', $tnc_id)->first();
            if (!$deleteSection) {
                return $this->sendResponse('fail', 'Invalid Terms & Condition ID!');
            }
            $deleteSection->delete();

            return $this->sendResponse($deleteSection, 'Terms & Condition Deleted successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Get Cp Details
    public function getCp()
    {
        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getCp = CPMaster::where('hotel_id', $hotel_id)->get();

            return $this->sendResponse($getCp, '');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    # Cerate Tnc
    public function createCp(Request $request)
    {
        $rule = [
            'name' => 'required:max:20',
            'description' => 'required'
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

            $chkTncName = CPMaster::where('cp_name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkTncName > 0) {
                return $this->sendResponse('fail', "The Cancellation Policy Name Already Exists");
            }

            $creaetTnc = CPMaster::insertGetId([
                'hotel_id' => $hotel_id,
                'cp_name' => $request["name"],
                'cp_details' => $request["description"],
                'created_by' => $auth_user_id,
                'created_at' => Carbon::now()
            ]);
            return $this->sendResponse($creaetTnc, 'Cancellation Policy added successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Floor
    public function updateCp(Request $request)
    {
        $rule = [
            'cp_id' => 'required|integer',
            'name' => 'required:max:20',
            'description' => 'required',
            'status' => 'required|in:1,0'
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

            $cp_id = $request->input('cp_id');

            $chkUserName = CPMaster::where('cp_name', $request['name'])->where('hotel_id', $hotel_id)->where('id', '!=', $cp_id)->count();
            if ($chkUserName > 0) {
                return $this->sendResponse('fail', "The Cancellation Policy Name Already Exists");
            }

            $getTnc = CPMaster::where('hotel_id', $hotel_id)->where('id', $cp_id)->first();

            $getTnc->cp_name = $request['name'];
            $getTnc->cp_details = $request['description'];
            $getTnc->status = $request['status'];
            $getTnc->updated_by = $auth_user_id;;
            $getTnc->updated_at = Carbon::now();
            $getTnc->save();

            return $this->sendResponse($getTnc, 'Cancellation Policy updated successfully.');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    /**
     * Delete Tnc
     */
    public function deleteCp(Request $request)
    {
        $rule = [
            'cp_id' => 'required|integer',
        ];

        $validate = Validator::make($request->all(), $rule);

        if ($validate->fails()) {
            return $this->sendError('Validation Error. Invalid Media!', ['errors' => $validate->errors()]);
        }
        try {
            $user = Auth::user();
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);

            $cp_id = $request->input('cp_id');

            $deleteSection = CPMaster::where('id', $cp_id)->first();
            if (!$deleteSection) {
                return $this->sendResponse('fail', 'Invalid Cancellation Policy ID!');
            }
            $deleteSection->delete();

            return $this->sendResponse($deleteSection, 'Cancellation Policy Deleted successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
}
