<?php 

if (!function_exists('generateRandomString')) {
    function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }
}

if (!function_exists('calculateDiscountAmount')) {
    function calculateDiscountAmount($amount, $discountType, $discountValue) {
        $discountAmount = 0;
        $discountedAmount = 0;
    
        if ($discountType === 1) { //PERCENTAGE
            if ($discountValue >= 0 && $discountValue <= 100) {
                $discountAmount = ($discountValue / 100) * $amount;
                $discountedAmount = $amount - $discountAmount;
            } else {
                // Invalid percentage discount value
                return "Invalid percentage discount value.";
            }
        } elseif ($discountType === 2) { //FLAT
            if ($discountValue >= 0) {
                if ($discountValue <= $amount) {
                    $discountAmount = $discountValue;
                    $discountedAmount = $amount - $discountAmount;
                } else {
                    // Discount cannot exceed the total amount
                    return "Discount cannot exceed the total amount.";
                }
            } else {
                // Invalid flat discount value
                return "Invalid flat discount value.";
            }
        } else {
            // Invalid discount type
            return "Invalid discount type. Please use 'percentage' or 'flat'.";
        }
    
        return [
            "originalAmount" => $amount,
            "discountType" => $discountType,
            "discountValue" => $discountValue,
            "discountAmount" => $discountAmount,
            "discountedAmount" => $discountedAmount,
        ];
    }
}

if (!function_exists('dateFormat')) {
    function dateFormat($date,$format){
        return \Carbon\Carbon::createFromFormat('Y-m-d', $date)->format($format);    
    }
}

if (!function_exists('truncateStr')) {
    function truncateStr($string, $limit, $repl = '...')
    {
        if (strlen($string) > $limit) {
            $repl_len = strlen($repl);
            return substr($string, 0, $limit - $repl_len) . '...';
        }
        return $string;
    }
}

if (!function_exists('calculateTaxAmount')) {
    function calculateTaxAmount($amount, $tax_tmpl_json, $tax_inclusion_type = 1) {

        $itemTaxArr = json_decode($tax_tmpl_json);
                                
        $totalTaxAmt = $taxAmt = 0;
                            
        for($k=0;$k<sizeof($itemTaxArr);$k++) {

            if($tax_inclusion_type == 1) {  
                $taxAmt = $amount * (($itemTaxArr[$k]->tax_rate)/100);

            } elseif($tax_inclusion_type == 2){  

                if($itemTaxArr[$k]->tax == "SGST" || $itemTaxArr[$k]->tax == "CGST"){
                    $taxAmt = (($amount * ($itemTaxArr[$k]->tax_rate * 2)) / (100 + ($itemTaxArr[$k]->tax_rate * 2) )) / 2;
                } else {
                    $taxAmt = (($amount * $itemTaxArr[$k]->tax_rate) / (100 + $itemTaxArr[$k]->tax_rate ));
                }
            }
                
            $itemTaxArr[$k]->tax_amt = $taxAmt;
            
            $totalTaxAmt += $taxAmt;
        }

        return [
            "before_tax_amount" => $amount,
            "tax_inclusion_type" => $tax_inclusion_type,
            "tax_json" => $itemTaxArr,
            "total_tax_amount" => $totalTaxAmt,
            "after_tax_amount" => $tax_inclusion_type == 2 ? ($amount - $totalTaxAmt) : $amount,
        ];
    }
}
