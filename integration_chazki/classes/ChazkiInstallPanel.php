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

class ChazkiInstallPanel
{
    const MODULE_API_KEY_NAME = 'CHAZKI_API_KEY';
    const MODULE_BRANCH_ID_NAME = 'CHAZKI_BRANCH_ID';
    const MODULE_SERVICE_NAME = 'CHAZKI_SERVICE';
    const IS_API_SETTINGS_TAB = 'IS_CHAZKI_API_SET';
    const MODULE_NAME = 'Integration_chazkiModule';

    public static $services_types = array(
        array('id' => 'SAME_DAY', 'name' => 'Same Day'),
        array('id' => 'NEXT_DAY', 'name' => 'Next Day')
    );

    public function __construct($module)
    {
        $this->module = $module;
        $this->context = Context::getContext();
    }

    public function getContent()
    {
        $output = '';

        if (((bool)Tools::isSubmit('submit' . self::MODULE_NAME)) == true) {
            $api_key = trim((string)Tools::getValue(Tools::strtoupper(_DB_PREFIX_.self::MODULE_API_KEY_NAME)));
            $branch_id = trim((string)Tools::getValue(Tools::strtoupper(_DB_PREFIX_.self::MODULE_BRANCH_ID_NAME)));
            $service_id = trim((string)Tools::getValue(Tools::strtoupper(_DB_PREFIX_.self::MODULE_SERVICE_NAME)));
            if ($api_key) {
                ChazkiHelper::updateValue(Tools::strtoupper(_DB_PREFIX_.self::MODULE_API_KEY_NAME), $api_key);
                ChazkiHelper::updateValue(Tools::strtoupper(_DB_PREFIX_.self::MODULE_BRANCH_ID_NAME), $branch_id);
                ChazkiHelper::updateValue(Tools::strtoupper(_DB_PREFIX_.self::MODULE_SERVICE_NAME), $service_id);
            } else {
                ChazkiHelper::setNotification(
                    $this->module->l('The entered API key is not accepted Spring GDS, contact your manager'),
                    ChazkiHelper::MSG_TYPE_ERROR
                );
            }
        }

        $api_id = ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . self::MODULE_API_KEY_NAME));

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
        //$default_lang = (int)ChazkiHelper::get('PS_LANG_DEFAULT');
        $api_key = ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . self::MODULE_API_KEY_NAME));
        $branch_id = ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . self::MODULE_BRANCH_ID_NAME));
        $service_id = ChazkiHelper::get(Tools::strtoupper(_DB_PREFIX_ . self::MODULE_SERVICE_NAME));
        $api_key_msg = $this->module->l('You can obtain an API key by contacting us at Chazki');

        // Init Fields form array
        $fields_form = $this->getConfigForm($api_key_msg);

        $helper = new HelperForm();

        // Module, token and currentIndex
        $helper->module = $this;
        $helper->name_controller = $this->module->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->module->name;

        // Language
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        // Title and toolbar
        $helper->title = $this->module->displayName;
        $helper->show_toolbar = true;
        $helper->toolbar_scroll = true;
        $helper->submit_action = 'submit'.self::MODULE_NAME;
        $helper->toolbar_btn = array(
            'save' => array(
                'desc' => $this->module->l('Save'),
                'href' => AdminController::$currentIndex.
                '&configure='.$this->module->name.
                '&save'.$this->module->name.
                '&token='.Tools::getAdminTokenLite('AdminModules'),
            ),
            'back' => array(
                'href' => AdminController::$currentIndex.'&token='.Tools::getAdminTokenLite('AdminModules'),
                'desc' => $this->module->l('Back to list')
            )
        );

        // Load current value
        $helper->fields_value[Tools::strtoupper(_DB_PREFIX_.self::IS_API_SETTINGS_TAB)] = 1;
        $helper->fields_value[Tools::strtoupper(_DB_PREFIX_.self::MODULE_API_KEY_NAME)] = $api_key;
        $helper->fields_value[Tools::strtoupper(_DB_PREFIX_.self::MODULE_BRANCH_ID_NAME)] = $branch_id;
        $helper->fields_value[Tools::strtoupper(_DB_PREFIX_.self::MODULE_SERVICE_NAME)] = $service_id;

        return $helper->generateForm($fields_form);
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm($api_key_msg)
    {
        return array(
            array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->module->l('API Settings'),
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
                            'name' => Tools::strtoupper(_DB_PREFIX_.self::MODULE_API_KEY_NAME),
                            'label' => $this->module->l('Enterprise Key'),
                            'maxlength' => 255,
                            'required' => true
                        ),
                        array(
                            'type' => 'select',
                            'name' => Tools::strtoupper(_DB_PREFIX_.self::MODULE_SERVICE_NAME),
                            'id' => Tools::strtoupper(_DB_PREFIX_.self::MODULE_SERVICE_NAME),
                            'label' => $this->module->l('Servicio'),
                            'options' => array(
                                'query' => self::$services_types,
                                'id' => 'id',
                                'name' => 'name',
                            ),
                            'required' => true
                        ),
                        array(
                            'type' => 'text',
                            'name' => Tools::strtoupper(_DB_PREFIX_.self::MODULE_BRANCH_ID_NAME),
                            'label' => $this->module->l('Codigo Sucursal'),
                            'maxlength' => 255,
                            'required' => false
                        ),
                    ),
                    'submit' => array(
                        'title' => $this->module->l('Save'),
                        'class' => 'btn btn-default pull-right'
                    )
                )
            )
        );
    }
}
