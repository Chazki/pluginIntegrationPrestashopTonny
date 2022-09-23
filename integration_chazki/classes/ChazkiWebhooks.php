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

class ChazkiWebhooks
{

    const CHAZKI_SAVE_CONFIG_WEBHOOK = 'http://localhost:5001/chazki-link-beta/us-central1/saveConfigWebhook';
    const CHAZKI_UPDATE_BODY_WEBHOOK = 'http://localhost:5001/chazki-link-beta/us-central1/updateBodyWebhook';

    public function __construct($module)
    {
        $this->module = $module;
    }

    public function saveConfig($api_key)
    {
        $json = json_decode(file_get_contents(dirname(dirname(__FILE__)).'/templates/saveconfig.json'), true);
        $json['enterpriseKey'] = $api_key;
        $json['urlWebHook'] = 'http://example.com';

        $jsonConfig = json_encode($json);
        
        $curl = curl_init();
        $url = self::CHAZKI_SAVE_CONFIG_WEBHOOK;
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $jsonConfig
        ));

        $response = curl_exec($curl);
    }

    public function updateBody($api_key)
    {
        $json = json_decode(file_get_contents(dirname(dirname(__FILE__)).'/templates/bodywebhook.json'), true);
        $json['enterpriseKey'] = $api_key;

        $jsonConfig = json_encode($json);
        
        $curl = curl_init();
        $url = self::CHAZKI_UPDATE_BODY_WEBHOOK;
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $jsonConfig
        ));

        $response = curl_exec($curl);
    }
}