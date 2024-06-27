<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\BookingHelper;
use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\BookingPayment;
use App\Models\GuestMaster;
use App\Models\RoomBookingMaster;
use App\Models\RoomCatMaster;
use App\Models\RoomInventoryMaster;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelReservationController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getReservation(Request $request)
    {
        // Capture the request parameters
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $bsnsSrcId = $request->input('bsns_src_id');
        $status = $request->input('status');

        // Start the Eloquent query
        $query = RoomBookingMaster::with(['roomInventory.roomCat', 'roomInventory.roomPlan', 'roomAdvPayment']);

        // Apply the filters
        if ($startDate) {
            $query->where('frm_dt', '>=', $startDate);
        }
        if ($endDate) {
            $query->where('to_dt', '<=', $endDate);
        }
        if ($bsnsSrcId) {
            $query->where('bsns_src_id', $bsnsSrcId);
        }
        if ($status) {
            // Assuming 'active' means block_status is 1
            if ($status == 'active') {
                $query->where('block_status', 1);
            } else if ($status == 'inactive') {
                $query->where('block_status', 0);
            }
        }

        // Get the filtered bookings
        $bookings = $query->get();

        // Check if there are any bookings
        if (count($bookings) > 0) {
            return $this->sendResponse($bookings, "Get Reservation list successfully!");
        }

        return $this->sendResponse([], "No Data found!");
    }

    public function createReservation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'group_id' => 'required',
            'guest_id' => 'required',
            'frm_dt' => 'required|date',
            'to_dt' => 'required|date',
            'bsns_src_id' => 'required',
            'booking_src_id' => 'required',
            'sls_prsn_id' => 'required',
            // 'mrkt_sgmnt_id' => 'required',
            'guest_json' => 'required',
            'room_json' => 'required',
            // 'sp_req_json' => 'required',
            // 'sp_remarks' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }
        try {

            $user = Auth::user();
            $user_id = $user->id;
            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);

            $toDate = new DateTime($request->input('to_dt'));
            $fromDate = new DateTime($request->input('frm_dt'));
            // $room_inventory = json_decode($request->room_json, true);
            $room_inventory = json_decode(json_encode($request->room_json), true);
            //$room_inventory = $request->room_json;

            $totalAmount = array_sum(array_column($room_inventory, "rate"));

            $bookingPost['nor'] = count($room_inventory);
            $interval = $toDate->diff($fromDate);

            $roomError = false;
            $roomErrorDetails = [];
            foreach ($room_inventory as $roomInv) {
                $roomsAvlbl = BookingHelper::checkRoomBookingAvailability($hotel_id, $toDate, $fromDate, $roomInv['rcid'], $roomInv['nor'], 0);
                if ($roomsAvlbl !== true) {
                    $roomError = true;
                    $roomErrorDetails[] = $roomsAvlbl['data'];
                }
            }

            if ($roomError) {
                return $this->sendError("Room Not Available.", ['errors' => $roomErrorDetails]);
            }

            // Get the difference in days
            $totalNight = $interval->days;
            $bookingPost['non'] = $totalNight;

            $guest_id = $request->input('guest_id');

            $guestArr = Helper::guestInfoAddUpdate($guest_id, $request['guest_json']);
            // $guestArr = GuestMaster::find($guest_id);

            $guest = array(
                "full_name" => $guestArr->full_name,
                "add" => $guestArr->address,
                "nlt" => $guestArr->nationality,
                "city" => $guestArr->city,
                "city_id" => $guestArr->city_id,
                "email_id" => $guestArr->email
            );

            $rooms = [];
            foreach ($room_inventory as $room) {

                $rooms[] = array(
                    "rcid" => $room['rcid'],
                    "pid" => $room['pid'],
                    "nor" => $room['nor'],
                    "adlt" => $room['adlt'],
                    "chld" => $room['chld'],
                    "rate" => $room['rate'],
                );
            }

            $roomBooking = new RoomBookingMaster();

            // Set the attributes
            $roomBooking->hotel_id = $hotel_id;
            $roomBooking->group_id = $request->input('group_id');
            $roomBooking->guest_id = $request->input('guest_id');
            $roomBooking->fy_id = 1;
            $roomBooking->frm_dt = $request->input('frm_dt');
            $roomBooking->to_dt = $request->input('to_dt');
            $roomBooking->nor = count($room_inventory);
            $roomBooking->non = $totalNight;
            $roomBooking->bsns_src_id = $request->input('bsns_src_id');
            $roomBooking->booking_src_id = $request->input('booking_src_id');
            $roomBooking->sls_prsn_id = $request->input('sls_prsn_id');
            $roomBooking->mrkt_sgmnt_id = $request->input('mrkt_sgmnt_id');
            $roomBooking->room_json = json_encode($rooms); //$request->input('room_json');
            $roomBooking->guest_json = json_encode($guest); //$request['guest_json'];
            $roomBooking->cncl_policy_id = $request->input('cncl_policy_id');
            $roomBooking->terms_con_id = $request->input('terms_con_id');
            $roomBooking->sp_req_json = $request->input('sp_req_json');
            $roomBooking->pax_json = $request->input('pax_json');
            $roomBooking->sp_remarks = $request->input('sp_remarks');
            $roomBooking->taxes = $request->input('taxes');
            $roomBooking->total_amt = $totalAmount;
            $roomBooking->created_by = $user_id;
            $roomBooking->created_at = now();
            $roomBooking->save();

            // Ensure dates are in the correct format
            $startDate = $fromDate;
            $endDate = $toDate;
            $endDate->modify('+1 day'); // Include the end date in the loop

            $interval = new \DateInterval('P1D'); // 1 day interval
            $datePeriod = new \DatePeriod($startDate, $interval, $endDate);

            // Store room inventory details
            foreach ($room_inventory as $room) {

                $prevId = 0;
                for ($i = 0; $i < $room['nor']; $i++) {
                    # code...
                    foreach ($datePeriod as $date) {
                        $roomDate = $date->format('Y-m-d');
                        $room_inv = array();
                        $room_inv['dt'] = $roomDate;
                        $room_inv['ref_id'] = $roomBooking->id;
                        $room_inv['guest_id'] = $roomBooking->guest_id;
                        $room_inv['hotel_id'] = $roomBooking->hotel_id;
                        $room_inv['prev_id'] = $prevId;
                        $room_inv['fy_id'] = 1;
                        $room_inv['dt'] = $roomDate;
                        $room_inv['room_cat_id'] = $room['rcid'];
                        $room_inv['rate_type_id'] = $room['pid'];
                        $room_inv['room_id'] = 0;
                        $room_inv['nor'] = $room['nor']; //$room['nor'];
                        $room_inv['pax'] = Null;
                        $room_inv['room_rate'] = $room['rate'];
                        $room_inv['status'] = 1;
                        // $room_inv['hotel_id'] = $rossomBooking->hotel_id;
                        $room_inv['created_by'] = $roomBooking->created_by;
                        $room_inv['created_at'] = Carbon::now();
                        // RoomInventoryMaster::create($room);
                        $roomInv = RoomInventoryMaster::create($room_inv);


                        $prevId = $roomInv->id;
                    }
                }
            }
            // Store payment details
            if ($request->input('payment_json')) {
                $payDetails = $request->input('payment_json');

                // Decode JSON if $payDetails is a JSON string
                if (is_string($payDetails)) {
                    $payDetails = json_decode($payDetails, true);
                }

                // Ensure $payDetails is an array
                if (!is_array($payDetails)) {
                    throw new \Exception("Invalid data format. Array expected.");
                }

                // Map the incoming data to match the database fields
                // $payData = [
                //     'hotel_id' => $roomBooking->hotel_id,
                //     'rbm_id' => $roomBooking->id,
                //     'pay_type' => $payDetails['pay_type'],
                //     'ref_name' => $payDetails['ref_name'],
                //     'pay_amnt' => $payDetails['pay_amnt'],
                //     'created_by' => $user_id
                // ];

                // BookingPayment::create($payData);
                foreach ($payDetails as $payDetail) {
                    $payData = [
                        'hotel_id' => $roomBooking->hotel_id,
                        'rbm_id' => $roomBooking->id,
                        'pay_type' => $payDetail['method'],
                        'ref_name' => $payDetail['ref_name'] ?? Null,
                        'pay_amnt' => $payDetail['amount'],
                        'created_by' => $user_id
                    ];

                    BookingPayment::create($payData);
                }
            }
            return $this->sendResponse($roomBooking, 'Booking created successfully.');
        } catch (\Exception $e) {
            dd($e);
            Log::debug($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getReservationDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rbm_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }

        $rbm_id = $request->input('rbm_id');

        $booking = RoomBookingMaster::find($rbm_id);


        if (!$booking) {
            return response()->json(['message' => 'Booking not found.'], 404);
        }

        // Include associated room inventory
        // $booking->load('roomInventory');

        return $this->sendResponse(['booking' => $booking], '');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateReservation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'group_id' => 'required',
            'guest_id' => 'required',
            'frm_dt' => 'required|date',
            'to_dt' => 'required|date',
            'bsns_src_id' => 'required',
            'booking_src_id' => 'required',
            'sls_prsn_id' => 'required',
            'mrkt_sgmnt_id' => 'required',
            'guest_json' => 'required',
            'room_json' => 'required',
            'sp_req_json' => 'required',
            'sp_remarks' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }

        try {
            $user = Auth::user();
            $user_id = $user->id;

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);

            $bookingId = $request['rbm_id'];
            // Retrieve the existing booking
            $roomBooking = RoomBookingMaster::find($bookingId);

            if (!$roomBooking) {
                return $this->sendError("Booking not found.");
            }

            $toDate = new DateTime($request->input('to_dt'));
            $fromDate = new DateTime($request->input('frm_dt'));

            $room_inventory = json_decode($request->room_json, true);

            $roomError = false;
            $roomErrorDetails = [];
            foreach ($room_inventory as $roomInv) {
                $roomsAvlbl = BookingHelper::checkRoomBookingAvailability($hotel_id, $toDate, $fromDate, $roomInv['rcid'], $roomInv['nor'], $bookingId);
                if ($roomsAvlbl !== true) {
                    $roomError = true;
                    $roomErrorDetails[] = $roomsAvlbl['data'];
                }
            }

            if ($roomError) {
                return $this->sendError("Room Not Available.", ['errors' => $roomErrorDetails]);
            }

            $totalRate = array_sum(array_column($room_inventory, "rate"));

            $bookingPost['nor'] = count($room_inventory);
            $interval = $toDate->diff($fromDate);
            $totalNight = $interval->days;
            $bookingPost['non'] = $totalNight;

            $guest_id = $request->input('guest_id');


            $guestArr = Helper::guestInfoAddUpdate($guest_id, $request['guest_json']);

            $guest = [
                "add" => $guestArr->full_name,
                "nlt" => $guestArr->nationality,
                "city" => $guestArr->city,
                "city_id" => $guestArr->city_id,
                "email_id" => $guestArr->email
            ];

            $rooms = [];
            foreach ($room_inventory as $room) {
                $rooms[] = [
                    "rcid" => $room['rcid'],
                    "pid" => $room['pid'],
                    "nor" => $room['nor'],
                    "adlt" => $room['adlt'],
                    "chld" => $room['chld'],
                    "rate" => $room['rate'],
                ];
            }

            // Update the attributes of the existing booking
            $roomBooking->hotel_id = $hotel_id;
            $roomBooking->group_id = $request->input('group_id');
            $roomBooking->guest_id = $request->input('guest_id');
            $roomBooking->frm_dt = $request->input('frm_dt');
            $roomBooking->to_dt = $request->input('to_dt');
            $roomBooking->nor = count($room_inventory);
            $roomBooking->non = $totalNight;
            $roomBooking->bsns_src_id = $request->input('bsns_src_id');
            $roomBooking->booking_src_id = $request->input('booking_src_id');
            $roomBooking->sls_prsn_id = $request->input('sls_prsn_id');
            $roomBooking->mrkt_sgmnt_id = $request->input('mrkt_sgmnt_id');
            $roomBooking->room_json = json_encode($rooms);
            $roomBooking->guest_json = json_encode($guest);
            $roomBooking->sp_req_json = $request->input('sp_req_json');
            $roomBooking->pax_json = $request->input('pax_json');
            $roomBooking->sp_remarks = $request->input('sp_remarks');
            $roomBooking->taxes = $request->input('taxes');
            $roomBooking->total_amt = $request->input('total_amnt');
            $roomBooking->updated_by = $user_id;
            $roomBooking->updated_at = now();
            $roomBooking->save();

            // Remove outdated room inventory entries
            $startDate = $fromDate;
            $endDate = $toDate->modify('+1 day');
            $interval = new \DateInterval('P1D');
            $datePeriod = new \DatePeriod($startDate, $interval, $endDate);

            $datesToRemove = [];

            // Collect all existing room inventory dates to be removed
            foreach ($roomBooking->roomInventory as $roomInv) {
                if ($roomInv['ref_id'] == $roomBooking->id) {
                    $datesToRemove[] = $roomInv->id;
                }
            }

            // Delete outdated room inventory entries
            RoomInventoryMaster::whereIn('id', $datesToRemove)->delete();

            // Update or create room inventory details for the updated booking period
            foreach ($room_inventory as $room) {

                $prevId = 0;
                for ($i = 0; $i < $room['nor']; $i++) {
                    foreach ($datePeriod as $date) {
                        $roomDate = $date->format('Y-m-d');
                        $room_inv = [
                            'dt' => $roomDate,
                            'ref_id' => $roomBooking->id,
                            'guest_id' => $roomBooking->guest_id,
                            'hotel_id' => $roomBooking->hotel_id,
                            'prev_id' => $prevId,
                            'fy_id' => 1,
                            'room_cat_id' => $room['rcid'],
                            'room_id' => 0,
                            'nor' => 1,
                            'room_rate' => $room['rate'],
                            'status' => 1,
                            'created_by' => $user_id,
                            'created_at' => Carbon::now(),
                        ];

                        $roomInventory = RoomInventoryMaster::where('ref_id', $roomBooking->id)
                            ->where('dt', $roomDate)
                            ->where('room_cat_id', $room['rcid'])
                            ->first();

                        if ($roomInventory) {
                            $prevId = $roomInventory->prev_id;
                            $roomInventory->update($room_inv);
                        } else {
                            $roomInv = RoomInventoryMaster::create($room_inv);
                            $prevId = $roomInv['id']; // Update previous ID for next iteration
                        }
                    }
                }
            }

            // Update or create payment details
            if ($request->input('payment_json')) {
                $payDetails = $request->input('payment_json');

                if (is_string($payDetails)) {
                    $payDetails = json_decode($payDetails, true);
                }

                if (!is_array($payDetails)) {
                    throw new \Exception("Invalid data format. Array expected.");
                }

                // Find an existing payment record or create a new one if it doesn't exist
                $payData = BookingPayment::firstOrNew(
                    ['rbm_id' => $roomBooking->id],
                    ['hotel_id' => $roomBooking->hotel_id]
                );

                // Populate the fields
                $payData->pay_date = $payDetails['pay_date'];
                $payData->pay_type = $payDetails['pay_type'];
                $payData->ref_name = $payDetails['ref_name'];
                $payData->pay_amnt = $payDetails['pay_amnt'];
                $payData->created_by = $user_id;

                // Save the record (either update or create)
                $payData->save();
            }

            return $this->sendResponse($roomBooking, 'Booking updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    /**
     * Reservation status update cancle and active
     */
    public function updateReserStatus(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'res_status' => 'required',
            'rbm_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required parameters are missing.", ['errors' => $validator->errors()]);
        }

        try {
            // Find the RoomBookingMaster record by rbm_id
            $reservation = RoomBookingMaster::findOrFail($request->rbm_id);

            // Update the reservation status
            $reservation->block_status = $request->res_status;
            $reservation->save();


            // Check if there are related roomInventory entries
            $roomInventories = $reservation->roomInventory;

            if ($roomInventories->isNotEmpty()) {
                // Delete all related roomInventory entries
                $roomInventories->each(function ($roomInventory) {
                    $roomInventory->delete();
                });
            }
            // Resrvation payment delete
            $roomAdvPaymebnt = $reservation->roomAdvPayment;
            if ($roomAdvPaymebnt) {
                $roomAdvPaymebnt->delete();
            }

            return $this->sendResponse([], 'Reservation status updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    #Reservation Delete
    public function deleteReservation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rbm_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required parameters are missing.", ['errors' => $validator->errors()]);
        }

        try {
            // Find the RoomBookingMaster record by rbm_id
            $reservation = RoomBookingMaster::findOrFail($request->rbm_id);

            // Delete related roomInventory entries if cascading delete is not set up
            // Assuming roomInventory() is a hasMany relationship in RoomBookingMaster model
            $reservation->roomInventory()->delete();
            $reservation->roomAdvPayment()->delete();
            // Delete the reservation itself
            $reservation->delete();

            return $this->sendResponse(Null, 'Reservation deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }


    public function getRoomAvailabilityDateWise(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'checkin_dt' => 'required|date',
            'checkout_dt' => 'required|date',
            'rm_cat_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }

        try {
            $user = Auth::user();
            $user_id = $user->id;

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);

            $rm_cat_id = $request->input('rm_cat_id');
            $checkInDate = Carbon::parse($request->input('checkin_dt'));
            $checkOutDate = Carbon::parse($request->input('checkout_dt'));
            $nights = $checkInDate->diffInDays($checkOutDate);

            if ($nights > 14) {
                return $this->sendError("Max days can be 14 are Allowed!");
            }

            // Fetch room categories
            $roomCategories = RoomCatMaster::where("hotel_id", $hotel_id)
                ->where("status", 1)
                ->where(function ($q) use ($rm_cat_id) {
                    if ($rm_cat_id != 0) {
                        $q->where('id', $rm_cat_id);
                    }
                })
                ->select('id', 'cat_name', 'qty')
                ->get();

            // Process the data
            $availability = [];
            foreach ($roomCategories as $category) {
                $categoryId = $category->id;
                $categoryName = $category->cat_name;

                $catAvailability = [];
                for ($i = 0; $i <= $nights; $i++) {
                    $date = $checkInDate->copy()->addDays($i)->toDateString();
                    $totalRooms = $category->qty;
                    $reservedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)->whereDate('dt', $date)->where('room_cat_id', $category->id)->where('status', 1)->count();
                    $blockedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)->whereDate('dt', $date)->where('room_cat_id', $category->id)->where('status', 2)->count();
                    $outOfOrderRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)->whereDate('dt', $date)->where('room_cat_id', $category->id)->where('status', 3)->count();
                    $availableRooms = $totalRooms - ($reservedRooms + $blockedRooms + $outOfOrderRooms);

                    $catAvailability[] = [
                        "dt" => $date,
                        "summary" => [
                            'total' => (int)$totalRooms,
                            'reserved' => $reservedRooms,
                            'blocked' => $blockedRooms,
                            'out_of_order' => $outOfOrderRooms,
                            'available' => $availableRooms,
                        ]
                    ];
                }
                $availability[] = array(
                    "cat_id" => $categoryId,
                    "cat" => $categoryName,
                    "datewise" => $catAvailability
                );
            }

            $summary = [];
            for ($i = 0; $i <= $nights; $i++) {
                $date = $checkInDate->copy()->addDays($i)->toDateString();
                $totalRooms = RoomCatMaster::where("hotel_id", $hotel_id)
                    ->where("status", 1)
                    ->where(function ($q) use ($rm_cat_id) {
                        if ($rm_cat_id != 0) {
                            $q->where('id', $rm_cat_id);
                        }
                    })
                    ->sum('qty');
                $reservedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                    ->whereDate('dt', $date)
                    ->where(function ($q) use ($rm_cat_id) {
                        if ($rm_cat_id != 0) {
                            $q->where('room_cat_id', $rm_cat_id);
                        }
                    })
                    ->where('status', 1)->count();
                $blockedRooms = RoomInventoryMaster::where(
                    "hotel_id",
                    $hotel_id
                )->whereDate('dt', $date)
                    ->where(function ($q) use ($rm_cat_id) {
                        if ($rm_cat_id != 0) {
                            $q->where('room_cat_id', $rm_cat_id);
                        }
                    })
                    ->where('status', 2)->count();
                $outOfOrderRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                    ->whereDate('dt', $date)
                    ->where(function ($q) use ($rm_cat_id) {
                        if ($rm_cat_id != 0) {
                            $q->where('room_cat_id', $rm_cat_id);
                        }
                    })
                    ->where('status', 3)->count();

                $availableRooms = $totalRooms - ($reservedRooms + $blockedRooms + $outOfOrderRooms);

                $summary['datewise'][] = [
                    "dt" => $date,
                    "summary" => [
                        'total' => (int) $totalRooms,
                        'reserved' => $reservedRooms,
                        'blocked' => $blockedRooms,
                        'out_of_order' => $outOfOrderRooms,
                        'available' => $availableRooms,
                    ]
                ];
            }

            $data['room_summary']['all'] = $summary;
            $data['room_summary']['catwise'] = $availability;
            return $this->sendResponse($data, 'Available Rooms Fetch Successfully.');
        } catch (Exception $e) {
            dd($e);
            Log::error($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }

    public function getRoomAvailabilitySummary(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'checkin_dt' => 'required|date',
            'checkout_dt' => 'required|date',
            'rm_cat_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
        }

        try {
            $user = Auth::user();
            $user_id = $user->id;

            $hotel_id = $user->hotel_id;
            Helper::change_database_using_hotel_id($hotel_id);

            $rm_cat_id = $request->input('rm_cat_id');
            $checkInDate = Carbon::parse($request->input('checkin_dt'));
            $checkOutDate = Carbon::parse($request->input('checkout_dt'));
            $nights = $checkInDate->diffInDays($checkOutDate);

            if ($nights > 14) {
                return $this->sendError("Max days can be 14 are Allowed!");
            }

            // Fetch room categories
            $roomCategories = RoomCatMaster::where("hotel_id", $hotel_id)
                ->where("status", 1)
                ->where(function ($q) use ($rm_cat_id) {
                    if ($rm_cat_id != 0) {
                        $q->where('id', $rm_cat_id);
                    }
                })
                ->select('id', 'cat_name', 'qty')
                ->get();

            // Process the data
            $availability = [];
            foreach ($roomCategories as $category) {
                $categoryId = $category->id;
                $categoryName = $category->cat_name;


                $totalRooms = $category->qty;
                $reservedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                    ->whereBetween('dt', [$checkInDate, $checkOutDate])
                    ->where('room_cat_id', $category->id)
                    ->where('status', 1)->count();

                $blockedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                    ->whereBetween('dt', [$checkInDate, $checkOutDate])
                    ->where('room_cat_id', $category->id)
                    ->where('status', 2)->count();

                $outOfOrderRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                    ->whereBetween('dt', [$checkInDate, $checkOutDate])
                    ->where('room_cat_id', $category->id)
                    ->where('status', 3)->count();

                $availableRooms = $totalRooms - ($reservedRooms + $blockedRooms + $outOfOrderRooms);

                $availabilitySummary = [
                    'total' => (int) $totalRooms,
                    'reserved' => $reservedRooms,
                    'blocked' => $blockedRooms,
                    'out_of_order' => $outOfOrderRooms,
                    'available' => $availableRooms,
                ];
                $availability[] = array(
                    "cat_id" => $categoryId,
                    "cat" => $categoryName,
                    "summary" => $availabilitySummary
                );
            }

            $allAvailability = [];

            $totalRooms = RoomCatMaster::where("hotel_id", $hotel_id)
                ->where(function ($q) use ($rm_cat_id) {
                    if ($rm_cat_id != 0) {
                        $q->where('id', $rm_cat_id);
                    }
                })
                ->where("status", 1)
                ->sum('qty');

            $reservedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                ->whereBetween('dt', [$checkInDate, $checkOutDate])
                ->where(function ($q) use ($rm_cat_id) {
                    if ($rm_cat_id != 0) {
                        $q->where('room_cat_id', $rm_cat_id);
                    }
                })
                ->where('status', 1)->count();

            $blockedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                ->whereBetween('dt', [$checkInDate, $checkOutDate])
                ->where(function ($q) use ($rm_cat_id) {
                    if ($rm_cat_id != 0) {
                        $q->where('room_cat_id', $rm_cat_id);
                    }
                })
                ->where('status', 2)->count();

            $outOfOrderRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                ->whereBetween('dt', [$checkInDate, $checkOutDate])
                ->where(function ($q) use ($rm_cat_id) {
                    if ($rm_cat_id != 0) {
                        $q->where('room_cat_id', $rm_cat_id);
                    }
                })
                ->where('status', 3)->count();

            $availableRooms = $totalRooms - ($reservedRooms + $blockedRooms + $outOfOrderRooms);

            $allAvailability['summary'] = [
                'total' => (int) $totalRooms,
                'reserved' => $reservedRooms,
                'blocked' => $blockedRooms,
                'out_of_order' => $outOfOrderRooms,
                'available' => $availableRooms,
            ];

            $data['room_summary']['all'] = $allAvailability;
            $data['room_summary']['catwise'] = $availability;
            return $this->sendResponse($data, 'Available Rooms Fetch Successfully.');
        } catch (Exception $e) {
            dd($e);
            Log::error($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
}
