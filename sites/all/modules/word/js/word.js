(function($) {

  Drupal.behaviors.wordPage = {
    attach: function(context, settings) {
      var config = settings.pageSetup;
      var once = $('#cards-container-outer').once('word');
      if (once.length > 0) {
        Drupal.wordCarousel.init(config);
        Drupal.wordCarousel.loadNext();
      }
    }
  };

  Drupal.wordCarousel = {
    offset: 0,
    limit: 0,
    rows: 1,
    pageCapacity: 0,
    status: 'ok',
    lock: false,
    disabled: false,
    loadNext: function() {
      var self = this;
      if (!self.lock && !self.disabled) {
        self.lock = true;
        $.ajax({
          url: Drupal.settings.pageSetup.ajaxHandler + '/' + self.offset + '/' + self.limit,
          dataType: 'json',
          success: function(data) {
            if (data['last-item'] != undefined) {
              self.offset = data['last-item'];
            }
            if (data.message != undefined && data.message == 'out-of-items') {
              self.disabled = true;
            }
            // Post the content.
            if (data.items != undefined) {
              var colWrapper = false;
              for (var i = 0; i < data.items.length; i++) {
                // Flush.
                if (i % self.rows == 0) {
                  if (colWrapper != false) {
                    colWrapper.appendTo('#cards-container-inner');
                  }
                  colWrapper = $('<div class="column"></div>');
                }
                colWrapper.append(data.items[i]);
              }
              // Flush.
              colWrapper.appendTo('#cards-container-inner');
            }

            // Reset the lock.
            self.lock = false;
          }
        });
      }
    },
    init: function(config) {
      var self = this;
      // Calculate the initial setup.
      var windowHeight = $(window).height();
      self.rows = Math.floor((windowHeight - config.reserve) / config.rowHeight);
      if (self.rows < 1) {
        self.rows = 1;
      }
      self.limit = self.rows * config.rowCapacity * config.pagesIncrement;
      self.pageCapacity = self.limit / config.pagesIncrement;
    }
  }

})(jQuery);
