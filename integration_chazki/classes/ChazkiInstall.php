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

class ChazkiInstall
{
    public static $chazki_services = array(
        'SAME_DAY' => 'Chazki - Same Day',
        'NEXT_DAY' => 'Chazki - Next Day'
    );

    const CHAZKI_TRACKING_URL_CARRIER = 'https://nintendo-dev.chazki.com/trackcodeTracking/@';
    const CARRIER_ID_SERVICE_CODE = 'CARRIER_ID_SERVICE_CODE';

    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * install carriers
     *
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws ReflectionException
     */
    public function installCarriers()
    {
        $carrier_id_service_code = array();

        foreach (self::$chazki_services as $service_code => $name) {
            $added_carrier = $this->addCarrier($name, $service_code);

            if ($added_carrier) {
                $id_reference = $added_carrier->id_reference;

                if (!$id_reference) {
                    $id_reference = $added_carrier->id;
                }

                $carrier_id_service_code[$id_reference] = $service_code;
            }
        }

        ChazkiHelper::get(self::CARRIER_ID_SERVICE_CODE)
            ? ChazkiHelper::updateValue(self::CARRIER_ID_SERVICE_CODE, json_encode($carrier_id_service_code))
            : ChazkiHelper::set(self::CARRIER_ID_SERVICE_CODE, json_encode($carrier_id_service_code));
    }

    /**
     * Add a carrier
     *
     * @param string $name Carrier name
     * @param string $key Carrier ID
     *
     * @return bool|Carrier
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    protected function addCarrier($name, $key)
    {
        $key = Tools::strtoupper($key);
        $id_reference = \Db::getInstance()->getValue($s=
            "SELECT value FROM " . _DB_PREFIX_ . "configuration WHERE name LIKE '" . pSQL($key) .
            "' ORDER BY id_configuration DESC"
        );
        $carrier = Carrier::getCarrierByReference($id_reference);

        if (Validate::isLoadedObject($carrier)) {
            return $carrier; // Already added to DB
        }

        $carrier = new Carrier();
        $carrier->name = $name;
        $carrier->delay = array();
        $carrier->url = self::CHAZKI_TRACKING_URL_CARRIER;
        $carrier->external_module_name = 'integration_chazki';
        $carrier->active = TRUE;
        $carrier->shipping_external = true;
        $carrier->is_module = TRUE;
        $carrier->need_range = TRUE;

        foreach (Language::getLanguages() as $lang) {
            $id_lang = (int)$lang['id_lang'];
            $carrier->delay[$id_lang] = '-';
        }

        if ($carrier->add()) {
            @copy(
                dirname(__FILE__) . '/logo.png',
                _PS_SHIP_IMG_DIR_ . DIRECTORY_SEPARATOR . (int)$carrier->id . '.jpg'
            );

            $id_reference = (int) $carrier->id_reference ?: (int) $carrier->id;
            /*\Db::getInstance()->query(
                "INSERT " . _DB_PREFIX_ . "configuration SET name='" . pSQL($key) . "', value=$id_reference"
            );*/
            Configuration::updateValue(_DB_PREFIX_ . $key, $carrier->id);
            Configuration::updateValue(_DB_PREFIX_ . $key . '_reference', $carrier->id);

            $this->addGroups($carrier);
            $this->addRanges($carrier);

            return $carrier;
        }

        return false;
    }

    /**
     * @param Carrier $carrier
     */
    protected function addGroups(Carrier $carrier)
    {
        $groups_ids = array();
        $groups = Group::getGroups(Context::getContext()->language->id);

        foreach ($groups as $group) {
            $groups_ids[] = $group['id_group'];
        }

        /* For v1.5.x.x where setGroups does not exists */
        if (method_exists($carrier, 'setGroups')) {
            $carrier->setGroups($groups_ids);
        } else {
            $this->setGroups($carrier, $groups_ids);
        }
    }

    /**
     * Set carrier-group relation (for PrestaShop v1.5.x.x)
     *
     * @param Carrier $carrier
     * @param $groups
     * @param bool $delete
     * @return bool
     */
    protected function setGroups(Carrier $carrier, $groups, $delete = true)
    {
        if ($delete) {
            Db::getInstance()
                ->execute('DELETE FROM ' . _DB_PREFIX_ . 'carrier_group WHERE id_carrier=' . (int)$carrier->id);
        }

        if (!is_array($groups) || !count($groups)) {
            return true;
        }

        $sql = 'INSERT INTO ' . _DB_PREFIX_ . 'carrier_group (id_carrier, id_group) VALUES ';

        foreach ($groups as $id_group) {
            $sql .= '(' . (int)$carrier->id . ', ' . (int)$id_group . '),';
        }

        return Db::getInstance()
            ->execute(rtrim($sql, ','));
    }

    protected function addRanges($carrier)
    {
        $range_price = new RangePrice();
        $range_price->id_carrier = $carrier->id;
        $range_price->delimiter1 = '0';
        $range_price->delimiter2 = '100000';
        $range_price->add();

        $range_weight = new RangeWeight();
        $range_weight->id_carrier = $carrier->id;
        $range_weight->delimiter1 = '0';
        $range_weight->delimiter2 = '100000';
        $range_weight->add();

        $this->addZones($carrier, $range_price, $range_weight);
    }

    protected function addZones($carrier, $rangePrice, $rangeWeight)
    {
        $zones = Zone::getZones();

        foreach ($zones as $zone) {
            $carrier->addZone($zone['id_zone']);
            $carrier->addDeliveryPrice(array(
                'id_carrier' => $carrier->id, 
                'id_range_price' => (int) $rangePrice->id, 
                'id_range_weight' => NULL, 
                'id_zone' => (int) $zone['id_zone'], 
                'price' => '25'
            ));
            $carrier->addDeliveryPrice(array(
                'id_carrier' => $carrier->id, 
                'id_range_price' => NULL, 
                'id_range_weight' => (int) $rangeWeight->id, 
                'id_zone' => (int) $zone['id_zone'], 
                'price' => '25'
            ));
        }
    }
}
