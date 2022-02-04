// -----------------------------
// changes boolean loop value to true when window sizes are met.
// This applies to the Movies playing cards.
function shouldLoop(size) {
  if ($(window).width() < 800 || ($(window).width() < 1100 && size === 4)) {
    return true;
  }
  return size > 4;
}

$(function () {
  // -----------------------------
  // owl-carousel is used to display the movies now playing cards applies
  //  to both IDs showtimes & classics.
  $("#classics.owl-carousel").owlCarousel({
    loop: shouldLoop($("#classics").data("ct")),
    nav: true,
    dots: false,
    navSpeed: 700,
    margin: 7,
    center: $(window).width() < 800,
    autoWidth: true,
    autoHeight: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        center: true,
      },
      900: {
        items: 2,
      },
      2000: {
        items: 4,
      },
    },
  });

  $("#showtimes.owl-carousel").owlCarousel({
    loop: shouldLoop($("#showtimes").data("ct")),
    nav: true,
    dots: false,
    navSpeed: 700,
    margin: 7,
    center: $(window).width() < 800,
    autoWidth: true,
    autoHeight: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        center: true,
      },
      700: {
        items: 2,
      },
      2000: {
        items: 4,
      },
    },
  });

  $("#location-headline.owl-carousel").owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    center: true,
    items: 1,
    loop: true,
    smartSpeed: 500,
  });

  $("#location-reserve.owl-carousel").owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    center: true,
    dots: false,
    items: 1,
    loop: true,
    smartSpeed: 500,
  });
});
