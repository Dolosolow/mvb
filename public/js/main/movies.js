function shouldLoop(size) {
  if($(window).width() < 800 || $(window).width() < 1100 && size === 4) {
    return true;
  }
  return size > 4;
}

$(document).ready(() => {
  // *************
  // owl-carousel is used to display the movies now playing cards.
  // *************
  $('#showtimes.owl-carousel').owlCarousel({
    loop: shouldLoop($('#showtimes').data('ct')),
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

  $('#classics.owl-carousel').owlCarousel({
    loop: shouldLoop($('#classics').data('ct')),
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
});