$(function () {
  // ---------------------
  // toggles between showing/hidding an otherwise visible by default tablesaw arrow controls.
  // Determines this by width of screen on resize.
  $(window)
    .on("resize", function () {
      if ($(window).width() > 1300) {
        $(".tablesaw-bar").hide();
      } else {
        $(".tablesaw-bar").show();
      }
    })
    .resize();
});
