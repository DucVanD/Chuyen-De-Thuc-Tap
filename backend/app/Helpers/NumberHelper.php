<?php

namespace App\Helpers;

use NumberFormatter;

class NumberHelper
{
    /**
     * Chuyển số thành chữ tiếng Việt
     * Ví dụ: 140000 => "một trăm bốn mươi nghìn"
     */
    public static function convertToWords($number)
    {
        if (!class_exists('NumberFormatter')) {
            return $number;
        }

        $fmt = new NumberFormatter('vi', NumberFormatter::SPELLOUT);
        return ucfirst($fmt->format($number));
    }
}
