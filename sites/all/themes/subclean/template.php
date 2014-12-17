<?php

/**
 * Implements hook_preprocess_page().
 */
function subclean_preprocess_page(&$variables) {

  unset($variables['page']['main_menu']['#heading']);

  unset($variables['page']['secondary_menu']);
}

/**
 * Implements hook_preprocess_node().
 */
function subclean_preprocess_node(&$vars) {
  $vars['submitted'] = $vars['date'];
}
