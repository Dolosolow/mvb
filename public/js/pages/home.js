import "core-js/stable";
import "regenerator-runtime/runtime";
require.context("../../images", true, /\.(png|svg|jpg)$/);
import '../../scss/styles.scss';

$('.toggle-info-btn').click(function() {
  if($('.cvc-loc-img').hasClass('scale-in-right')) {

    $('.cvc-loc-img').removeClass('scale-in-right');
    $('.cvc-loc-img').addClass('scale-out-right');
  } else {
    $('.cvc-loc-img').removeClass('scale-out-right');
    $('.cvc-loc-img').addClass('scale-in-right');
  }
});
// *************
// few conditions for transition effects on inputs with the type
// that is not radio.
// *************
// $('form').find(':input').not('[type=radio]').each(function() {
//   $(this).focus(function() {
//     $(`label[for=${$(this).attr('id')}]`).addClass('focus-visible');
//   })
  
//   $(this).focusout(function() {
//     $(`label[for=${$(this).attr('id')}]`).removeClass('focus-visible');
//   })

//   $(this).keyup(function() {
//     if($(this).val() !== '') {
//       $(`label[for=${$(this).attr('id')}]`).addClass('complete');
//     } else {
//       $(`label[for=${$(this).attr('id')}]`).removeClass('complete');
//     }
//   })
// })

$('#signin-btn').click(function() {
  $('body').addClass('no-scroll');
})

$('#si-close-btn').click(function() {
  $('#popup__content').addClass('slide-out-top');
  $('body').removeClass('no-scroll');
  setTimeout(() => {
    $('#popup__content').removeClass('slide-out-top');
  }, 500);
})

$('#popup__bg').click(function() {
  $('#si-close-btn')[0].click();
})