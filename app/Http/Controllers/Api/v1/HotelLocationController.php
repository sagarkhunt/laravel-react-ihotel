<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\CityMaster;
use App\Models\CountryMaster;
use App\Models\StateMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelLocationController extends BaseApiController
{
    ##################### Country ################## 
    public function getCountry()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = CountryMaster::where('hotel_id', $hotel_id)->get();
            if (count($getFloor) > 0) {
                return $this->sendResponse($getFloor, 'Get Country Data Successfully');
            } else {
                return $this->sendResponse($getFloor, 'No Data Found!');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Cerate Country
    public function createCountry(Request $request)
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

            $chkSegmentName = CountryMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkSegmentName > 0) {
                $duplicate = 1;
                $msg1 = "Country Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The" . $msg4 . " Already Exists");
            } else {
                $createState = CountryMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createState, 'Country created successfully.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update Country
    public function updateCountry(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'country_id' => 'required',
            'name' => 'string|max:200',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }
        try {

            $user = Auth::user();
            $user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            if ((isset($request["country_id"]) && $request["country_id"] != "" && $request["country_id"] != null)) {
                $country_id = $request["country_id"];
                $duplicate = 0;
                $msg1 = "";

                $chkSalesName = CountryMaster::where('name', $request['name'])->where('id', '!=', $country_id)->count();
                if ($chkSalesName > 0) {
                    $duplicate = 1;
                    $msg1 = "Country Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "The " . $msg4 . " Already Exists");
                } else {

                    $country_Edit = CountryMaster::where('id', $country_id)->where('hotel_id', $hotel_id)->first();
                    if ($country_Edit) {
                        $country_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $country_Edit->name);
                        $country_Edit->is_default = (isset($request['is_default']) ? ($request['is_default'] == 0 ? 0 : 1) : $country_Edit->is_default);
                        $country_Edit->updated_by = $user_id;;
                        $country_Edit->updated_at = date('Y-m-d H:i:s');
                        $country_Edit->update();
                        return $this->sendResponse($country_Edit, 'Country updated successfully.');
                    } else {
                        return $this->sendResponse('fail', 'Country not found.');
                    }
                }
            } else {
                return $this->sendResponse('fail', 'Required parameters missing.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    /**
     * Delete Country
     */
    public function deleteCountry(Request $request)
    {
        $user = Auth::user();
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (isset($request["country_id"]) && $request["country_id"] != "" && $request["country_id"] != null) {

                $deleteUser = CountryMaster::whereIn('id', is_array($request['country_id']) ? $request['country_id'] : [$request['country_id']])->delete();

                return $this->sendResponse($deleteUser, 'Country deleted successfully');
            } else {
                return $this->sendResponse('fail', 'Country parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }

    #####################  State   ################## 
    # Get State
    public function getState()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = StateMaster::with(['country'])->where('hotel_id', $hotel_id)->get();
            if (count($getFloor) > 0) {
                return $this->sendResponse($getFloor, 'Get State Data Successfully');
            } else {
                return $this->sendResponse($getFloor, 'No Data Found!');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Cerate Satte
    public function createState(Request $request)
    {

        $rule = [
            'country_id' => 'required',
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

            $chkSegmentName = StateMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkSegmentName > 0) {
                $duplicate = 1;
                $msg1 = "State Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The" . $msg4 . " Already Exists");
            } else {
                $createState = StateMaster::create([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'country_id' => $request["country_id"],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createState, 'Country created successfully.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update State
    public function updateState(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'state_id' => 'required',
            'country_id' => 'required',
            'name' => 'string|max:200',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }
        try {

            $user = Auth::user();
            $user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            if ((isset($request["state_id"]) && $request["state_id"] != "" && $request["state_id"] != null)) {
                $state_id = $request["state_id"];
                $duplicate = 0;
                $msg1 = "";

                $chkSalesName = CountryMaster::where('name', $request['name'])->where('id', '!=', $state_id)->count();
                if ($chkSalesName > 0) {
                    $duplicate = 1;
                    $msg1 = "State Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "The " . $msg4 . " Already Exists");
                } else {

                    $state_Edit = StateMaster::where('id', $state_id)->where('hotel_id', $hotel_id)->first();
                    if ($state_Edit) {
                        $state_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $state_Edit->name);
                        $state_Edit->country_id = (isset($request['country_id']) ? (empty($request['country_id']) ? "" : $request['country_id']) : $state_Edit->country_id);
                        $state_Edit->is_default = (isset($request['is_default']) ? ($request['is_default'] == 0 ? 0 : 1) : $state_Edit->is_default);
                        $state_Edit->updated_by = $user_id;;
                        $state_Edit->updated_at = date('Y-m-d H:i:s');
                        $state_Edit->update();
                        return $this->sendResponse($state_Edit, 'State updated successfully.');
                    } else {
                        return $this->sendResponse('fail', 'state not found.');
                    }
                }
            } else {
                return $this->sendResponse('fail', 'Required parameters missing.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    /**
     * Delete State
     */
    public function deleteState(Request $request)
    {
        $user = Auth::user();
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (isset($request["state_id"]) && $request["state_id"] != "" && $request["state_id"] != null) {

                $deleteUser = StateMaster::whereIn('id', is_array($request['state_id']) ? $request['state_id'] : [$request['state_id']])->delete();

                return $this->sendResponse($deleteUser, 'State deleted successfully');
            } else {
                return $this->sendResponse('fail', 'State parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }

    #####################  City    ################## 
    # Get State
    public function getCity()
    {

        try {
            $user = Auth::user();

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            $data = array();

            $getFloor = CityMaster::where('hotel_id', $hotel_id)->get();
            if (count($getFloor) > 0) {
                return $this->sendResponse($getFloor, 'Get State Data Successfully');
            } else {
                return $this->sendResponse($getFloor, 'No Data Found!');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Cerate Satte
    public function createCity(Request $request)
    {

        $rule = [
            'state_id' => 'required',
            'country_id' => 'required',
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

            $chkSegmentName = CityMaster::where('name', $request["name"])->where('hotel_id', $hotel_id)->count();
            if ($chkSegmentName > 0) {
                $duplicate = 1;
                $msg1 = "City Name";
            }
            $msg4 = $msg1;
            if ($duplicate != 0) {
                return $this->sendResponse('fail', "The" . $msg4 . " Already Exists");
            } else {
                $createState = CityMaster::insertGetId([
                    'hotel_id' => $hotel_id,
                    'name' => $request["name"],
                    'state_id' => $request["state_id"],
                    'country_id' => $request["country_id"],
                    'created_by' => $auth_user_id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                return $this->sendResponse($createState, 'City created successfully.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    # Update State
    public function updateCity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'city_id' => 'required',
            'state_id' => 'required',
            'country_id' => 'required',
            'name' => 'string|max:200',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }
        try {

            $user = Auth::user();
            $user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);
            if ((isset($request["city_id"]) && $request["city_id"] != "" && $request["city_id"] != null)) {
                $city_id = $request["city_id"];
                $duplicate = 0;
                $msg1 = "";

                $chkSalesName = CountryMaster::where('name', $request['name'])->where('id', '!=', $city_id)->count();
                if ($chkSalesName > 0) {
                    $duplicate = 1;
                    $msg1 = "State Name";
                }

                $msg4 = $msg1;

                if ($duplicate != 0) {
                    return $this->sendResponse('fail', "The " . $msg4 . " Already Exists");
                } else {

                    $city_Edit = CityMaster::where('id', $city_id)->where('hotel_id', $hotel_id)->first();
                    if ($city_Edit) {
                        $city_Edit->name = (isset($request['name']) ? (empty($request['name']) ? "" : $request['name']) : $city_Edit->name);
                        $city_Edit->country_id = (isset($request['country_id']) ? (empty($request['country_id']) ? "" : $request['country_id']) : $city_Edit->country_id);
                        $city_Edit->state_id = (isset($request['state_id']) ? (empty($request['state_id']) ? "" : $request['state_id']) : $city_Edit->state_id);
                        $city_Edit->is_default = (isset($request['is_default']) ? ($request['is_default'] == 0 ? 0 : 1) : $city_Edit->is_default);
                        $city_Edit->updated_by = $user_id;;
                        $city_Edit->updated_at = date('Y-m-d H:i:s');
                        $city_Edit->update();
                        return $this->sendResponse($city_Edit, 'State updated successfully.');
                    } else {
                        return $this->sendResponse('fail', 'City not found.');
                    }
                }
            } else {
                return $this->sendResponse('fail', 'Required parameters missing.');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    /**
     * Delete State
     */
    public function deleteCity(Request $request)
    {
        $user = Auth::user();
        $hotel_id = $user->hotel_id;
        Helper::change_database_using_hotel_id($hotel_id);
        try {
            if (isset($request["city_id"]) && $request["city_id"] != "" && $request["city_id"] != null) {

                $deleteUser = CityMaster::whereIn('id', is_array($request['city_id']) ? $request['city_id'] : [$request['city_id']])->delete();

                return $this->sendResponse($deleteUser, 'City deleted successfully');
            } else {
                return $this->sendResponse('fail', 'City parameters missing');
            }
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return;
        }
    }
}
