(function($) {

  function updateForm(url) {
    $.ajax({
      url: Drupal.settings.basePath + 'ajax/avatar',
      type: 'POST',
      dataType: 'json',
      data: {url: url},
      success: function(data, textStatus, jqXHR) {
        if (data.fid != undefined) {
          $('#im-area img').attr('src', data.preview);
          $('#im-area input[name=fid]').val(data.fid);
          $('#im-area input[name=token]').val(data.token);
        }
      }
    });
  }

  Drupal.FB = {};
  Drupal.FB.login = false;

  Drupal.FB.getImage = function() {
    console.log('getImage');
    FB.api('/me/picture', {type: 'large', redirect: false}, function(r) {
      console.log('picture', r);
      if (r.data != undefined && r.data.url != undefined) {
        updateForm(r.data.url);
      }
    });
  };

  window.fbAsyncInit = function() {
    FB.init({
      appId      : Drupal.settings.fb.appId,
      xfbml      : true,
      version    : 'v2.2'
    });

    FB.getLoginStatus(function(response) {
      Drupal.FB.login = response;
    });
  };

  Drupal.behaviors.socials = {
    attach: function(context, settings) {

      $('body').once('socials').each(function() {
        $('#fb-login-image').click(function(e) {
          e.preventDefault();
          console.log(Drupal.FB.login);
          if (Drupal.FB.login && Drupal.FB.login.status == 'connected') {
            Drupal.FB.getImage();
          }
          else {
            FB.login(function (r) {
              console.log('auth', r);
              if (r.authResponse) {
                Drupal.FB.getImage();
              }
            });
          }
        });


        window.VK.init({
          apiId: Drupal.settings.vk.appId
        });

        $('#vk-login-image').click(function(e) {
          e.preventDefault();
          VK.Auth.login(authInfo);
        });

        function authInfo(response) {
          console.log(response);
          var uid = response.session.user.id;
          console.log(uid);
          VK.Api.call('users.get', {
            user_ids: uid,
            fields: 'photo_200'
          }, function(r) {
            if(r.response && r.response.length > 0) {
              var photoUrl = r.response[0].photo_200;
              updateForm(photoUrl);
            }
          });
        }
      });
    }
  }


})(jQuery);
