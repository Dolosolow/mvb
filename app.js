$(document).ready(() => {
  $('.t-nav').css('width', '100%');

  $('.owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    navSpeed: 700,
    margin: 10,
    center: false,
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

$('.hamburger').click(function() {
  $(this).toggleClass('show');
  $('.navigation-collapse').toggleClass('show');
  $('.navigation-wrapper').toggleClass('show');
  $('body').toggleClass('show');
});

$('.navigation-wrapper').click(function() {
  $(this).toggleClass('show');
  $('.hamburger').toggleClass('show');
  $('.navigation-collapse').toggleClass('show');
  $('body').toggleClass('show');
});
