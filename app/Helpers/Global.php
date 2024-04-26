<?php

use Illuminate\Support\Facades\URL;

if (!function_exists("assetsURL")) {
    
    function assetsURL($path = "")
    {
        $url = URL("/assets/" . $path);
        return $url;
    }
}

if (!function_exists("commonAssetsURL")) {
    
    function commonAssetsURL($path = "")
    {
        $version = config('common.resources_blade_version');
        // $url = URL("/assets/v1/common/" . $path);
        $url = URL("/assets/$version/common/$path");
        return $url;
    }
}

if (!function_exists("websiteAssetsURL")) {
    function websiteAssetsURL($path = "")
    {
        $version = Config('common.resources_blade_version');
        $url = URL("/assets/$version/" . $path);
        return $url;
    }
}

if (!function_exists("restoAssetsURL")) {

    function restoAssetsURL($path = "")
    {
        
        // $url = URL("/assets/v2/resto/" . $path);
        $version = Config('common.resources_blade_version');
        $url = URL("/assets/$version/js/$path");
        return $url;
    }
}
if (!function_exists("digitalMenuAssetsURL")) {

    function imageAssetsURL($path = "")
    {
        $version = config('common.resources_blade_version');
        // $url = URL("/assets/v1/digital-menu/" .$path);
        $version = Config('common.resources_blade_version');
        $url = URL("/assets/$version/$path");
        return $url;
    }
}
if (!function_exists("digitalMenuPluginAssetsURL")) {

    function digitalMenuPluginAssetsURL($path = "")
    {
        $version = config('common.resources_blade_version');
        // $url = URL("/assets/v2/plugins/" . $path);
        $url = URL("/assets/$version/plugins/$path");
        return $url;
    }
}
