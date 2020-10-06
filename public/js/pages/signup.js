// *************
// toggles showing and not showing sections of the form. 
// checks to see if a section of the form is visible on a new event
// click. If it is, it will first close(hide) the section before
// opening(showing) the other section.
// *************
$('.collapsible-form button').on('click', function() {
  let formSection = $(`#${$(this).attr('id')}__form`);
  let matchFound = false;

  $('.collapsible-form button').each(function() {
    let currentSection = $(`#${$(this).attr('id')}__form`);

    if(!currentSection.hasClass('form__hidden')) {
      $(this).toggleClass('btn-transparent--dark');
      currentSection.toggleClass('form__hidden');

      matchFound = currentSection.html() === formSection.html();
    }
  })

  if(!matchFound) {
    $(this).toggleClass('btn-transparent--dark');
    formSection.toggleClass('form__hidden');
  }
});
// *************
// for input type of radio, checks for change whether (not)checked. 
// adds style for the corresponding form.
// *************
$('#act-personal__form').find(':input').change(function() {
  if($(this).is(':checked')) {
    $(this).closest('.collapsible-form').addClass('complete');
  }
});
// *************
// same as function above but for all inputs except type radio, checks for change whether is equal to ''/blank. 
// *************
$('form').find(':input').not('[type=radio]').each(function() {
  $(this).keyup(function() {
    if($(this).val() !== '') {
      $(this).closest('.collapsible-form').addClass('complete');
    } else {
      $(this).closest('.collapsible-form').removeClass('complete');
    }
  })
})