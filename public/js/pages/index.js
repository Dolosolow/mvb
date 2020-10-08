import "core-js/stable";
import "regenerator-runtime/runtime";
require.context("../../images", true, /\.(png|svg|jpg)$/);
import '../../scss/styles.scss';

$(document).ready(function() {
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
})