<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\Helper;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\BookingPayment;
use App\Models\GuestMaster;
use App\Models\RoomBookingMaster;
use App\Models\RoomInventoryMaster;
use Carbon\Carbon;
use DateTime;
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
    public function getReservation()
    {
        $bookings = RoomBookingMaster::all();

        if (count($bookings) > 0) {

            return $this->sendResponse($bookings, "Get Reservation list successfully!.");
        }
        return $this->sendResponse([], "No Data found!.");

        // return $this->sendResponse(['bookings', $bookings], "");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function createReservation(Request $request)
    // {
    //     dd($request->all());
    //     $validator = Validator::make($request->all(), [
    //         // 'hotel_id' => 'required',
    //         //'fy_id' => 'required',
    //         //'group_id' => 'required',
    //         // 'guest_id' => 'required',
    //         'frm_dt' => 'required|date',
    //         'to_dt' => 'required|date',
    //         // 'block_type' => 'required|in:1,2,3',
    //         // 'block_status' => 'required|in:0,1',
    //         'bsns_src_id' => 'required',
    //         'booking_src_id' => 'required',
    //         'sls_prsn_id' => 'required',
    //         'mrkt_sgmnt_id' => 'required',
    //         // 'guest_name' => 'required',
    //         // 'guest_mobile' => 'required|numeric',
    //         'guest_json' => 'required',
    //         'room_json' => 'required',
    //         // 'pax_json' => 'required',
    //         'sp_req' => 'required',
    //         'sp_remarks' => 'required',
    //         // 'room_inv' => 'required|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
    //     }

    //     $frmDate = $request->input('frm_dt');
    //     $toDate = $request->input('to_dt');

    //     $room_inventory = json_decode($request->room_inv, true);
    //     //{"rt":"1","rp":"1","nor":"5","pax":"10/2","rate":"1000"}


    //     $totalRoom = array_sum($room_inventory, "room");
    //     $bookingPost['nor'] = $totalRoom;
    //     $totalNight = date('to_date') - date('frm_date');
    //     $bookingPost['non'] = $totalNight;

    //     $guest_id = $request->input('guest_id');
    //     $guestArr = GuestMaster::leftjoin("", "city_id")->find($guest_id);
    //     $guest = array(
    //         "add" => $guestArr->full_name,
    //         "nlt" => $guestArr->nationality,
    //         "city" => $guestArr->city,
    //         "city_id" => $guestArr->city_id,
    //         "email_id" => $guestArr->email
    //     );

    //     $rooms = [];
    //     foreach ($room_inventory as $room) {
    //         $rooms[] = array(
    //             "rcid" => $room_inventory['rcid'],
    //             "pid" => $room_inventory['pid'],
    //             "rid" => $room_inventory['rid'],
    //             "non" => $totalNight,
    //             "nor" => $room_inventory['nor'],
    //             "rate" => $room_inventory['rate'],
    //         );
    //     }

    //     $bookingPost = array();
    //     $bookingPost['hotel_id'] = $request->input('hotel_id');
    //     $bookingPost['fy_id'] = 1;
    //     $bookingPost['group_id'] = 0;
    //     $bookingPost['guest_id'] = $request->input('guest_id');
    //     $bookingPost['frm_dt'] = $request->input('frm_dt');
    //     $bookingPost['to_dt'] = $request->input('to_dt');
    //     $bookingPost['block_type'] = $request->input('block_type');
    //     $bookingPost['block_status'] = $request->input('block_status');
    //     $bookingPost['bsns_src_id'] = $request->input('bsns_src_id');
    //     $bookingPost['booking_src_id'] = $request->input('booking_src_id');
    //     $bookingPost['guest_name'] = $request->input('guest_name');
    //     $bookingPost['guest_mobile'] = $request->input('guest_mobile');
    //     $bookingPost['guest_json'] = json_encode($guest);
    //     $bookingPost['pax_json'] = $request->input('pax_json');
    //     $bookingPost['sp_req_json'] = $request->input('sp_req_json');
    //     $bookingPost['sp_remarks'] = $request->input('sp_remarks');
    //     $bookingPost['room_json'] = json_encode($rooms);

    //     $bookingPost['created_by'] = Auth()->user()->id;
    //     $bookingPost['created_at'] = Carbon::date();
    //     $booking = RoomBookingMaster::create($bookingPost);

    //     // Ensure dates are in the correct format
    //     $startDate = new \DateTime($frmDate);
    //     $endDate = new \DateTime($toDate);
    //     $endDate->modify('+1 day'); // Include the end date in the loop

    //     $interval = new \DateInterval('P1D'); // 1 day interval
    //     $datePeriod = new \DatePeriod($startDate, $interval, $endDate);


    //     // Store room inventory details
    //     foreach ($room_inventory as $room) {

    //         foreach ($datePeriod as $date) {
    //             $roomDate = $date->format('Y-m-d');
    //             $room_inv = array();
    //             $room_inv['dt'] = $roomDate;
    //             $room_inv['rbm_id'] = $booking->id;
    //             $room_inv['guest_id'] = $booking->guest_id;
    //             $room_inv['hotel_id'] = $booking->hotel_id;
    //             $room_inv['fy_id'] = 1;
    //             $room_inv['dt'] = $roomDate;
    //             $room_inv['room_cat_id'] = $room[''];
    //             $room_inv['room_id'] = $room[''];
    //             $room_inv['nor'] = $room[''];
    //             $room_inv['pax'] = $room[''];
    //             $room_inv['hotel_id'] = $room[''];

    //             $room_inv['created_by'] = $booking->created_by;
    //             $room_inv['created_at'] = Carbon::date();
    //             RoomInventoryMaster::create($room);
    //         }
    //     }

    //     return $this->sendResponse(['booking' => $booking], 'Booking created successfully.');
    // }
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

            $toDate = new DateTime($request->input('to_dt'));
            $fromDate = new DateTime($request->input('frm_dt'));

            $room_inventory = json_decode($request->room_json, true);
            //{"rt":"1","rp":"1","nor":"5","pax":"10/2","rate":"1000"}

            $totalRate = array_sum(array_column($room_inventory, "rate"));

            $bookingPost['nor'] = count($room_inventory);
            $interval = $toDate->diff($fromDate);

            // Get the difference in days
            $totalNight = $interval->days;
            $bookingPost['non'] = $totalNight;

            $guest_id = $request->input('guest_id');

            $guestArr = Helper::guestInfoAddUpdate($guest_id, $request['guest_json']);
            // $guestArr = GuestMaster::find($guest_id);

            $guest = array(
                "add" => $guestArr->full_name,
                "nlt" => $guestArr->nationality,
                "city" => $guestArr->city,
                "city_id" => $guestArr->city_id,
                "email_id" => $guestArr->email
            );
            $rooms = [];
            foreach ($room_inventory as $room) {

                $rooms[] = array(
                    // "rcid" => $room_inventory['rcid'],
                    // "pid" => $room_inventory['pid'],
                    // "rid" => $room_inventory['rid'],
                    // // "non" => $totalNight,
                    // "non" => $room_inventory['non'],
                    // "nor" => $room_inventory['nor'],
                    // "rate" => $room_inventory['rate'],
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
            // $roomBooking->sp_req_json = '{"name":"Pratik"}';
            $roomBooking->sp_req_json = $request->input('sp_req_json');
            $roomBooking->pax_json = $request->input('pax_json');
            $roomBooking->sp_remarks = $request->input('sp_remarks');
            // $roomBooking->room_charge = $totalRate;
            $roomBooking->taxes = $request->input('taxes');
            // $roomBooking->advance_recive = $request->input('advance_recive');
            $roomBooking->total_amt = $request->input('total_amnt');
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
                        $room_inv['room_id'] = 0;
                        $room_inv['nor'] = 1; //$room['nor'];
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
                $payData = [
                    'hotel_id' => $roomBooking->hotel_id,
                    'rbm_id' => $roomBooking->id,
                    'pay_date' => $payDetails['pay_date'],
                    'pay_type' => $payDetails['pay_type'],
                    'ref_name' => $payDetails['ref_name'],
                    'pay_amnt' => $payDetails['pay_amnt'],
                    'created_by' => $user_id
                ];

                BookingPayment::create($payData);
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

            // Retrieve the existing booking
            $roomBooking = RoomBookingMaster::find($request['rbm_id']);

            if (!$roomBooking) {
                return $this->sendError("Booking not found.");
            }

            $toDate = new DateTime($request->input('to_dt'));
            $fromDate = new DateTime($request->input('frm_dt'));

            $room_inventory = json_decode($request->room_json, true);
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
                $roomDate = new DateTime($roomInv->dt);
                if ($roomDate >= $fromDate && $roomDate < $toDate) {
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
                            $roomInventory->update($room_inv);
                        } else {
                            RoomInventoryMaster::create($room_inv);
                        }

                        $prevId = $room_inv['id']; // Update previous ID for next iteration
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

                $payData = [
                    'hotel_id' => $roomBooking->hotel_id,
                    'rbm_id' => $roomBooking->id,
                    'pay_date' => $payDetails['pay_date'],
                    'pay_type' => $payDetails['pay_type'],
                    'ref_name' => $payDetails['ref_name'],
                    'pay_amnt' => $payDetails['pay_amnt'],
                    'created_by' => $user_id
                ];

                BookingPayment::create($payData);
            }

            return $this->sendResponse($roomBooking, 'Booking updated successfully.');
        } catch (\Exception $e) {
            dd($e);
            Log::error($e->getMessage());
            return $this->sendError('Server Error', $e->getMessage());
        }
    }
    // public function updateReservation(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'rbm_id' => 'required',
    //         'group_id' => 'sometimes|required',
    //         'guest_id' => 'sometimes|required',
    //         'frm_dt' => 'sometimes|required|date',
    //         'to_dt' => 'sometimes|required|date',
    //         'block_type' => 'sometimes|required|in:1,2,3',
    //         'block_status' => 'sometimes|required|in:0,1',
    //         'booking_type_id' => 'sometimes|required',
    //         'nor' => 'sometimes|required|numeric',
    //         'non' => 'sometimes|required|numeric',
    //         'bsns_src_id' => 'sometimes|required',
    //         'booking_src_id' => 'sometimes|required',
    //         'guest_name' => 'sometimes|required',
    //         'guest_mobile' => 'sometimes|required|numeric',
    //         'guest_json' => 'sometimes|required',
    //         'room_json' => 'sometimes|required',
    //         'pax_json' => 'sometimes|required',
    //         'sp_req_json' => 'sometimes|required',
    //         'sp_remarks' => 'sometimes|required',
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->sendError("Required Parameter are Missing.", ['errors' => $validator->errors()]);
    //     }

    //     $rbm_id = $request->input('rbm_id');
    //     $booking = RoomBookingMaster::find($rbm_id);


    //     if (!$booking) {
    //         return $this->sendError("Reservation not found.");
    //     }

    //     $booking->update($request->all());

    //     // Update room inventory if provided
    //     if ($request->has('room_inventory')) {
    //         foreach ($request->room_inventory as $room) {
    //             $roomInventory = RoomInventoryMaster::where('rbm_id', $booking->rbm_id)
    //                 ->where('hotel_id', $booking->hotel_id)
    //                 ->where('fy_id', $booking->fy_id)
    //                 ->where('dt', $room['dt'])
    //                 ->where('room_id', $room['room_id'])
    //                 ->first();

    //             if ($roomInventory) {
    //                 $roomInventory->update($room);
    //             } else {
    //                 // Create new room inventory entry if not found
    //                 $room['guest_id'] = $booking->guest_id;
    //                 $room['hotel_id'] = $booking->hotel_id;
    //                 $room['fy_id'] = $booking->fy_id;
    //                 $room['created_by'] = $booking->updated_by;
    //                 $room['updated_by'] = $booking->updated_by;

    //                 RoomInventoryMaster::create($room);
    //             }
    //         }
    //     }

    //     return $this->sendResponse(['booking' => $booking], 'Booking updated successfully.');
    // }
}
