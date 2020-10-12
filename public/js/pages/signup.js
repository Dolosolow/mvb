import validate from '../utils/validate';
const { toggleQuickTipImg } = require('../utils/global');

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
  if(selectedState) {
    $('label[for="state"]').addClass('valid');
  } else {
    $('label[for="state"]').removeClass('valid');
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
  if(validate.onlyDigits(e.target.value)) {
    let date = e.target.value.split('/');
    // uses validate for regex to help validate the user keys when typed.
    switch(date.length) {
      case 1: 
        return validate.twoDigitMonth(e.which, date, 'input#dob');
      case 2:
        return validate.twoDigitDay(e.which, date, 'input#dob');
      case 3:
        return validate.fourDigitYear(e.which, date);
      default:
        return;
    }
  } else if(e.which >= 65 && e.which <= 90){
    return false;
  }
});