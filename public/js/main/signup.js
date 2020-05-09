// *************
// toggles showing and not showing sections of the form. 
// checks to see if a section of the form is visible on a new event
// click. If it is, it will first close(hide) the section before
// opening(showing) the other section.
// *************
$('.form-container button').on('click', function() {
  let formSection = $(`#${$(this).attr('id')}-form`);
  let matchFound = false;

  $('.form-container button').each(function() {
    let currentSection = $(`#${$(this).attr('id')}-form`);

    if(currentSection.parent().hasClass('show')) {
      currentSection.parent().removeClass('show');
      currentSection.removeClass('show');

      matchFound = currentSection.html() === formSection.html();
    }
  })

  if(!matchFound) {
    formSection.parent().toggleClass('show');
    formSection.toggleClass('show');
  }
});
// *************
// for input type of radio, checks for change whether (not)checked. 
// adds style for the corresponding li.
// *************
$('.form-container li form').find(':input').change(function() {
  if($(this).is(':checked')) {
    $(this).closest('li').addClass('complete');
  }
});
// *************
// same as function above but for all inputs except type radio, checks for change whether is equal to ''/blank. 
// *************
$('form').find(':input').not('[type=radio]').each(function() {
  $(this).keyup(function() {
    if($(this).val() !== '') {
      $(this).closest('li').addClass('complete');
    } else {
      $(this).closest('li').removeClass('complete');
    }
  })
})