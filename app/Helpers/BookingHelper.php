<?php

namespace App\Helpers;

use App\Models\RoomCatMaster;
use App\Models\RoomInventoryMaster;
use Carbon\Carbon;

class BookingHelper
{
    public static function checkRoomBookingAvailability($hotel_id, $toDate, $fromDate, $roomCatId, $nor, $bookingId = 0)
    {
        $roomCat = RoomCatMaster::where("hotel_id", $hotel_id)->where('id', $roomCatId)->where("status", 1)->select('id', 'cat_name', 'qty')->first();
        if ($roomCat) {
            $totalRooms = $roomCat->qty;
            $checkInDate = Carbon::parse($toDate);
            $checkOutDate = Carbon::parse($fromDate);
            $nights = $checkInDate->diffInDays($checkOutDate);

            for ($i = 0; $i <= $nights; $i++) {
                $date = $checkInDate->copy()->addDays($i)->toDateString();
                $reservedRooms = RoomInventoryMaster::where("hotel_id", $hotel_id)
                    ->where("room_cat_id", $roomCatId)
                    ->whereDate('dt', $date)
                    ->where('status', '!=', 0)
                    ->where(function ($q) use ($bookingId) {
                        if ($bookingId != 0) {
                            $q->where('ref_id', "!=", $bookingId);
                        }
                    })
                    ->count();
                $availableRooms = $totalRooms - $reservedRooms;

                if ($availableRooms >= $nor) {
                    return true;
                } else {
                    return array(
                        "error" => true,
                        "data" => "$roomCat->cat_name Category Room(s) is currently Unavailable. only $availableRooms Rooms are Available."
                    );
                }
            }
        } else {
            return array(
                "error" => true,
                "data" => "Invalid Room Category ID Not Found!"
            );
        }
    }
}
