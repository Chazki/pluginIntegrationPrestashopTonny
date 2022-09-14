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
    const CHAZKI_API_SHIPPING = 'https://webhook.site/386c0442-b434-4b45-800e-174a207a9143';
    //'https://college-krash.herokuapp.com/api/callback';

    public function __construct($module)
    {
        $this->module = $module;
        $this->context = Context::getContext();
    }

    public function loadDropAddress($cart)
    {
        $this->address_obj = new Address($cart->id_address_delivery);
        $this->drop_address = ($this->address_obj->address1)
            ? $this->address_obj->address1
            : $this->address_obj->address2;
        
        if ($this->address_obj->city) {
            $this->drop_address = $this->drop_address . ', ' . $this->address_obj->city;
        }

        if ($this->address_obj->country) {
            $this->drop_address = $this->drop_address . ', ' . $this->address_obj->country;
        }
    }

    public function loadPickupAddress()
    {
        $this->service_name = ChazkiHelper::get(
            Tools::strtoupper(
                _DB_PREFIX_ . ChazkiInstallPanel::MODULE_SERVICE_NAME
            )
        );
        $this->enterprise_key = ChazkiHelper::get(
            Tools::strtoupper(
                _DB_PREFIX_ . ChazkiInstallPanel::MODULE_API_KEY_NAME
            )
        );

        if (ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . ChazkiInstallPanel::MODULE_BRANCH_ID_NAME))) {
            $this->pickup_address = 'Jr. Gonzales Prada 280, Miraflores, Lima';
        } else {
            $this->pickup_address = ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . 'SHOP_ADDR1'));
            
            if (ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . 'SHOP_CITY'))) {
                $this->pickup_address = $this->pickup_address . ', '.
                    ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . 'SHOP_CITY'));
            }
            
            if (ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . 'SHOP_COUNTRY'))) {
                $this->pickup_address = $this->pickup_address . ', '.
                    ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . 'SHOP_COUNTRY'));
            }
        }
    }

    /*protected static function sendChazki($postUrl, $params, $headers)
    {
        if (extension_loaded('curl') == false) {
            $this->_errors[] = $this->l('You have to enable the cURL extension on your server to install this module');
            return false;
        }

        if($headers && count($headers) > 0) {
            array_push($headers, 'Content-Type:application/json');
        } else {
            $headers = array('Content-Type:application/json');
        }

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $postUrl,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $params,
        ));

        $response = curl_exec($curl);

        //$http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
    }*/

    protected function getShippingCost()
    {
        $bodyObj = array(
            'pickupAddress' => $this->pickup_address,
            'serviceName' => $this->service_name,
            'dropAddress' => array(
                $this->drop_address
            )
        );

        $bodyJSON = new stdClass();
        $bodyJSON = json_encode($bodyObj);

        $api_chazki = new ChazkiApi($this->module);
        $api_chazki->sendPost(
            self::CHAZKI_API_SHIPPING,
            $bodyJSON,
            array('enterprise-key:' . $this->enterprise_key)
        );
    }

    public function run($cart, $shipping_fees)
    {
        $this->loadDropAddress($cart);
        $this->loadPickupAddress();
        $this->getShippingCost();
        return 30 + $shipping_fees;
    }
}
