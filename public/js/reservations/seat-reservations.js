const axios = require('axios');
const render = require('../helpers/markup/cartMarkup');
const socket = require('./index').connectedSocket;
const updateEJStemplate = require('../helpers/ejsupdate');

function adjustCart(cartItems, cartTotalPrice) {
  $('#cart').remove();
  $('#cart-btn').removeAttr('disabled');
  $('#cart-btn').html(`Purchase&nbsp;($${Number(cartTotalPrice).toFixed(2)})`);
  $('#seat-selection_list-wrapper').append(updateEJStemplate(render.seatingCartlist(), { cartItems, cartTotalPrice } ));

  if(cartTotalPrice === 0) {
    $('#cart-btn').html('Purchase');
    $('#cart-btn').attr('disabled', '');
  }
}

function adjustMobileCart(cartItems, cartTotalPrice) {
  let totalItems = cartItems.reduce((total, item) => total + item.qty, 0);
  $('#mobi-cart__total h5').html(`TOTAL: &nbsp;$${Number(cartTotalPrice).toFixed(2)}`);
  $('#mobi-cart__total p').html(`Selected ${totalItems} seats`);

  if(totalItems === 0) {
    $('#mobi-cart').removeClass('slide-in-bottom');
    $('#mobi-cart').addClass('slide-out-bottom');
  } else {
    $('#mobi-cart').removeClass('slide-out-bottom');
    $('#mobi-cart').css('visibility', 'visible');
    $('#mobi-cart').addClass('slide-in-bottom');
  }
}

function updateCart({ cart }) {
  const cartItems = cart.products;
  const cartTotalPrice = cart.totalPrice;

  if($(window).width() > 1024) {
    adjustCart(cartItems, cartTotalPrice);
  } else {
    adjustMobileCart(cartItems, cartTotalPrice);
  }
}

async function addItemToCart(id, seat_type) {
  await axios.post('/api/cart', { id, seat_type });
  const res = await axios.get('/api/cart');

  socket.emit('reserve seat', { seat: id });
  updateCart(res.data);
}

async function removeItemFromCart(id) {
  await axios.delete(`/api/cart/${id}`);
  const res = await axios.get('/api/cart');

  socket.emit('cancel reservation', { seat: id });
  updateCart(res.data);
}

$('.seat-selection__layout-grid .seat-wrapper').on('click', async function() {
  if(!$(this).children().hasClass('disable')) {
    $(this).children().toggleClass('active');

    const id = $(this).data('id');
    const seat_type = $(this).data('type');

    if($(this).children().hasClass('active')) {
      addItemToCart(id, seat_type);
    } else {
      removeItemFromCart(id);
    }
  }
})

$('#seat-selection__cart').on('click', '#remove-cart-btn', function() {
  const cartItem = $(this).parent();
  const id = cartItem.data('id');
  id.split('-').map(seat => {
    $(`.seat-wrapper[data-id="${seat}"]`).children().removeClass('active');
  })
  removeItemFromCart(id);
  cartItem.remove();  
})

$('#cart-btn').click(function() {
  // functionality to either complete purchase or redirect to 
  // checkout page where transaction is completed
  alert('clicked purchased')
})