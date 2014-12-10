<?php
/**
 * @file
 * Default theme implementation to display a node.
 */
?>
<div<?php print $attributes; ?>>
  <?php print $user_picture; ?>

  <div<?php print $content_attributes; ?>>
    <?php
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>

</div>
