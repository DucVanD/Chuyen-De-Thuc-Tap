<?php
// config/vnpay.php


return [
    'vnp_url' => env('VNP_URL', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'),
    'vnp_return_url' => env('VNP_RETURN_URL', 'http://localhost:5173/payment-success'),
    'vnp_tmn_code' => env('VNP_TMN_CODE', '58GDTJ08'),
    'vnp_hash_secret' => env('VNP_HASH_SECRET', 'UXKYHCGWJ7URPR78UOXP4FJ2L8SRODYC'),

];
