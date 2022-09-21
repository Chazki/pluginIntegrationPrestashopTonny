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

class ChazkiOrders
{
    public function __construct($module)
    {
        $this->module = $module;
    }

    const CHAZKI_API_ORDERS = 'https://us-central1-chazki-link-beta.cloudfunctions.net/uploadClientOrders';
    
    public function validateOrder()
    {
        return true;
    }

    public function buildOrder($params)
    {
        $chazkiOrder = new stdClass();

        $chazkiOrder->enterpriseKey = ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . ChazkiInstallPanel::MODULE_API_KEY_NAME));
        $chazkiOrder->orders = array(
            'trackCode' => $params['order']->reference,
            'paymentMethodID' => 'PAGADO',
            'paymentProofID' => 'BOLETA',
            'serviceID' => 'SAME DAY',
            'packageEnvelope' => 'Caja',
            'packageWeight' => 0,
            'packageSizeID' => 'S',
            'packageQuantity' => intval($params['order_details']->product_quantity),
            'productDescription' => $params['order_details']->product_name,
            'productPrice' => floatval($params['order_details']->product_price),
            'reverseLogistic' => 'NO',
            'crossdocking' => 'NO',
            'pickUpBranchID' => '',
            'pickUpAddress' => Configuration::get('PS_SHOP_ADDR1'),
            'pickUpPostalCode' => Configuration::get('PS_SHOP_CODE'),
            'pickUpAddressReference' => '-',
            'pickUpPrimaryReference' => '-',
            'pickUpSecondaryReference' => Configuration::get('PS_SHOP_CITY'),
            'pickUpNotes' => '',
            'pickUpContactName' => Configuration::get('PS_SHOP_NAME'),
            'pickUpContactPhone' => Configuration::get('PS_SHOP_PHONE'),
            'pickUpContactDocumentTypeID' => 'RUC',
            'pickUpContactDocumentNumber' => '12345678',
            'pickUpContactEmail' => Configuration::get('PS_SHOP_EMAIL'),
            'dropBranchID' => '',
            'dropAddress' => $params['address']->address1,
            'dropPostalCode' => $params['address']->postcode,
            'dropAddressReference' => '',
            'dropPrimaryReference' => '',
            'dropSecondaryReference' => $params['address']->city,
            'dropNotes' => '',
            'dropContactName' => $params['customer']->firstname . ' ' . $params['customer']->lastname,
            'dropContactPhone' => intval($params['address']->phone_mobile),
            'dropContactDocumentTypeID' => 'DNI',
            'dropContactDocumentNumber' => '12345678',
            'dropContactEmail' => $params['customer']->email,
            'providerID' => $params['order']->id,
            'providerName' => 'PRESTA',
            'shipmentPrice' => 0
        );

        return json_encode($chazkiOrder);

    }

    public function generateOrder($order)
    {
        $bodyJSON = $order;
        
        $api_chazki = new ChazkiApi($this->module);
        $api_chazki->sendPost(self::CHAZKI_API_ORDERS, $bodyJSON, array('enterprise-key: teienda'));
    }
}
