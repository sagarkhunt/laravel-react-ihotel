<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\GuestMaster;
use App\Models\RoomBookingMaster;
use App\Models\RoomInventoryMaster;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        
        return $this->sendResponse(['bookings',$bookings], "");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createReservation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'required',
            //'fy_id' => 'required',
            //'group_id' => 'required',
            'guest_id' => 'required',
            'frm_dt' => 'required|date',
            'to_dt' => 'required|date',
            'block_type' => 'required|in:1,2,3',
            'block_status' => 'required|in:0,1',
            'bsns_src_id' => 'required',
            'booking_src_id' => 'required',
            'bsns_src_id' => 'required',
            'booking_src_id' => 'required',
            'guest_name' => 'required',
            'guest_mobile' => 'required|numeric',
            'guest_json' => 'required',
            'room_json' => 'required',
            'pax_json' => 'required',
            'sp_req_json' => 'required',
            'sp_remarks' => 'required',
            'room_inv' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.",['errors' => $validator->errors()]);
        }

        $frmDate = $request->input('frm_dt');
        $toDate = $request->input('to_dt');

        $room_inventory = json_decode($request->room_inv, true);
        //{"rt":"1","rp":"1","nor":"5","pax":"10/2","rate":"1000"}


        $totalRoom = array_sum($room_inventory, "room");
        $bookingPost['nor'] = $totalRoom;
        $totalNight = date('to_date') - date('frm_date');
        $bookingPost['non'] = $totalNight;

        $guest_id = $request->input('guest_id');
        $guestArr = GuestMaster::leftjoin("","city_id")->find($guest_id);
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
                "rcid"=> $room_inventory['rcid'],
                "pid"=> $room_inventory['pid'],
                "rid"=> $room_inventory['rid'],
                "non"=> $totalNight,
                "nor"=> $room_inventory['nor'],
                "rate"=> $room_inventory['rate'],
            );
        }
        
        $bookingPost = array();
        $bookingPost['hotel_id'] = $request->input('hotel_id');
        $bookingPost['fy_id'] = 1;
        $bookingPost['group_id'] = 0;
        $bookingPost['guest_id'] = $request->input('guest_id');
        $bookingPost['frm_dt'] = $request->input('frm_dt');
        $bookingPost['to_dt'] = $request->input('to_dt');
        $bookingPost['block_type'] = $request->input('block_type');
        $bookingPost['block_status'] = $request->input('block_status');
        $bookingPost['bsns_src_id'] = $request->input('bsns_src_id');
        $bookingPost['booking_src_id'] = $request->input('booking_src_id');
        $bookingPost['guest_name'] = $request->input('guest_name');
        $bookingPost['guest_mobile'] = $request->input('guest_mobile');
        $bookingPost['guest_json'] = json_encode($guest);
        $bookingPost['pax_json'] = $request->input('pax_json');
        $bookingPost['sp_req_json'] = $request->input('sp_req_json');
        $bookingPost['sp_remarks'] = $request->input('sp_remarks');
        $bookingPost['room_json'] = json_encode($rooms);
        
        $bookingPost['created_by'] = Auth()->user()->id;
        $bookingPost['created_at'] = Carbon::date();
        $booking = RoomBookingMaster::create($bookingPost);

        // Ensure dates are in the correct format
        $startDate = new \DateTime($frmDate);
        $endDate = new \DateTime($toDate);
        $endDate->modify('+1 day'); // Include the end date in the loop

        $interval = new \DateInterval('P1D'); // 1 day interval
        $datePeriod = new \DatePeriod($startDate, $interval, $endDate);        


        // Store room inventory details
        foreach ($room_inventory as $room) {
            
            foreach ($datePeriod as $date) {
                $roomDate = $date->format('Y-m-d');
                $room_inv = array();
                $room_inv['dt'] = $roomDate;
                $room_inv['rbm_id'] = $booking->id;
                $room_inv['guest_id'] = $booking->guest_id;
                $room_inv['hotel_id'] = $booking->hotel_id;
                $room_inv['fy_id'] = 1;
                $room_inv['dt'] = $roomDate;
                $room_inv['room_cat_id'] = $room[''];
                $room_inv['room_id'] = $room[''];
                $room_inv['nor'] = $room[''];
                $room_inv['pax'] = $room[''];
                $room_inv['hotel_id'] = $room[''];

                $room_inv['created_by'] = $booking->created_by;
                $room_inv['created_at'] = Carbon::date();
                RoomInventoryMaster::create($room);
            }
        }

        return $this->sendResponse(['booking' => $booking], 'Booking created successfully.');
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
            return $this->sendError("Required Parameter are Missing.",['errors' => $validator->errors()]);
        }

        $rbm_id = $request->input('rbm_id');

        $booking = RoomBookingMaster::find($rbm_id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found.'], 404);
        }

        // Include associated room inventory
        $booking->load('roomInventory');

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
            'rbm_id' => 'required',
            'group_id' => 'sometimes|required',
            'guest_id' => 'sometimes|required',
            'frm_dt' => 'sometimes|required|date',
            'to_dt' => 'sometimes|required|date',
            'block_type' => 'sometimes|required|in:1,2,3',
            'block_status' => 'sometimes|required|in:0,1',
            'booking_type_id' => 'sometimes|required',
            'nor' => 'sometimes|required|numeric',
            'non' => 'sometimes|required|numeric',
            'bsns_src_id' => 'sometimes|required',
            'booking_src_id' => 'sometimes|required',
            'guest_name' => 'sometimes|required',
            'guest_mobile' => 'sometimes|required|numeric',
            'guest_json' => 'sometimes|required',
            'room_json' => 'sometimes|required',
            'pax_json' => 'sometimes|required',
            'sp_req_json' => 'sometimes|required',
            'sp_remarks' => 'sometimes|required',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Required Parameter are Missing.",['errors' => $validator->errors()]);
        }

        $rbm_id = $request->input('rbm_id');
        $booking = RoomBookingMaster::find($rbm_id);

        if (!$booking) {
            return $this->sendError("Reservation not found.");
        }

        $booking->update($request->all());

        // Update room inventory if provided
        if ($request->has('room_inventory')) {
            foreach ($request->room_inventory as $room) {
                $roomInventory = RoomInventoryMaster::where('rbm_id', $booking->rbm_id)
                    ->where('hotel_id', $booking->hotel_id)
                    ->where('fy_id', $booking->fy_id)
                    ->where('dt', $room['dt'])
                    ->where('room_id', $room['room_id'])
                    ->first();

                if ($roomInventory) {
                    $roomInventory->update($room);
                } else {
                    // Create new room inventory entry if not found
                    $room['guest_id'] = $booking->guest_id;
                    $room['hotel_id'] = $booking->hotel_id;
                    $room['fy_id'] = $booking->fy_id;
                    $room['created_by'] = $booking->updated_by;
                    $room['updated_by'] = $booking->updated_by;

                    RoomInventoryMaster::create($room);
                }
            }
        }

        return $this->sendResponse(['booking' => $booking], 'Booking updated successfully.');
    }

}