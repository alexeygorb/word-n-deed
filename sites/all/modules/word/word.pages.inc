<?php


function word_word_page() {
  $render = array();
  $render['content-wrapper'] = array(
    '#theme' => 'word_page',
  );
  $render['#attached']['js'][] = array(
    'data' => array('pageSetup' => array(
      'reserve' => 130,
      'rowHeight' => 437,
      'rowCapacity' => 7,
      'ajaxHandler' => url('ajax/word'),
      'pagesIncrement' => 3,
    )),
    'type' => 'setting',
  );
  $render['#attached']['js'][] = array(
    'data' => drupal_get_path('module', 'word') . '/js/word.js',
  );
  return $render;
}

function word_deed_page() {
  return 'deed-page';
}

function word_ajax_word_page($nid, $limit) {
  if (empty($limit)) {
    $limit = 30;
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
  if (!empty($nodes_list)) {
    $nodes = node_load_multiple($nodes_list);
    $view = node_view_multiple($nodes);
    foreach ($view['nodes'] as $nid => $node_render) {
      if (!is_numeric($nid)) continue;
      $response['items'][] = drupal_render($node_render);
      // Save the last one.
      $response['last-item'] = (int) $nid;
    }
  }

  print drupal_json_encode($response);
}
