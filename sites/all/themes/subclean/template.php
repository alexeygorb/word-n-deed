<?php

/**
 * Implements hook_preprocess_page().
 */
function subclean_preprocess_page(&$variables) {

  unset($variables['page']['main_menu']['#heading']);
  unset($variables['page']['secondary_menu']);

  $variables['use_parallax'] = FALSE;
  if ($variables['is_front'] || arg(0) == 'the-deed') {
    $variables['use_parallax'] = TRUE;
    drupal_add_js($variables['directory'] . '/js/jquery.parallax.min.js', array(
      'type'  => 'file',
      'scope' => 'footer',
    ));
  }
}

/**
 * Implements hook_preprocess_node().
 */
function subclean_preprocess_node(&$vars) {
  $vars['submitted'] = $vars['date'];
}
