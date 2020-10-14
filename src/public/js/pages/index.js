require.context("../../images", true, /\.(png|svg|jpg)$/);
import "regenerator-runtime/runtime";
import "core-js/stable";
import 'src/public/scss/styles.scss';
// --------------------
// when navbar button or an anchor with href linked to signin modal is clicked
// it adds no-scroll behavior to the html page.
$('#signin-btn, a[href="#si-popup"]').click(function() {
  $('html').addClass('no-scroll');
});
// --------------------
// Applies the reset effect of the event above restoring scroll behavior to the html page.
$('#si-close-btn').click(function() {
  $('#popup__content').addClass('slide-out-top');
  $('html').removeClass('no-scroll');
  setTimeout(() => {
    $('#popup__content').removeClass('slide-out-top');
  }, 500);
});
// --------------------
// A Friendly alternative to closing signin modal. Triggers the signin modal close 
// button when the user clicks outside the modal. 
$('#popup__bg').click(function() {
  $('#si-close-btn')[0].click();
});
