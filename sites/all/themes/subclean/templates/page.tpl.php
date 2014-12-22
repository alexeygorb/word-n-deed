<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 */
?>
<?php if (!empty($messages)): ?>
  <div class="messages-modal"></div>
  <div class="messages-wrapper"><div class="messages-inner"><?php print $messages; ?></div><a href="#" class="messages-close"><?php print t('Close'); ?></a></div>
<?php endif; ?>
<div id="page-wrapper">
  <div id="page">
    <div id="header">
      <div class="section clearfix">
        <?php if (!$is_front && $logo): ?>
          <?php print render($page['logo']) ?>
        <?php endif; ?>

        <?php if ($site_name || $site_slogan): ?>
          <div id="name-and-slogan">
            <?php if ($site_name): ?>
              <?php print render($page['site_name']); ?>
            <?php endif; ?>

            <?php if ($site_slogan): ?>
              <div id="site-slogan"><?php print $site_slogan; ?></div>
            <?php endif; ?>
          </div>
        <?php endif; ?>

        <?php print render($page['header']); ?>
      </div>
    </div>

    <?php if ($main_menu || $secondary_menu): ?>
      <div id="navigation">
        <div class="section">
          <?php print render($page['main_menu']); ?>
          <?php print render($page['secondary_menu']); ?>
        </div>
      </div>
    <?php endif; ?>

    <?php if (FALSE && $breadcrumb): ?>
      <div id="breadcrumb">
        <?php print $breadcrumb; ?>
      </div>
    <?php endif; ?>

    <div id="main-wrapper">
      <div id="main" class="clearfix">
        <?php if ($page['sidebar_first']): ?>
          <div id="sidebar-first" class="column sidebar">
            <div class="section">
              <?php print render($page['sidebar_first']); ?>
            </div>
          </div>
        <?php endif; ?>

        <div id="content" class="column">
          <div class="section">
            <?php if ($page['highlighted']): ?>
              <div id="highlighted">
                <?php print render($page['highlighted']); ?>
              </div>
            <?php endif; ?>
            <a id="main-content"></a>

            <?php print render($title_prefix); ?>
            <?php if (!$is_front && $title): ?>
              <h1 class="title" id="page-title"><?php print $title; ?></h1>
            <?php endif; ?>
            <?php print render($title_suffix); ?>

            <?php if (FALSE && $tabs): ?>
              <div class="tabs">
                <?php print render($tabs); ?>
              </div>
            <?php endif; ?>

            <?php print render($page['help']); ?>

            <?php if ($action_links): ?>
              <ul class="action-links">
                <?php print render($action_links); ?>
              </ul>
            <?php endif; ?>

            <?php print render($page['content']); ?>
            <?php print $feed_icons; ?>
          </div>
        </div>

        <?php if ($page['sidebar_second']): ?>
          <div id="sidebar-second" class="column sidebar">
            <div class="section">
              <?php print render($page['sidebar_second']); ?>
            </div>
          </div>
        <?php endif; ?>
      </div>
    </div>

    <div id="footer">
      <div class="section">
        <?php print render($page['footer']); ?>
      </div>
    </div>
  </div>
</div>
<?php if (!empty($use_parallax)): ?>
<div class="parallax-container">
  <ul id="scene" class="scene">
    <li class="layer" data-depth="0.30"><div class="snow1"></div></li>
    <li class="layer" data-depth="0.50"><div class="snow2"></div></li>
  </ul>
</div>
<?php endif; ?>