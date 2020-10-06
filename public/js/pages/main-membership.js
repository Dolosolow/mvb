$(document).ready(() => {
  $(window).resize(function() {
    if($(window).width() > 1300) {
      $('.tablesaw-bar').hide();
    } else {
      $('.tablesaw-bar').show();
    }
  }).resize();
})

