$(document).ready(() => {
  // toggles the view of the tablesaw-minimap against the viewport width
  $(window).resize(function() {
    if($(window).width() > 1300) {
      $('.tablesaw-bar').hide();
    } else {
      $('.tablesaw-bar').show();
    }
  }).resize();
})

