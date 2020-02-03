import validation from '@src/public/js/utils/validation';
import { toggleQuickTipImg } from 'client_utils/global';

function checkFormForClass(elm) {
  if(!$(elm).hasClass('complete')) {
    $(elm).addClass('complete');
  }
  return;
};
// ---------------------
// handles toggling the cc-cvc tip button
$('.toggle-info-btn').click(function() {
  toggleQuickTipImg('.cvc-loc-img');
});
// ---------------------
// calls for initializing materializecss components
$('.collapsible').collapsible();
$('#state').formSelect();
// ---------------------
// acts like a :focus using jquery trigger() has one form open when
// visitor first visits signup page
$('.collapsible').collapsible('open', 0);
// ---------------------
// adds a class to the label when a selection is made on select input
$('#state').change(function(e) {
  const selectedState = e.target.value;
  const stateLabel = $('label[for="state"]');
  
  if(selectedState) {
    stateLabel.addClass('valid');
  } else {
    stateLabel.removeClass('valid');
  }
});
// ---------------------
// checks for any change on the form inputs, if change, adds class to 
// corresponding li
$('.collapsible input').keypress(function() {
  checkFormForClass($(this).closest('li'));
});

$('.collapsible select').change(function() {
  checkFormForClass($(this).closest('li'));
});

$('.collapsible input[type="radio"]').change(function() {
  checkFormForClass($(this).closest('li'));
});
// -----------------------
// makes user date of birth input friendlier. i.e. If user on input for month adds 9 it
// autocompletes the month input as 09. Applies to day of the month and year.
$('input#dob').on('keyup keydown',function(e) {
  if(validation.onlyDigits(e.target.value)) {
    let date = e.target.value.split('/');
    // uses validate for regex to help validate the user keys when typed.
    switch(date.length) {
      case 1: 
        return validation.twoDigitMonth(e.which, date, 'input#dob');
      case 2:
        return validation.twoDigitDay(e.which, date, 'input#dob');
      case 3:
        return validation.fourDigitYear(e.which, date);
      default:
        return;
    }
  } else if(e.which >= 65 && e.which <= 90){
    return false;
  }
});

$(document).ready(function() {
  if(sessionStorage.silverEmail) {
    let email = $('#su-email');

    email.addClass('valid');
    email.siblings('label').addClass('active');
    email.val(sessionStorage.silverEmail);

    delete sessionStorage.silverEmail;
  }
})