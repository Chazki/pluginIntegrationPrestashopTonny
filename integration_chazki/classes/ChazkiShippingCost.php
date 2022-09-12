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

class ChazkiShippingCost
{
    const CHAZKI_API_SHIPPING = 'https://college-krash.herokuapp.com/api/callback';

    public function __construct($module)
    {
        $this->module = $module;
        $this->context = Context::getContext();
    }

    public function loadCity($cart)
    {
        $address = new Address($cart->id_address_delivery);
        $this->city = $address->city;
    }

    protected static function sendChazki($postUrl, $params)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $postUrl,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $params,
        ));

        $response = curl_exec($curl);

        //$http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
    }

    protected function getShippingCost($cart)
    {
        if (extension_loaded('curl') == false) {
            $this->_errors[] = $this->l('You have to enable the cURL extension on your server to install this module');
            return false;
        }
        $bodyJSON = new stdClass();
        $bodyJSON = json_encode($this->module);
        $this->sendChazki(self::CHAZKI_API_SHIPPING, $bodyJSON);
    }

    public function run($cart, $shipping_fees)
    {
        $this->loadCity($cart);
        $this->getShippingCost($cart);
        return 30 + $shipping_fees;
    }
}
