<?php

if($data = json_decode(file_get_contents('php://input'))) {
    require_once(dirname(__FILE__).'/ChazkiCollector.php');
    $updateResource = array(
        'orderStatus' => (int)$data->order_status,
        'orderID' => (string)$data->order_id
    );
    ChazkiCollector::updateOrderStatus($updateResource, 'VWwm3qohGCYXSDP31ZhBsPMMhcNbkWk5');
} else {
    $data = "no entro al if";
}