let activeReservations = [];

export function getReservations(socket, screenId) {
  const reservedSeats = activeReservations.find((currentScreen) => currentScreen.id === screenId);

  if (reservedSeats) {
    console.log("====== RES FOUND");
    socket.emit("update reserved seats", { seats: reservedSeats.seats });
  } else {
    console.log("====== RES NOT FOUND");
    socket.emit("update reserved seats", { seats: [] });
  }
}
// -----------------
// Adds a reservation to the 'activeReservations'. if a reservation is found under the given cartId. It will
// be added to corresponding index and update. Other wise an ID using the screenId given will be created and pushed
// the cart ID and seats to it.
export function addReservation(cartId, screenId, seat) {
  const screenIdx = activeReservations.findIndex((screen) => screen.id === screenId);
  const screen = activeReservations[screenIdx];

  if (screen) {
    let reservationIdx = screen.seats.findIndex((user) => user.cartId === cartId);
    let reservation = screen.seats[reservationIdx];

    if (reservation) {
      reservation.reserved = [...reservation.reserved, seat];
      screen.seats[reservationIdx] = { ...reservation, reserved: reservation.reserved };
    } else {
      console.log(`not found reservation ${cartId}...adding`);
      let newMovieScreen = { cartId, reserved: [seat] };
      screen.seats.push(newMovieScreen);
    }
    activeReservations[screenIdx] = screen;
  } else {
    console.log(`new reservation added: ${cartId}`);
    let newReservation = { id: screenId, seats: [] };
    newReservation.seats.push({ cartId, reserved: [seat] });
    activeReservations.push(newReservation);
  }
}
// -----------------
// Unlike cancelReservationBySeat this takes the act of removing all reservations created
// by that visitor.
export function cancelReservation(cartId, screenId) {
  const reservationIdx = activeReservations.findIndex((reservation) => reservation.id === screenId);
  const reservation = activeReservations[reservationIdx];

  if (reservation) {
    const updatedReservations = {
      ...reservation,
      seats: reservation.seats.filter((resv) => resv.cartId !== cartId),
    };
    activeReservations[reservationIdx] = updatedReservations;
  }
  // removes the screen entirely from the reservations when seats array is empty.
  activeReservations = activeReservations.filter((res) => res.seats.length !== 0);
}
// -----------------
// Removes a specific reservation item using it seatId(seat).
export function cancelReservationBySeat(cartId, screenId, seat) {
  const screenIdx = activeReservations.findIndex((screen) => screen.id === screenId);
  const screen = activeReservations[screenIdx];

  if (screen) {
    let reservationIdx = screen.seats.findIndex((reservation) => reservation.cartId === cartId);
    let reservation = screen.seats[reservationIdx];

    if (reservation) {
      let updatedUser = { ...reservation };
      updatedUser.reserved = reservation.reserved.filter((currentSeat) => currentSeat !== seat);
      screen.seats[reservationIdx] = updatedUser;
      activeReservations[screenIdx] = screen;
    } else {
      return;
    }
  }
}
