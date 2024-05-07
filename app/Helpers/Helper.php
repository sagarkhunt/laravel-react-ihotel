<?php
namespace App\Helpers;

use App\Models\HotelConn;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Helper
{
    public static function change_database()
    {
        $hotel_connection = config('database.connections.mysql');
        $user = auth()->user();
        if ($user) {
            $hotel_conn =  HotelConn::where('hotel_id', auth()->user()->hotel_id)->first();
            $hotel_connection['database'] = $hotel_conn->db_name;
            
            // when we use in local then no need to user password
            $hotel_connection['username'] = $hotel_conn->db_un;
            $hotel_connection['password'] = $hotel_conn->db_pwd;
            
            config(['database.connections.ihotel' => $hotel_connection]);
        }
    }

    public static function change_database_using_hotel_id($id)
    {
        $hotel_connection = config('database.connections.ihotel');
        $hotel_conn = HotelConn::where('hotel_id', $id)->first();
        $hotel_connection['database'] = $hotel_conn->db_name;
        // when we use in local then no need to user password
        $hotel_connection['username'] = $hotel_conn->db_un;
        $hotel_connection['password'] = $hotel_conn->db_pwd;
        // dd($hotel_connection);
        config(['database.connections.ihotel' => $hotel_connection]);
    }

    // public static function connect_store_database()
    // {
    //     $hotel_connection = config('database.connections.ihotel');
    //     $user = auth()->user();
    //     if ($user) {
    //         $hotel_conn =  HotelConn::where('hotel_id', auth()->user()->hotel_id)->first();
    //         $hotel_connection['database'] = $hotel_conn->database_name;

    //         // when we use in local then no need to user password
    //         $hotel_connection['username'] = $hotel_conn->user_name;
    //         $hotel_connection['password'] = $hotel_conn->pwd;
    //         config(['database.connections.store' => $hotel_connection]);
    //     }
    // }

    // public static function change_database_using_store_id($id)
    // {
    //     $hotel_connection = config('database.connections.ihotel');
    //     $hotel_conn = HotelConn::where('hotel_id', $id)->first();
    //     $hotel_connection['database'] = $hotel_conn->database_name;
    //     // when we use in local then no need to user password
    //     $hotel_connection['username'] = $hotel_conn->user_name;
    //     $hotel_connection['password'] = $hotel_conn->pwd;
    //     config(['database.connections.store' => $hotel_connection]);
    // }

    public static function get_store_public_url($hotel_id, $assetsName = NULL) {
        $HotelConn = HotelConn::where("hotel_id",$hotel_id)->first();
        if($HotelConn){
            $bucket_url_flag = $HotelConn->bucket_url_flag;
            
            if($bucket_url_flag == 1) {
                $storeBasePath = $HotelConn->bucket_url."/".$hotel_id."/";
                $s3BaseURL = Storage::disk('s3')->url("/public/");
                $public_dir_url = $s3BaseURL;
            } else {
                $storeBasePath = "treasure/".$hotel_id."/";
                $public_dir_url = url("/public/")."/";
            }      
            $store_dir_url = $public_dir_url.$storeBasePath;
        } else {
            $store_dir_url = "";
        }
        /*$data = array(
            "public_store_url" => $store_dir_url
        );*/
        return $store_dir_url;
    }

    public static function upload_file($file_name, $file, $path, $bucket_flag = 0){
               
        # Validate File
        if (!$file->isValid()) {
            return false;
        }
    
        # Check file type for basic security
        $allowedFileTypes = ['jpeg', 'png', 'jpg', 'gif', 'bmp', 'pdf', 'doc', 'docs', 'xls'];
        $extension = strtolower($file->getClientOriginalExtension());
    
        if (!in_array($extension, $allowedFileTypes)) {
            return false;
        }
    
        if ($bucket_flag == 0) {
            # Move the file to the desired path with the provided name
            $file->move($path, $file_name);

            return true;
    
        } elseif ($bucket_flag == 1) {
            $s3 = Storage::disk('s3_public');
            $filePath = $path . $file_name;
            $s3->put($filePath, file_get_contents($file), 'public');
            return true;
        }
        
        return false;
    }

    public static function delete_file($file_name, $folder_path, $hotel_id = 0){
        $HotelConn = HotelConn::where('hotel_id', $hotel_id)
            ->select('bucket_flag','bucket_url')
            ->first();
            
        $bucket_flag = $HotelConn->bucket_flag ?? 0;

        if($bucket_flag == 1 ){
            $destinationPath = "public/".$HotelConn->bucket_url."/$hotel_id/archive/".$folder_path."/";
            $s3 = Storage::disk('s3_public');
            $filePath = $destinationPath . $file_name;
            $s3->delete($filePath);
        } else {
            $destinationPath = "public/treasure/".$hotel_id."/archive/".$folder_path."/";
            File::delete($destinationPath.$file_name);
        }
    }

    public static function insert_login_log($user_id, $result, $frm, $product_id, $failed_login = null)
    {

        ## $frm = 1 Mobile $frm = 2 Browser
        ## $result = 0-auth failed, 1-out of geofencing, 2-device id mismatch, 3-validity expired, 9-success

        if ($result != 1) {
            $get_user = User::where('id', $user_id)->first();
        }

        $insertLog = new LoginLog();
        $insertLog->store_id = $user_id == 0 ? 0 : $get_user->store_id;
        $insertLog->user_id = $user_id;
        $insertLog->role_id = $user_id == 0 ? 0 : $get_user->role_id;
        $insertLog->result = $result;
        $insertLog->product_id = $product_id;
        $insertLog->frm = $frm;
        $insertLog->failed_login = $failed_login;
        $insertLog->created_at = date('Y-m-d H:i:s');

        $insertLog->save();


        return 0;
    }
}