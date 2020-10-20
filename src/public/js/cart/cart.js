// ---------------------------
// Expands/collapses cart item list on mobile view
$('#mobi-cart > button').click(function() {
  const list = $('#mycart__list, #mobi-cart__list');

  $(list).toggleClass('show');

  if($('button i').hasClass('fa-chevron-up')) {
    $('button i').removeClass('fa-chevron-up');
    $('button i').addClass('fa-chevron-down');
  } else {
    $('button i').removeClass('fa-chevron-down');
    $('button i').addClass('fa-chevron-up');
  }
});