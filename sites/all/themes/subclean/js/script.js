(function($) {
  Drupal.behaviors.subClean = {
    attach: function () {

      $('body').once('subclean').each(function() {
        $('body.page-the-deed #page').css('height', $('#page-wrapper').height());

        var messages = $('.messages-wrapper');
        if (messages.length > 0) {
          var heightAll = messages.height();
          var heightInner = $('.messages-inner').height();
          if (heightInner < heightAll) {
            $('.messages-inner').css('margin-top', Math.floor((heightAll - heightInner)/2));
          }
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
