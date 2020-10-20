import axios from 'axios';
import * as render from 'client_utils/markup/cartMarkup';
import updateEJStemplate from 'client_utils/ejsupdate';

// ---------------------
// socket initial handshake with server
let socket = io('localhost:5001', { query: `screenId=${$('#screen-avl__times-list .time').eq(0).data('id')}` });
// ---------------------
// Removes active class using the ids fround in the cart item
function removeActiveClass(seatItemId) {
  seatItemId.split('-').map(seat => {
    $(`.seat-wrapper[data-id="${seat}"]`).children().removeClass('active');
  });
}
// ---------------------
// Adjust/update cart view when item is added/removed
function adjustCart(cartItems, cartTotalPrice) {
  $('#mycart__list').remove();
  $('#cart-btn').removeAttr('disabled');
  $('#cart-btn').html(`Purchase&nbsp;($${Number(cartTotalPrice).toFixed(2)})`);
  $('#mycart__list-wrapper').append(updateEJStemplate(render.cartItemList(), { cartItems, cartTotalPrice } ));

  if(cartTotalPrice === 0) {
    $('#cart-btn').html('Purchase');
    $('#cart-btn').attr('disabled', '');
  }
}
// ---------------------
// Adjust/update mobile cart view when item is added/removed
function adjustMobileCart(cartItems, cartTotalPrice) {
  let totalNumInCart = cartItems.reduce((total, item) => total + item.qty, 0);
  
  $('#mobi-cart__list').remove();
  $('#mobi-cart__total').html(`TOTAL: $&nbsp;${Number(cartTotalPrice).toFixed(2)}`);
  $('#mobi-cart__totalNum').html(`Selected ${totalNumInCart} seats`);
  $('#mobi-cart__list-wrapper').append(updateEJStemplate(render.mobiCartItemList(), {cartItems, cartTotalPrice}));

  if($(window).width() < 1024) {
    if(totalNumInCart > 0) {
      $('#mobi-cart').removeClass('slide-out-bottom');
      $('#mobi-cart').css('visibility', 'visible');
      $('#mobi-cart').addClass('slide-in-bottom');
    } else {
      $('#mobi-cart').removeClass('slide-in-bottom');
      $('#mobi-cart').css('visibility', 'hidden');
      $('#mobi-cart').addClass('slide-out-bottom');
    }
  }
}
// ---------------------
// Event for when a cart needs to be updated. The desktop & mobile
// cart are updated depending on screen width.
function updateCart({ cart }) {
  adjustCart(cart.items, cart.totalPrice);
  adjustMobileCart(cart.items, cart.totalPrice);
}
// ---------------------
// Async post api call. Both adding the items(seats) to the cart, and 
// updating the available/reserved seats via socket.io. 
async function addItemToCart(id, seat_type) {
  const screenId = $('#screen-avl__times-list .time.active').data('id');
  await axios.post('/api/cart', { id, screenId, seat_type });
  const res = await axios.get('/api/cart');

  socket.emit('reserve seat', { seat: id });
  updateCart(res.data);
}
// ---------------------
// Async delete api call. Both removing the items(seats) from the cart, and 
// updating the available/reserved seats via socket.io. 
async function removeItemFromCart(itemId) {
  await axios.delete(`/api/cart/${itemId}`);
  const res = await axios.get('/api/cart');

  socket.emit('cancel reservation', { seat: itemId });
  updateCart(res.data);
}
// ---------------------
// With a seatId provided, it removes the active class from the seats selected.
async function resetSelectedSeats(itemId) {
  if(itemId) {
    removeActiveClass(itemId);
    await removeItemFromCart(itemId);
  }
}
// ---------------------
// Clear/reset cart.
async function clearCart(itemsId) {
  await axios.delete(`/api/cart/${itemsId.join('+')}`);

  itemsId.forEach(itemId => removeActiveClass(itemId));
  
  $('#mobi-cart__list').remove();
  $('#mycart__list').remove();
  socket.emit('clear reservation');
  
  const res = await axios.get('/api/cart');
  updateCart(res.data);
}
// ---------------------
// Per screening, Seats in the seating chart if it is not disabled(reserved), 
// toggle the seat from default state to active. Retrieve both the id and seat_type 
// and either add/remove item from cart. 
$('.seat-selection__layout-grid .seat-wrapper').on('click', function() {
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
// ---------------------
// This targets a click event in the cart when the remove-cart-btn is clicked. 
// removing item from the cart and updating avaiablity.
// ****************************************************************************
// EXPORT THIS FUNCTION TO BE USED IN INDEX.JS FOR RESERVATIONS, WHEN USER CHANGES MOVIE TIME
$('#mycart').on('click', '#remove-cart-btn', async function() {
  const cartItem = $(this).parent();
  const id = cartItem.data('id');
  await resetSelectedSeats(id);
  cartItem.remove();  
})

$('#cart-btn').click(function() {
  // functionality to either complete purchase or redirect to 
  // checkout page where transaction is completed
  window.location.href = '/checkout';
})

export { clearCart };