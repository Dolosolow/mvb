// *******************
// general nav-tabs 
// toggles section selected with navigation tabs. compares clicked element with corresponding section
$('.nav-tabs__item').click(function() {
  let tabSelected = $(this).data('target');

  $('.nav-tabs__item').each(function() {
    let currentSection = $(this).data('target');

    if(currentSection === tabSelected) {
      $(this).addClass('active');
      $(`#${currentSection}`).css('display', 'block');
    } else {
      $(this).removeClass('active');
      $(`#${currentSection}`).css('display', 'none');
    }
  })
})