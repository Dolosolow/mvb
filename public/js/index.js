require('../scss/style.scss');

$(document).ready(() => {
  $('.t-nav').css('width', '100%');
  // *************
  // owl-carousel is used to display the movies now playing cards.
  // *************
  $('.owl-carousel').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    navSpeed: 900,
    margin: 6,
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
// *************
// responsible for the navigation hamburger animation and
// the black wrapper when navigation sidebar is open/showing.
// *************
$('.hamburger').click(function() {
  $(this).toggleClass('show');
  $('.navigation-collapse').toggleClass('show');
  $('.navigation-bg-wrapper').toggleClass('show');
  $('body').toggleClass('show');

  if($(window).width() <= 1200) {
    $('.navigation-collapse .col').toggleClass('hide');
  }
});

$('.navigation-bg-wrapper').click(function() {
  $(this).toggleClass('show');
  $('.hamburger').toggleClass('show');
  $('.navigation-collapse').toggleClass('show');
  $('body').toggleClass('show');
});
// *************
// few conditions for transition effects on inputs with the type
// that is not radio.
// *************
$('form').find(':input').not('[type=radio]').each(function() {
  $(this).focus(function() {
    $(`label[for=${$(this).attr('id')}]`).addClass('focus-visible');
  })
  
  $(this).focusout(function() {
    $(`label[for=${$(this).attr('id')}]`).removeClass('focus-visible');
  })

  $(this).keyup(function() {
    if($(this).val() !== '') {
      $(`label[for=${$(this).attr('id')}]`).addClass('complete');
    } else {
      $(`label[for=${$(this).attr('id')}]`).removeClass('complete');
    }
  })
})
// *************
// signin buttons >> pop-up modal
// *************
$('#signin-btn').on('click', function() {
  $('body').toggleClass('show');
  $('.si-modal').css('visibility', 'visible');
  $('.modal-form').removeClass('slide-out-top');
  $('.modal-form').addClass('slide-in-top');
  $('.modal-form #email').focus();
})

$('#close-modal').on('click', function() {
  $('body').toggleClass('show');
  $('.modal-form').addClass('slide-out-top');

  setTimeout(() => {
    $('.si-modal').css('visibility', 'hidden');
    $('.modal-form').removeClass('slide-in-top');
  }, 400);
})