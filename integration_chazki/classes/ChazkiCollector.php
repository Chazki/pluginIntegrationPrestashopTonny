<?php
/**
* 2007-2022 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2022 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

class ChazkiCollector
{
    public function __construct($module)
    {
        $this->module = $module;
    }

    public function getAddress($resource_id, $chazkiAccess)
    {
        $curl = curl_init();
        $url = 'http://localhost/tienda-prueba-ps/api/addresses/' . $resource_id . '?output_format=JSON';
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_USERPWD => $chazkiAccess . ":''",
        ));

        $response = curl_exec($curl);

        return $response;
    }

    public function getCustomers($resource_id, $chazkiAccess)
    {
        $curl = curl_init();
        $url = 'http://localhost/tienda-prueba-ps/api/customers/' . $resource_id . '?output_format=JSON';
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_USERPWD => $chazkiAccess . ":''",
        ));

        $response = curl_exec($curl);

        return $response;
    }

    public function getOrder($resource_id, $chazkiAccess)
    {
        $curl = curl_init();
        $url = 'http://localhost/tienda-prueba-ps/api/orders/' . $resource_id . '?output_format=JSON';
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_USERPWD => $chazkiAccess . ":''",
        ));

        $response = curl_exec($curl);

        return $response;
    }

    public function getOrderDet($resource_id, $chazkiAccess)
    {
        $curl = curl_init();
        $url = 'http://localhost/tienda-prueba-ps/api/order_details/' . $resource_id . '?output_format=JSON';
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_USERPWD => $chazkiAccess . ":''",
        ));

        $response = curl_exec($curl);

        return $response;
    }

    public function updateOrderStatus($resource_id, $chazkiAccess)
    {
        $curl = curl_init();
        $url = 'http://localhost/tienda-prueba-ps/api/order_details/' . $resource_id . '?output_format=JSON';
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_USERPWD => $chazkiAccess . ":''",
            CURLOPT_CUSTOMREQUEST => "PUT",
            CURLOPT_POSTFIELDS => $data)
        );

        $response = curl_exec($curl);

        return $response;
    }
}