<?php


function word_word_page() {
  $render = array();
  $render['content-wrapper'] = array(
    '#theme' => 'word_page',
    '#add_form' => drupal_get_form('word_add_form'),
  );

  $path = drupal_get_path('module', 'word');
  $render['#attached']['js'][] = array(
    'data' => array('pageSetup' => array(
      'reserveY' => 120,
      'reserveX' => 20,
      'rowHeight' => 405,
      'colWidth' => 260,
      'ajaxHandler' => url('ajax/word'),
      'pagesIncrement' => 3,
    )),
    'type' => 'setting',
  );
  $render['#attached']['js'][] = array('data' => $path . '/js/word.js');
  $render['#attached']['js'][] = array('data' => $path . '/js/idangerous.swiper.min.js');
  $render['#attached']['css'][] = array('data' => $path . '/css/idangerous.swiper.css');

  return $render;
}

function word_deed_page() {
  if (arg(1) == 'success') {
    drupal_set_message(t('Your payment was received. Thanks!'));
    drupal_goto('the-deed');
  }
  $render = array();
  $render['content-wrapper'] = array(
    '#theme' => 'deed_page',
  );
  $path = drupal_get_path('module', 'word');
  $render['#attached']['js'][] = array('data' => $path . '/js/deed.js');
  return $render;
}

function word_ajax_word_page($nid, $limit) {
  if (empty($limit)) {
    $limit = 30;
  }

  // If there is no start point set, then load one less item
  // in order to prepend the result with the add button.
  if (empty($nid)) {
    $limit--;
  }

  $query = db_select('node', 'n')
    ->fields('n', array('nid'))
    ->condition('status', 1)
    ->condition('type', 'card')
    ->orderBy('nid', 'DESC')
    ->range(0, $limit);

  if (!empty($nid)) {
    $query->condition('nid', $nid, '<');
  }

  $result = $query->execute();
  $nodes_list = array();
  foreach ($result as $node) {
    $nodes_list[] = $node->nid;
  }

  $response = array(
    'status' => 'ok',
  );
  if (count($nodes_list) < $limit) {
    $response['message'] = 'out-of-items';
  }

  $response['items'] = array();
  $i = 0;
  if (empty($nid)) {
    $i++;
    $render = array('#theme' => 'word_add_word');
    $response['items'][] = drupal_render($render);
  }

  if (!empty($nodes_list)) {
    $nodes = node_load_multiple($nodes_list);
    $view = node_view_multiple($nodes);
    foreach ($view['nodes'] as $nid => $node_render) {
      if (!is_numeric($nid)) continue;

      $i++;
      $style = 'two';
      if (round($i / 2) % 2 == 1) {
        $style = 'one';
      }


      if (empty($node_render['#attributes']['class'])) {
        $node_render['#attributes'] = array(
          'class' => array(),
        );
      }

      $node_render['#attributes']['class'][] = 'style-' . $style;

      $response['items'][] = drupal_render($node_render);
      // Save the last one.
      $response['last-item'] = (int) $nid;
    }
  }

  print drupal_json_encode($response);
}

function word_ajax_avatar_save() {
  $response = array('status' => 'ok');
  $url = $_POST['url'];
  $request = drupal_http_request($url);
  if (!empty($request->data)) {
    $file = file_save_data($request->data, 'public://avatars', FILE_EXISTS_RENAME);
    // Unpublish file at once.
    $file->status = 0;
    file_save($file);
    $response['fid'] = $file->fid;
    $response['preview'] = image_style_url('card_thumb', $file->uri);
    $response['token'] = word_get_token($file->fid);
  }
  print drupal_json_encode($response);
}

function word_ajax_liqpay() {
  $amount = (int) $_POST['amount'];
  if ($amount > 0) {
    $public = variable_get('liqpay_public_key', '');
    $private = variable_get('liqpay_private_key', '');
    $data = array(
      'version' => 3,
      'public_key' => $public,
      'amount' => $amount,
      'currency' => 'UAH',
      'description' => 'Благодійний внесок у фонд "Підтримай армію України"',
      'order_id' => uniqid(date('YmdHis') . '-'),
      'type' => 'donate',
      'result_url' => url('the-deed/success', array('absolute' => TRUE)),
      'server_url' => url('liqpay/callback', array('absolute' => TRUE)),
    );
    $json = json_encode($data);

    $base64_data = base64_encode($json);

    print '
    <form method="POST" id="form" action="https://www.liqpay.com/api/checkout" target="_top"
   accept-charset="utf-8">
     <input type="hidden" name="data" value="' . $base64_data . '"/>
     <input type="hidden" name="signature" value="' . base64_encode(sha1( $private . $base64_data . $private, 1)) . '"/>
     <input type="image" src="//static.liqpay.com/buttons/p1ru.radius.png"/>
   </form>
   <script>document.getElementById(\'form\').submit();</script>
   ';

  }

}

function word_liqpay_callback() {
  $public = variable_get('liqpay_public_key', '');
  $private = variable_get('liqpay_private_key', '');
  $data = $_POST['data'];

  $sign = base64_encode(sha1($private . $data . $private, 1));
  if ($sign != $_POST['signature']) {
    watchdog('liqpay', 'Wrong signature. Data = !data', array('!data' => base64_decode($data)), WATCHDOG_WARNING);
    return NULL;
  }

  watchdog('liqpay', 'Payment callback. Data = !data', array('!data' => base64_decode($data)));
  return NULL;
}
