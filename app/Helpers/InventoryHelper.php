<?php
namespace App\Helpers;

use App\Models\InOutItems;
use App\Models\ItemMaster;

class InventoryHelper 
{
    public static function doInOut($itemID, $itemStock, $vchType, $referenceID = 0)
    {

        $item = new ItemMaster($itemID);

        $inoutInsert = array(
          "vch_type" => $vchType,
          "reference_id" => $referenceID,
          "item_id" => $itemID
        );
        $inout = InOutItems::create($inoutInsert);
        if($inout){
            $newStock = 0;
            switch($vchType)
            {
                case 1:
                case 3:
                case 5:
                    $newStock = $item->stk_in_hand - $itemStock;
                break;
                case 2:
                case 4:
                    $newStock = $item->stk_in_hand + $itemStock;
                break;
            }
            $item->stk_in_hand = $newStock;
            $item->save();
        }
    }
}