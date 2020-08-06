const { startTimer, stopTimer } = require('../utils/stopwatch');
const { updateTemplate } = require('../utils/ejsupdate');
const render = require('../utils/markup/cartMarkup');
const axios = require('axios');

// *************
// reservation timer for selecting seats and completing the reservation
// *************
const setTimer = timeLeft => {
  $('#mycart__timer span').text(timeLeft);
}

// *************
// seating grid, seat clicked
// *************
$('.seat-selection__layout-grid .seat-wrapper').on('click', async function() {
  if(!$(this).children().hasClass('disable')) {
    $(this).children().toggleClass('active');

    const id = $(this).data('id');
    const seat_type = $(this).data('type');

    if($(this).children().hasClass('active')) {
    await axios.post('/cart', { id, seat_type });

    const res = await axios.get('/cart');
    const cartItems = res.data.cart.products;
    const cartTotalPrice = res.data.cart.totalPrice;
    if($(window).width() > 1024) {
      if(cartItems.length > 0) {
        $('#cart').remove();
        $('#cart-btn').removeAttr('disabled');
        $('#cart-btn').html(`Purchase&nbsp;($${Number(cartTotalPrice).toFixed(2)})`);
        $('#seat-selection_list-wrapper').append(updateTemplate(render.cartList(), { cartItems, cartTotalPrice } ));
      } else {
        $('#cart-btn').attr('disabled', '');
      }
    } else {
      if(cartItems.length > 0) {
        const numOfItemsSelected = cartItems.reduce((acc, item) => acc + item.qty, 0);
        $('#mobi-cart').css('display', 'flex');
        $('#mobi-cart').removeClass('slide-out-bottom');
        $('#mobi-cart').addClass('bounce-in-bottom');
        $('#mobi-cart__total h5').html(`TOTAL: &nbsp;$${Number(cartTotalPrice).toFixed(2)})`);
        $('#mobi-cart__total p').html(`Selected ${numOfItemsSelected} seats`);
      }
    }

    } else {
      await axios.delete(`/cart/${id}`);

      const res = await axios.get('/cart');
      const cartItems = res.data.cart.products;
      const cartTotalPrice = res.data.cart.totalPrice;

      if($(window).width() > 1024) {
        $('#cart').remove();
        $('#cart-btn').removeAttr('disabled');
        $('#cart-btn').html(`Purchase&nbsp;($${Number(cartTotalPrice).toFixed(2)})`);
        $('#seat-selection_list-wrapper').append(updateTemplate(render.cartList(), { cartItems, cartTotalPrice } ));
  
        if(cartTotalPrice === 0) {
          $('#cart-btn').html('Purchase');
          $('#cart-btn').attr('disabled', '');
        }
      } else {
        const numOfItemsSelected = cartItems.reduce((acc, item) => acc + item.qty, 0);

        $('#mobi-cart__total h5').html(`TOTAL: &nbsp;$${Number(cartTotalPrice).toFixed(2)})`);
        $('#mobi-cart__total p').html(`Selected ${numOfItemsSelected} seats`);

        if(numOfItemsSelected === 0) {
          $('#mobi-cart').removeClass('bounce-in-bottom');
          $('#mobi-cart').addClass('slide-out-bottom');
        }
      }
    }
  }
})


$(document).ready(() => {
  startTimer(900, setTimer);
  // *************
  // assign seat-type and seat-id(seating number)
  // *************
  $('.seat-row').each((idx, row) => {
    let rowchar = $(row).children('.row-char')[0];
    let rowId = $(rowchar).data('row').toUpperCase();

    $(row).children().each(function(idx, seat) {
      if($(seat).hasClass('seat-wrapper')) {
        let seatType = $(this).children()[0];

        $(this).attr('data-id', `${rowId}${idx}`);
        $(this).attr('data-type', `${$(seatType).attr('class')}`);
      }
    })
  })
})
