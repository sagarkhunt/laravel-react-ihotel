<?php

use App\Http\Controllers\Api\v1\AuthLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::post('/login', [App\Http\Controllers\Api\Auth\AuthController::class, 'authenticate']);
// Route::post('/register', [App\Http\Controllers\Api\Auth\AuthController::class, 'register']);

// Route::group(['middleware' => 'auth:sanctum'], function () {
//     Route::get('/auth/user', function (Request $request) {
//         return ['data' => $request->user()];
//     });
//     Route::delete('/logout', [App\Http\Controllers\Api\Auth\AuthController::class, 'logout']);
// });


Route::group(['prefix' => '/v1', 'namespace' => 'Api\v1'], function () {
    Route::post('login', 'AuthLoginController@login');
    Route::post('register', 'AuthLoginController@register');
});
Route::group(['prefix' => "/v1", 'middleware' => ['auth:sanctum'], 'namespace' => 'Api\v1'], function () {
    Route::get('/auth/user', function (Request $request) {
        return ['data' => $request->user()];
    });
    Route::post('verify_token', 'AuthLoginController@verifyToken');
    Route::delete('/logout', [App\Http\Controllers\Api\Auth\AuthController::class, 'logout']);
    #EZBillMiscController
    Route::post('get_login_sync', 'HotelLoginSyncController@getLoginSyncData');
    Route::any('get_users', 'HotelUserController@getUsers');
    Route::any('create_user', 'HotelUserController@createUser');
    Route::any('update_user', 'HotelUserController@updateUser');
    Route::any('delete_user', 'HotelUserController@deleteUser');

    Route::any('upd_htl_profile', 'HotelUserController@updateHotelProfile');

    #--------------Room Management-------------------
    #Floor
    Route::any('get_floors', 'HotelFloorController@getFloor');
    Route::any('create_floor', 'HotelFloorController@createFloor');
    Route::any('update_floor', 'HotelFloorController@updateFloor');
    Route::any('delete_floor', 'HotelFloorController@deleteFloor');
    #Section
    Route::any('get_section', 'HotelSectionController@getSection');
    Route::any('create_section', 'HotelSectionController@createSection');
    Route::any('update_section', 'HotelSectionController@updateSection');
    Route::any('delete_section', 'HotelSectionController@deleteSection');
    #Amenity
    Route::any('get_amenity', 'HotelAmenityController@getAmenity');
    Route::any('create_amenity', 'HotelAmenityController@createAmenity');
    Route::any('update_amenity', 'HotelAmenityController@updateAmenity');
    Route::any('delete_amenity', 'HotelAmenityController@deleteAmenity');
    #Rooms Category
    Route::any('get_room_cat', 'HotelRoomCategoryController@getRoomCat');
    Route::any('create_room_cat', 'HotelRoomCategoryController@createRoomCat');
    Route::any('update_room_cat', 'HotelRoomCategoryController@updateRoomCat');
    Route::any('delete_room_cat', 'HotelRoomCategoryController@deleteRoomCat');
    Route::any('get_rooms_on_room_cat_id', 'HotelRoomCategoryController@getRoomsOnRoomCatId');
    #Rooms
    Route::any('get_room', 'HotelRoomController@getRoom');
    Route::any('create_room', 'HotelRoomController@createRoom');
    Route::any('update_room', 'HotelRoomController@updateRoom');
    Route::any('delete_room', 'HotelRoomController@deleteRoom');
    Route::any('get_cate_details', 'HotelRoomController@getCatDetails');
    Route::any('create_multi_room', 'HotelRoomController@createMultiRoom');

    # Room Plan
    Route::any('get_room_plan', 'HotelRoomController@getRoomPlan');
    Route::any('create_room_plan', 'HotelRoomController@createRoomPlan');
    Route::any('update_room_plan', 'HotelRoomController@updateRoomPlan');
    Route::any('delete_room_plan', 'HotelRoomController@deleteRoomPlan');
    # Room View
    Route::any('get_room_view', 'HotelRoomController@getRoomView');
    Route::any('create_room_view', 'HotelRoomController@createRoomView');
    Route::any('update_room_view', 'HotelRoomController@updateRoomView');
    Route::any('delete_room_view', 'HotelRoomController@deleteRoomView');

    #Booking Inquiry
    Route::any('get_booking_inq', 'HotelBooingInqController@getBookingInq');
    Route::any('create_booking_inq', 'HotelBooingInqController@createBookingInq');
    Route::any('update_booking_inq', 'HotelBooingInqController@updateBookingInq');
    Route::any('delete_booking_inq', 'HotelBooingInqController@deleteBookingInq');
    Route::any('follow_up_booking_inq', 'HotelBooingInqController@followUpBookingInq');

    Route::any('get_inq_type', 'HotelBooingInqController@getInqType');
    Route::any('create_inq', 'HotelBooingInqController@createInqType');
    Route::any('update_inq', 'HotelBooingInqController@updateInqType');
    Route::any('delete_inq', 'HotelBooingInqController@deleteInqType');

    Route::any('get_bus_sou', 'HotelBusinessSourceController@getBusSou');
    Route::any('create_bus_sou', 'HotelBusinessSourceController@createBusSou');
    Route::any('update_bus_sou', 'HotelBusinessSourceController@updateBusSou');
    Route::any('delete_bus_sou', 'HotelBusinessSourceController@deleteBusSou');

    Route::any('get_boo_sou', 'HotelBookingSourceController@getBooSou');
    Route::any('create_boo_sou', 'HotelBookingSourceController@createBooSou');
    Route::any('update_boo_sou', 'HotelBookingSourceController@updateBooSou');
    Route::any('delete_boo_sou', 'HotelBookingSourceController@deleteBooSou');

    #Hotel Reservation Api
    Route::any('get_reservation', 'HotelReservationController@getReservation');
    Route::any('create_reservation', 'HotelReservationController@createReservation');
    Route::any('update_reservation', 'HotelReservationController@updateReservation');
    Route::any('delete_reservation', 'HotelReservationController@deleteReservation');
    #Terms & Condition
    Route::POST('get_tnc', 'HotelTncCnpController@getTnc');
    Route::POST('cr_tnc', 'HotelTncCnpController@createTnc');
    Route::POST('upd_tnc', 'HotelTncCnpController@updateTnc');
    Route::POST('del_tnc', 'HotelTncCnpController@deleteTnc');

    #Cancellation Policy
    Route::POST('get_cp', 'HotelTncCnpController@getCp');
    Route::POST('cr_cp', 'HotelTncCnpController@createCp');
    Route::POST('upd_cp', 'HotelTncCnpController@updateCp');
    Route::POST('del_cp', 'HotelTncCnpController@deleteCp');
});
