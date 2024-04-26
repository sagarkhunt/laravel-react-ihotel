<?php
namespace App\Helpers;

use App\Models\HotelConn;

class Helper
{
    public static function change_database()
    {
        $hotel_connection = config('database.connections.mysql');
        $user = auth()->user();
        if ($user) {
            $hotel_conn =  HotelConn::where('hotel_id', auth()->user()->hotel_id)->first();
            $hotel_connection['database'] = $hotel_conn->database_name;

            // when we use in local then no need to user password
            $hotel_connection['username'] = $hotel_conn->user_name;
            $hotel_connection['password'] = $hotel_conn->pwd;
            config(['database.connections.ihotel' => $hotel_connection]);
        }
    }

    public static function change_database_using_hotel_id($id)
    {
        $hotel_connection = config('database.connections.mysql');
        $hotel_conn = HotelConn::where('hotel_id', $id)->first();
        $hotel_connection['database'] = $hotel_conn->database_name;
        // when we use in local then no need to user password
        $hotel_connection['username'] = $hotel_conn->user_name;
        $hotel_connection['password'] = $hotel_conn->pwd;
        config(['database.connections.ihotel' => $hotel_connection]);
    }
}