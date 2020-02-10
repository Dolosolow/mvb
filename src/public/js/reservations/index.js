import axios from "axios";

import { movieStartTime } from "client_utils/markup/movieStartTime";
import updateEJStemplate from "client_utils/ejsupdate";
import * as time from "client_utils/time";

import { clearCart } from "./seat-reservations";

// ---------------------
// socket initial handshake with server
let socket = io(
  process.env.NODE_ENV === "development"
    ? "localhost:5001"
    : "https://flix-movie-ticket-booking-site.herokuapp.com",
  {
    query: `screenId=${$("#screen-avl__times-list .time").eq(0).data("id")}`,
  }
);
// --------------------------
// A timer where if it reaches 0:00 will cancel any reservations created by that visitor; If they have not
// reached the checkout phase of the transaction.
async function setTimer(timeLeft) {
  $("#mycart__timer span").text(timeLeft);

  if (timeLeft === "0:00") {
    const response = await axios.get("/api/cart/seats-ids");
    const reservedSeats = response.data.seatIds;

    if (reservedSeats.length) {
      await clearCart(reservedSeats);
    }

    time.startTimer(5, setTimer);
  }
}
// --------------------------
// Checks for reserved seats for the given screenId in the DB. If any are found it returns the info 'confirmedSeats'
async function checkForReservedSeats(screenId) {
  const screenResponse = await axios.get(`/api/movies/screens/${screenId}`);
  const cartResponse = await axios.get("/api/cart");

  const chart = screenResponse.data.screen.seating_chart;
  let confirmedSeats = [];

  if (cartResponse.data.cart) {
    cartResponse.data.cart.items.map((item) => {
      const ids = item.itemId.split("-");
      confirmedSeats.push([...ids]);
    });
  }

  chart.map((row) => {
    const rowSeats = row.seats;
    if (rowSeats) {
      for (let i = 0; i < rowSeats.length - 1; i++) {
        if (rowSeats[i].reserved) confirmedSeats.push(rowSeats[i].id.toUpperCase());
      }
    }
  });

  return confirmedSeats;
}
// --------------------------
// checks for any reservations, any seats with the class active(reserved). If any is found, it applies the attribute
// disabled to that seat preventing any other visitors from reserving it concurrently.
async function setSeatingGrid(seats) {
  $(".seat-wrapper button").prop("disabled", false);

  const response = await axios.get("/api/cart/seats-ids");
  const reservedSeats = response.data.seatIds;

  seats.forEach((reservation) => {
    reservation.reserved.forEach((seat) => {
      if (reservedSeats.join("-").includes(seat)) {
        $(`.seat-wrapper[data-id="${seat}"]`).children().addClass("active");
      } else {
        if (!$(`.seat-wrapper[data-id="${seat}"]`).children().hasClass("active")) {
          $(`.seat-wrapper[data-id="${seat}"]`).children().addClass("disable");
          $(`.seat-wrapper[data-id="${seat}"]`).children().prop("disabled", true);
        }
      }
    });
  });
}
// --------------------------
// When triggered updates the current data with the new screenId request.
async function updateScreenInfo(screenId, newScreenId) {
  // ------------------------
  // remove selected seats and unreserve them.
  const cartItems = $("#mycart__list .mycart__item").first().data("id");
  const reservedSeats = await checkForReservedSeats(newScreenId);

  if (cartItems) {
    const cartId = await clearCart(cartItems.split("-"));
    socket.emit("clear reservation", { cartId, screenId });
  }

  socket.emit("update seats", newScreenId);
  socket.on("update reserved seats", ({ seats }) => {
    const confirmedSeats = [...seats, { cartId: "db", reserved: reservedSeats }];
    setSeatingGrid(confirmedSeats);
  });

  const response = await axios.get(`/api/movies/screens/${screenId}`);

  $("#screenRoom").text(response.data.screen.screenRoom);
}

// --------------------------
// using the info provided in the parameters it removes the the old time list if any, replacing it with
// the dates playing for the date selected.
async function getMovieStartTimes(movieId, selectedDate) {
  const response = await axios.get(`/api/movies/${movieId}?date=${selectedDate}`);
  $("#screen-avl__times-list").remove();
  $("#screen-avl__times").append(
    updateEJStemplate(movieStartTime(), { times: response.data.schedule.times })
  );

  return response.data.schedule;
}
// ------------------------
// event handler for when a start time is clicked. If different from the current selected time, changes
// to the newly selected time, cancels/removes any reservations created prior to the new time clicked, and
// updates screen info. Otherwise nothing is done.
async function changeStartTime() {
  const screenId = $(this).data("id");
  const currentScreenId = $("#screen-avl__times-list .time.active").data("id");

  if (screenId !== currentScreenId) {
    $("#screen-avl__times-list .time").removeClass("active");
    $(this).addClass("active");

    updateScreenInfo(currentScreenId, screenId);
  }
}

$(function () {
  // ------------------------
  // reservation timer starts once everything has been rendered.
  time.startTimer(5, setTimer);
  // ------------------------
  // helps render page with most current information
  updateScreenInfo(
    $("#screen-avl__times-list .time.active").data("id"),
    $("#screen-avl__times-list .time.active").data("id")
  );
  // --------------------------
  // Targeted towards the screen info to be updated on time clicked.
  $("#screen-avl__times").on("click", "#screen-avl__times-list .time", changeStartTime);
  // --------------------------
  // Targeted towards the dates being screened.
  $("#screen-dates-list").on("scroll", function () {
    const movieId = location.pathname.toString().split("/")[2];

    if ($(this).data("scrollTimeout")) {
      clearTimeout($(this).data("scrollTimeout"));
    }

    $(this).data(
      "scrollTimeout",
      setTimeout(async () => {
        const currentScreenId = $("#screen-avl__times-list .time.active").data("id");

        $(".screen-avl__date").each(async function () {
          const maxOffset = $(window).width() > 700 ? 480 : 145;
          const minOffset = $(window).width() > 700 ? 460 : 130;

          if ($(this).offset().left >= minOffset && $(this).offset().left <= maxOffset) {
            const selectedDate = $(this).data("date");

            window.history.pushState("", "", `?date=${selectedDate}`);

            const schedule = await getMovieStartTimes(movieId, selectedDate);

            updateScreenInfo(currentScreenId, schedule.times[0].screenId);
          }
        });
      }, 900)
    );
  });
});
