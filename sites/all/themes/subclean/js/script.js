(function($) {
  Drupal.behaviors.subClean = {
    attach: function () {

      $('body').once('subclean').each(function() {
        var messages = $('.messages-wrapper');
        if (messages.length > 0) {
          $('.messages-close').click(function (e) {
            e.preventDefault();
            $('.messages-modal').fadeOut();
            messages.fadeOut();
          })
        }
      });
    }
  };

})(jQuery);