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

if (!defined('_PS_VERSION_')) {
    exit;
}

require_once(dirname(__FILE__).'/classes/ChazkiInstallCarrier.php');
require_once(dirname(__FILE__).'/classes/ChazkiInstallPanel.php');
require_once(dirname(__FILE__).'/classes/ChazkiUninstall.php');
require_once(dirname(__FILE__).'/classes/ChazkiCollector.php');
require_once(dirname(__FILE__).'/classes/ChazkiHelper.php');
require_once(dirname(__FILE__).'/classes/ChazkiTools.php');
require_once(dirname(__FILE__).'/classes/ChazkiApi.php');
require_once(dirname(__FILE__).'/classes/ChazkiShippingCost.php');
require_once(dirname(__FILE__).'/classes/ChazkiOrders.php');

class Integration_chazki extends CarrierModule
{
    protected $config_form = false;
    protected $carrier_id_service_code;

    public function __construct()
    {
        $this->name = 'integration_chazki';
        $this->tab = 'shipping_logistics';
        $this->version = '1.0.0';
        $this->author = 'Chazki';
        $this->need_instance = 1;
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Integration Chazki');
        $this->description = $this->l('Integration of chazki for acount of service');

        $this->confirmUninstall = $this->l('¿Esta seguro que desea desinstalar?');

        $this->chazki_carrier = new ChazkiInstallCarrier($this);
        $this->chazki_panel = new ChazkiInstallPanel($this);
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        include(dirname(__FILE__).'/sql/install.php');
        $this->chazki_carrier->installCarriers();
        $this->chazki_carrier->enableWebService();
        
        ChazkiHelper::updateValue(_DB_PREFIX_.'CHAZKI_WEB_SERVICE_API_KEY', $this->chazki_carrier::$chazkiKey);
        Configuration::updateValue('INTEGATION_CHAZKI_LIVE_MODE', false);

        return parent::install() &&
            $this->registerHook('header') &&
            $this->registerHook('backOfficeHeader') &&
            $this->registerHook('updateCarrier') &&
            $this->registerHook('actionCarrierUpdate') &&
            $this->registerHook('displayAdminOrder') &&
            $this->registerHook('actionAdminOrdersListingFieldsModifier') &&
            $this->registerHook('actionValidateOrder');
    }

    public function uninstall()
    {
        //include(dirname(__FILE__).'/sql/uninstall.php');
        $chazki_uninstall = new ChazkiUninstall($this);
        $chazki_uninstall->uninstall();

        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        return $this->chazki_panel->getContent();
    }

    public function getOrderShippingCost($params, $shipping_cost)
    {
        if (Context::getContext()->customer->logged == true)
        {
            $chazki_ship = new ChazkiShippingCost($this);
            return $chazki_ship->run($params, $shipping_cost);
        }

        return $shipping_cost;
    }

    public function getOrderShippingCostExternal($params)
    {
        return $this->getOrderShippingCost($params, 0);
    }

    /**
    * Add the CSS & JavaScript files you want to be loaded in the BO.
    */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }

    public function hookUpdateCarrier($params)
    {
        /**
         * Not needed since 1.5
         * You can identify the carrier by the id_reference
        */
    }

    public function hookActionValidateOrder($params)
    {
        $orderObj = $params['order'];
        $orderStatusObj = $params['orderStatus'];
        
        $address_id = $orderObj->id_address_delivery;
        $addressJSON = ChazkiCollector::getAddress(strval($address_id), $this->chazki_carrier::$chazkiKey);
        $address_decoded = json_decode($addressJSON);
        $customer_id = $orderObj->id_customer;
        $customerJSON = ChazkiCollector::getCustomers(strval($customer_id), $this->chazki_carrier::$chazkiKey);
        $customer_decoded = json_decode($customerJSON);
        $order_id = $orderObj->id;
        $orderJSON = ChazkiCollector::getOrder(strval($order_id), $this->chazki_carrier::$chazkiKey);
        $order_decoded = json_decode($orderJSON);
        $orderDetailsJSON = ChazkiCollector::getOrderDet($order_decoded->order->associations->order_rows[0]->id, $this->chazki_carrier::$chazkiKey);
        $order_details_decoded = json_decode($orderDetailsJSON);

        $chazkiOrder = array(
            'customer' => $customer_decoded->customer,
            'address' => $address_decoded->address,
            'order' => $order_decoded->order,
            'order_details' => $order_details_decoded->order_detail
        );

        $new_order = new ChazkiOrders($this);

        if($new_order->validateOrder()) {
            $chazkiorderreturn = $new_order->buildOrder($chazkiOrder);
            $new_order->generateOrder($chazkiorderreturn);

        }

        // echo "<pre>";
        // print_r($chazkiorderreturn);
        // echo "<pre>";
        
        // die();
    }

    public function hookActionCarrierUpdate($params)
    {
        if ($params['carrier']->id_reference == Configuration::get(Tools::strtoupper(_DB_PREFIX_ . 'CHAZKI_SERVICE_CARRIER_reference'))) {
            Configuration::updateValue(
                Tools::strtoupper(_DB_PREFIX_ . 'CHAZKI_SERVICE_CARRIER'),
                $params['carrier']->id
            );
        }
    }

    /**
     * Edit order grid display
     *
     * @param array $params
     * @throws PrestaShopException
     */
    public function hookActionAdminOrdersListingFieldsModifier($params)
    {
        $this->hookActionAdminOrdersListingFieldsModifierBody($params);
    }

    /**
     * Edit order grid display
     *
     * @param array $params
     * @throws PrestaShopException
     */
    public function hookActionAdminOrdersListingFieldsModifierBody(&$params)
    {
        if (isset($params['select'])) {
            $table = _DB_PREFIX_ . "integration_chazki";
            $params['select'] .=
                    ", $table.tracking_number as spring_service, 
                    IFNULL($table.status_code, -10) as spring_status ";

            $params['join'] .= " LEFT JOIN $table ON $table.id_order=a.id_order";

            $params['fields']['spring_service'] = array(
                'title' => $this->displayName,
                'class' => 'fixed-width-lg',
                'callback' => 'printTrackTrace',
                'callback_object' => 'ChazkiTools',
                'search' => false,
                'orderby' => false,
                'remove_onclick' => true,
            );

            $params['fields']['spring_status'] = array(
                    'title' => '',
                    'class' => 'fixed-width-sm',
                    'callback' => 'printLabelIcon',
                    'callback_object' => 'ChazkiTools',
                    'search' => false,
                    'orderby' => false,
                    'remove_onclick' => true,
            );
        }
    }
}
