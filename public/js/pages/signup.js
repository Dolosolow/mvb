const { toggleQuickTipImg } = require('../utils/global');

function addValidToSelect() {
  $('#state').change(function(e) {
    const selectedState = e.target.value;
    if(selectedState) {
      $('label[for="state"]').addClass('valid');
    } else {
      $('label[for="state"]').removeClass('valid');
    }
  });
}

function checkFormForChange() {
  $('.collapsible input').keypress(function() {
    checkFormForClass($(this).closest('li'));
  });

  $('.collapsible select').change(function() {
    checkFormForClass($(this).closest('li'));
  });

  $('.collapsible input[type="radio"]').change(function() {
    checkFormForClass($(this).closest('li'));
  });
}

function checkFormForClass(elm) {
  if(!$(elm).hasClass('complete')) {
    $(elm).addClass('complete');
  }
  return
}

$(document).ready(function(){
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
  // Acts like a :focus using jquery trigger() has one form open when
  // visitor first visits signup page
  $('.collapsible').collapsible('open', 0);
  // ---------------------
  // adds a class to the label when a selection is made on select input
  addValidToSelect();
  // ---------------------
  // Checks for any change on the form inputs, if change, adds class to 
  // corresponding li
  checkFormForChange();
});