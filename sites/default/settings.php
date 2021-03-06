<?php

$update_free_access = FALSE;

$drupal_hash_salt = 'ddYth6h0WyCezfWXmjKKxJY6iRKyERAtdNqTWW90L0I';

$test_domains = array(
  'word.algorb.org.ua',
);

$conf['environment'] = 'prod';
if (in_array($_SERVER['HTTP_HOST'], $test_domains)) {
  $conf['environment'] = 'test';
}

ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 100);
ini_set('session.gc_maxlifetime', 200000);

ini_set('session.cookie_lifetime', 2000000);

$conf['404_fast_paths_exclude'] = '/\/(?:styles)\//';
$conf['404_fast_paths'] = '/\.(?:txt|png|gif|jpe?g|css|js|ico|swf|flv|cgi|bat|pl|dll|exe|asp)$/i';
$conf['404_fast_html'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL "@path" was not found on this server.</p></body></html>';


$conf['vk_app_id'] = '4684920';
$conf['vk_secret'] = 'Xudnb5hyz3UgNReu286q';

if ($conf['environment'] == 'test') {

  $databases = array (
    'default' =>
      array (
        'default' =>
          array (
            'database' => 'word-ato',
            'username' => 'word-ato',
            'password' => 'dWpTs9bddW89Ya3u',
            'host' => 'localhost',
            'port' => '',
            'driver' => 'mysql',
            'prefix' => '',
          ),
      ),
  );

  $conf['fb_appid'] = '1566722923565062';
  $conf['fb_secret'] = 'bb436e6007dc195c93580482814926cc';

  $conf['liqpay_public_key'] = 'i14278414934';
  $conf['liqpay_private_key'] = 'AX9rk3Rxc4FUIGCNFssLj7MiyXEskR9GjUvcmzMO';
}

if ($conf['environment'] == 'prod') {

  $databases = array (
    'default' =>
      array (
        'default' =>
          array (
            'database' => 'word-ato-prod',
            'username' => 'word-ato-prod',
            'password' => 'XNYwac6JGaB7DYn8',
            'host' => 'localhost',
            'port' => '',
            'driver' => 'mysql',
            'prefix' => '',
          ),
      ),
  );

  $conf['fb_appid'] = '1566203040283717';
  $conf['fb_secret'] = '6848e4dfca191408216fe7e97d826c18';

  $conf['liqpay_public_key'] = 'i47399284535';
  $conf['liqpay_private_key'] = 'KUS8knqXFDnVShEwBBEGEwQCMzOQuzo9lK4y8qDO';
}

