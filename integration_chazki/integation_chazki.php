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

require_once(dirname(__FILE__).'/classes/ChazkiInstall.php');
require_once(dirname(__FILE__).'/classes/ChazkiHelper.php');
require_once(dirname(__FILE__).'/classes/ChazkiShippingCost.php');

class Integration_chazki extends CarrierModule
{
    const MODULE_API_KEY_NAME = 'CHAZKI_API_KEY';
    const MODULE_BRANCH_ID_NAME = 'CHAZKI_BRANCH_ID';
    const MODULE_PICKUP_ADDRESS_NAME = 'CHAZKI_PICKUP_ADDRESS';
    const MODULE_PICKUP_CONTACT_NAME = 'CHAZKI_PICKUP_CONTACT';
    const MODULE_PICKUP_PHONE_NAME = 'CHAZKI_PICKUP_PHONE';
    const MODULE_PICKUP_EMAIL_NAME = 'CHAZKI_PICKUP_EMAIL';
    const IS_API_SETTINGS_TAB = 'IS_CHAZKI_API_SET';

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

        $this->chazki_install = new ChazkiInstall($this);
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        $this->chazki_install->installCarriers();
        
        Configuration::updateValue('INTEGATION_CHAZKI_LIVE_MODE', false);

        return parent::install() &&
            $this->registerHook('header') &&
            $this->registerHook('backOfficeHeader') &&
            $this->registerHook('updateCarrier') &&
            $this->registerHook('actionCarrierUpdate') &&
            $this->registerHook('displayAdminOrder') &&
            $this->registerHook('actionValidateOrder');
    }

    public function uninstall()
    {
        Configuration::deleteByName('INTEGATION_CHAZKI_LIVE_MODE');

        include(dirname(__FILE__).'/sql/uninstall.php');

        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        $output = '';

        if (((bool)Tools::isSubmit('submitIntegration_chazkiModule')) == true) {
            $api_key = trim((string)Tools::getValue(self::MODULE_API_KEY_NAME));
            if ($api_key) {
                ChazkiHelper::updateValue(self::MODULE_API_KEY_NAME, $api_key);
            } else {
                ChazkiHelper::setNotification(
                    $this->l('The entered API key is not accepted Spring GDS, contact your manager'),
                    ChazkiHelper::MSG_TYPE_ERROR
                );
            }
        }

        $api_id = ChazkiHelper::get(self::MODULE_API_KEY_NAME);

        if ($api_id) {
            $this->getSettings();
        }

        $output .= $this->displaySettingsApiForm();

        return $output;
    }

    /**
     * Get settings by API and save
     *
     * @return bool
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function getSettings()
    {
        return true;
    }

    /**
     * Form API key
     *
     * @return string HTML for the bo page
     * @throws Exception
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws SmartyException
     */
    protected function displaySettingsApiForm()
    {
        // Get default language
        $default_lang = (int)ChazkiHelper::get('PS_LANG_DEFAULT');
        $api_key = ChazkiHelper::get(self::MODULE_API_KEY_NAME);
        $api_key_msg = $this->l('You can obtain an API key by contacting us at Chazki');

        // Init Fields form array
        $fields_form = array();
        $fields_form[0]['form'] = array(
            'legend' => array(
                'title' => $this->l('API Settings'),
                'icon' => 'icon-cogs',
            ),
            'description' => $api_key_msg,
            'input' => array(
                array(
                    'type' => 'hidden',
                    'name' => self::IS_API_SETTINGS_TAB,
                ),
                array(
                    'type' => 'text',
                    'name' => self::MODULE_API_KEY_NAME,
                    'label' => $this->l('Enterprise Key'),
                    'maxlength' => 255,
                    'required' => true
                ),
                array(
                    'type' => 'text',
                    'name' => self::MODULE_BRANCH_ID_NAME,
                    'label' => $this->l('Codigo Sucursal'),
                    'maxlength' => 255,
                    'required' => true
                ),
                array(
                    'type' => 'text',
                    'name' => self::MODULE_PICKUP_ADDRESS_NAME,
                    'label' => $this->l('Dirección Colecta'),
                    'maxlength' => 255,
                    'required' => true
                ),
            ),
            'submit' => array(
                'title' => $this->l('Save'),
                'class' => 'btn btn-default pull-right'
            )
        );

        $helper = new HelperForm();

        // Module, token and currentIndex
        $helper->module = $this;
        $helper->name_controller = $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;

        // Language
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        // Title and toolbar
        $helper->title = $this->displayName;
        $helper->show_toolbar = true;        // false -> remove toolbar
        $helper->toolbar_scroll = true;      // yes - > Toolbar is always visible on the top of the screen.
        $helper->submit_action = 'submitIntegration_chazkiModule';
        $helper->toolbar_btn = array(
            'save' => array(
                'desc' => $this->l('Save'),
                'href' => AdminController::$currentIndex . '&configure=' . $this->name . '&save' . $this->name .
                '&token=' . Tools::getAdminTokenLite('AdminModules'),
            ),
            'back' => array(
                'href' => AdminController::$currentIndex . '&token=' . Tools::getAdminTokenLite('AdminModules'),
                'desc' => $this->l('Back to list')
            )
        );

        // Load current value
        $helper->fields_value[self::IS_API_SETTINGS_TAB] = 1;
        $helper->fields_value[self::MODULE_API_KEY_NAME] = $api_key;

        return $helper->generateForm($fields_form);
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitIntegration_chazkiModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                'title' => $this->l('Settings'),
                'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Live mode'),
                        'name' => 'INTEGATION_CHAZKI_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->l('Use this module in live mode'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'col' => 3,
                        'type' => 'text',
                        'prefix' => '<i class="icon icon-envelope"></i>',
                        'desc' => $this->l('Enter a valid email address'),
                        'name' => 'INTEGATION_CHAZKI_ACCOUNT_EMAIL',
                        'label' => $this->l('Email'),
                    ),
                    array(
                        'type' => 'password',
                        'name' => 'INTEGATION_CHAZKI_ACCOUNT_PASSWORD',
                        'label' => $this->l('Password'),
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        return array(
            'INTEGATION_CHAZKI_LIVE_MODE' => Configuration::get('INTEGATION_CHAZKI_LIVE_MODE', true),
            'INTEGATION_CHAZKI_ACCOUNT_EMAIL' => Configuration::get('INTEGATION_CHAZKI_ACCOUNT_EMAIL', 'contact@prestashop.com'),
            'INTEGATION_CHAZKI_ACCOUNT_PASSWORD' => Configuration::get('INTEGATION_CHAZKI_ACCOUNT_PASSWORD', null),
        );
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    public function getOrderShippingCost($params, $shipping_cost)
    {
        if (Context::getContext()->customer->logged == true)
        {
            $id_address_delivery = Context::getContext()->cart->id_address_delivery;
            $address = new Address($id_address_delivery);

            $chazki_ship = new ChazkiShippingCost($this);

            /**
             * Send the details through the API
             * Return the price sent by the API
             */
            return $chazki_ship->run($params, $shipping_cost);
        }

        return $shipping_cost;
    }

    public function getOrderShippingCostExternal($params)
    {
        return getOrderShippingCost($params, 0);
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

    public function hookActionValidateOrder()
    {
        /* Place your code here. */
    }

    public function hookActionCarrierUpdate($params)
    {
        if ($params['carrier']->id_reference == Configuration::get(_DB_PREFIX_ . 'SAME_DAY_reference')) {
            Configuration::updateValue(_DB_PREFIX_ . 'SAME_DAY', $params['carrier']->id);
        }
        if ($params['carrier']->id_reference == Configuration::get(_DB_PREFIX_ . 'NEXT_DAY_reference')) {
            Configuration::updateValue(_DB_PREFIX_ . 'NEXT_DAY', $params['carrier']->id);
        }
    }
}
