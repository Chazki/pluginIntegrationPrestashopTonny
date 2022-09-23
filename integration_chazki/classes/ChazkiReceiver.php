<?php

if($data = json_decode(file_get_contents('php://input'))) {
    require_once(dirname(__FILE__).'/ChazkiCollector.php');
    // echo "<pre>";
    // print_r(_PS_BASE_URL_ . __PS_BASE_URI__);
    // echo "</pre>";

    // die();
    $updateResource = array(
        'orderStatus' => (int)$data->order_status,
        'orderID' => (string)$data->order_id
    );
    ChazkiCollector::updateOrderStatus($updateResource, Configuration::get(_DB_PREFIX_.'CHAZKI_WEB_SERVICE_API_KEY'));
} else {
    $data = "no entro al if";
}