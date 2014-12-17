(function($) {

  Drupal.behaviors.wordPage = {
    attach: function(context, settings) {
      var config = settings.pageSetup;
      var once = $('#cards-container-outer').once('word');
      if (once.length > 0) {

        Drupal.wordCarousel.init(config);
        $('#cards-container-outer').css('width', config.colWidth * Drupal.wordCarousel.cols);
        Drupal.wordCarousel.loadNext();


        // Other stuff.
        $("#word-add-form #edit-file").change(function () {
          var file = $("#word-add-form #edit-file").val();
          if (file.length > 0) {
            $("#word-add-form #edit-upload").mousedown();
            setTimeout(function() {$("#word-add-form #edit-file").attr('disabled', 'disabled');}, 300);
          }
        });

        var textItem = $('#word-add-form .form-item-text');
        var charWrapper = textItem.find('.description span');
        var maxCharCount = charWrapper.text();
        var textarea = textItem.find('textarea');

        var handler = function(e) {
          var value = $(this).val();
          if (value.length > maxCharCount) {
            e.preventDefault();
          }
          // Chop chop!
          value = value.substr(0, maxCharCount);
          $(this).val(value);
          charWrapper.html(maxCharCount - value.length);
        };

        textarea.change(handler);
        textarea.keyup(handler);

      }
    }
  };

  Drupal.wordCarousel = {
    offset: 0,
    limit: 0,
    rows: 1,
    cols: 1,
    pageCapacity: 0,
    pages: 0,
    currentPage: 0,
    status: 'ok',
    lock: false,
    disabled: false,
    swiper: null,
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

              var tempContainer = [];
              var colWrapper = false;

              for (var i = 0; i < data.items.length; i++) {
                // Flush.
                if (i % self.rows == 0) {
                  if (colWrapper != false) {
                    tempContainer.push(colWrapper);
                  }
                  colWrapper = $('<div class="column"></div>');
                }
                colWrapper.append(data.items[i]);
              }
              // Flush.
              tempContainer.push(colWrapper);

              // Go through cols collection and slpit the stuff into pages.
              var slideWrapper = false;
              for (i = 0; i < tempContainer.length; i++) {
                // Flush.
                if (i % self.cols == 0) {
                  if (slideWrapper != false) {
                    self.swiper.appendSlide(slideWrapper.html());
                    self.pages++;
                  }
                  slideWrapper = $('<div class="slide"></div>');
                }
                slideWrapper.append(tempContainer[i]);
              }
              // Flush.
              self.swiper.appendSlide(slideWrapper.html());
              self.pages++;
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
      var windowWidth = $(window).width();
      self.rows = Math.floor((windowHeight - config.reserveY) / config.rowHeight);
      if (self.rows < 1) {
        self.rows = 1;
      }
      self.cols = Math.floor((windowWidth - config.reserveX) / config.colWidth);
      if (self.cols < 1) {
        self.cols = 1;
      }

      self.limit = self.rows * self.cols * config.pagesIncrement;
      self.pageCapacity = self.limit / config.pagesIncrement;

      $('.swiper-container, .swiper-slide').css({
        width: self.cols * config.colWidth,
        height: self.rows * config.rowHeight
      });
      self.swiper = $('.swiper-container').swiper({
        mode:'horizontal',
        loop: false,
        longSwipesRatio: 0.3,
        createPagination: false,
        speed: 800,
        onSlideChangeStart: function(swiper, direction) { self.onSlideChange(swiper, direction); }
      });
    },

    onSlideChange: function(swiper, direction) {
      var self = this;
      var i = swiper.activeIndex;
      if (self.pages - 1 <= i) {
        self.loadNext();
      }
    }
  }

})(jQuery);
