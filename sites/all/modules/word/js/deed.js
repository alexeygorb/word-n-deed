(function($) {

  Drupal.behaviors.deedPage = {
    attach: function(context, settings) {
      var once = $('body').once('deed');
      if (once.length > 0) {

        $('.popup-container a.x').click(function(e) {
          $(this).parents('.popup-container').fadeOut();
        });
        // Other stuff.
        $('#spalnik-container a.form-trigger').live('click', function(e) {
          e.preventDefault();
          $('#pay-form').fadeIn();
        });

        if ($('.messages-wrapper .error').length > 0) {
          $('#pay-form').show();
        }
      }
    }
  };

})(jQuery);
