import axios from "axios";
import headerConfig from "@src/config/headers";
import updateEJStemplate from "client_utils/ejsupdate";
import * as render from "client_utils/markup/cartMarkup";

// ---------------------
// socket initial handshake with server
let socket = io("localhost:5001", {
  query: `screenId=${$("#screen-avl__times-list .time").eq(0).data("id")}`,
});
// ---------------------
// Removes active class using the ids fround in the cart item
function removeActiveClass(seatItemId) {
  seatItemId.split("-").map((seat) => {
    $(`.seat-wrapper[data-id="${seat}"]`).children().removeClass("active");
  });
}
// ---------------------
// Adjust/update cart view when item is added/removed
function adjustCart(cartItems, cartTotalPrice) {
  const cartBtn = $("#cart-btn");

  $("#mycart__list").remove();

  cartBtn.removeAttr("disabled");
  cartBtn.html(`Purchase&nbsp;($${Number(cartTotalPrice).toFixed(2)})`);

  $("#mycart__list-wrapper").append(
    updateEJStemplate(render.cartItemList(), { cartItems, cartTotalPrice })
  );

  if (cartTotalPrice === 0) {
    cartBtn.html("Purchase");
    cartBtn.attr("disabled", "");
  }
}
// ---------------------
// Adjust/update mobile cart view when item is added/removed
function adjustMobileCart(cartItems, cartTotalPrice) {
  const mobileCart = $("#mobi-cart");
  let totalNumInCart = cartItems.reduce((total, item) => total + item.qty, 0);

  $("#mobi-cart__list").remove();
  $("#mobi-cart__total").html(`TOTAL: $&nbsp;${Number(cartTotalPrice).toFixed(2)}`);
  $("#mobi-cart__totalNum").html(`Selected ${totalNumInCart} seats`);
  $("#mobi-cart__list-wrapper").append(
    updateEJStemplate(render.mobiCartItemList(), { cartItems, cartTotalPrice })
  );

  if ($(window).width() < 1024) {
    if (totalNumInCart > 0) {
      mobileCart.removeClass("slide-out-bottom");
      mobileCart.css("visibility", "visible");
      mobileCart.addClass("slide-in-bottom");
    } else {
      mobileCart.removeClass("slide-in-bottom");
      mobileCart.css("visibility", "hidden");
      mobileCart.addClass("slide-out-bottom");
    }
  }
}
// ---------------------
// Event for when a cart needs to be updated. The desktop & mobile
// cart are updated depending on screen width.
function updateCart(cart) {
  adjustCart(cart.items, cart.totalPrice);
  adjustMobileCart(cart.items, cart.totalPrice);
}
// ---------------------
// Async post api call. Both adding the items(seats) to the cart, and
// updating the available/reserved seats via socket.io.
async function addItemToCart(id, seat_type) {
  const screenId = $("#screen-avl__times-list .time.active").data("id");
  const response = await axios.post("/api/cart", { id, screenId, seat_type }, headerConfig);

  socket.emit("reserve seat", { screenId, seat: id, cartId: response.data.cart._id });

  updateCart(response.data.cart);
}
// ---------------------
// Async delete api call. Both removing the items(seats) from the cart, and
// updating the available/reserved seats via socket.io.
async function removeItemFromCart(itemId) {
  const screenId = $("#screen-avl__times-list .time.active").data("id");
  const res = await axios.delete(`/api/cart/${itemId}`, headerConfig);

  socket.emit("cancel reservation", { screenId, seat: itemId, cartId: res.data.cart._id });

  updateCart(res.data.cart);
}
// ---------------------
// Clear/reset cart.
async function clearCart(itemsId) {
  const screenId = $("#screen-avl__times-list .time.active").data("id");
  const res = await axios.delete(`/api/cart/${itemsId.join("+")}`, headerConfig);
  const cart = res.data.cart;

  itemsId.forEach((itemId) => removeActiveClass(itemId));

  $("#mobi-cart__list").remove();
  $("#mycart__list").remove();

  socket.emit("clear reservation", { cartId: cart._id, screenId });

  updateCart(cart);
  return cart._id;
}
// ---------------------
// With a seatId provided, it removes the active class from the seats selected.
async function resetSelectedSeats(itemId) {
  if (itemId) {
    removeActiveClass(itemId);
    await removeItemFromCart(itemId);
  }
}

$(function () {
  // ---------------------
  // Upon page render it checks and updates the cart if any cart is found.
  axios.get("/api/cart").then((response) => {
    const cart = response.data.cart;
    if (cart) updateCart(response.data.cart);
  });
  // ---------------------
  // Per screening, Seats in the seating chart if it is not disabled(reserved),
  // toggle the seat from default state to active. Retrieve both the id and seat_type
  // and either add/remove item from cart.
  $(".seat-selection__layout-grid .seat-wrapper").on("click", function () {
    const seatBtn = $(this).children();
    const seatWrapper = $(this);

    if (!seatBtn.hasClass("disable")) {
      seatBtn.toggleClass("active");

      const id = seatWrapper.data("id");
      const seat_type = seatWrapper.data("type");

      if (seatBtn.hasClass("active")) {
        addItemToCart(id, seat_type);
      } else {
        removeItemFromCart(id);
      }
    }
  });
  // ---------------------
  // This targets a click event in the cart when the remove-cart-btn is clicked.
  // removing item from the cart and updating avaiablity.
  // ****************************************************************************
  // EXPORT THIS FUNCTION TO BE USED IN INDEX.JS FOR RESERVATIONS, WHEN USER CHANGES MOVIE TIME
  $("#mycart").on("click", "#remove-cart-btn", async function () {
    const cartItem = $(this).parent();
    const id = cartItem.data("id");

    await resetSelectedSeats(id);

    cartItem.remove();
  });

  $("#cart-btn, #mobi-cart-btn").on("click", function () {
    // functionality to either complete purchase or redirect to
    // checkout page where transaction is completed
    localStorage.setItem("murl", window.location.pathname);
    window.location.href = "/checkout";
  });
});

export { clearCart };
