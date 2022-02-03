import socketio from 'socket.io';
let io = null;
// -----------------------------
// temp array holding reservations. Considering to move over to redis
let activeReservations = [];

function addReservation(cartId, screenId, seat) {
  const screenIdx = activeReservations.findIndex(screen => screen.id === screenId);
  const screen = activeReservations[screenIdx];

  if (screen) {
    let reservationIdx = screen.seats.findIndex(user => user.cartId === cartId);
    let reservation = screen.seats[reservationIdx];

    if (reservation) {
      console.log(`found reservation ${cartId}`);
      reservation.reserved = [...reservation.reserved, seat];
      screen.seats[reservationIdx] = { ...reservation, reserved: reservation.reserved };
    } else {
      console.log(`not found reservation ${cartId}...adding`);
      let newMovieScreen = { cartId, reserved: [seat] };
      screen.seats.push(newMovieScreen);
    }
    activeReservations[screenIdx] = screen;
  } else {
    console.log(`new reservation added: ${cartId}`)
    let newReservation = { id: screenId, seats: [] };
    newReservation.seats.push({ cartId, reserved: [seat] });
    activeReservations.push(newReservation);
  }
}
// -----------------
// Unlike cancelReservationBySeat this takes the act of removing all reservations created
// by that visitor. 
function cancelReservation(cartId, screenId) {
  const reservationIdx = activeReservations.findIndex(reservation => reservation.id === screenId);
  const reservation = activeReservations[reservationIdx];

  if (reservation) {
    const updatedReservations = reservation.seats.filter(resv => resv.cardId !== cartId);
    activeReservations[reservationIdx] = updatedReservations;
  }
}
// -----------------
// Removes a specific reservation item using it seatId(seat).
function cancelReservationBySeat(cartId, screenId, seat) {
  const screenIdx = activeReservations.findIndex(screen => screen.id === screenId);
  const screen = activeReservations[screenIdx];

  if (screen) {
    let reservationIdx = screen.seats.findIndex(reservation => reservation.cartId === cartId);
    let reservation = screen.seats[reservationIdx];

    if (reservation) {
      let updatedUser = { ...reservation };
      updatedUser.reserved = reservation.reserved.filter(currentSeat => currentSeat !== seat);
      screen.seats[reservationIdx] = updatedUser;
      activeReservations[screenIdx] = screen;
    } else {
      return;
    }
  }
}

function getReservations(socket, screenId) {
  const reservedSeats = activeReservations.find(currentScreen => currentScreen.id === screenId);

  if (activeReservations.length) console.log(activeReservations[0].seats);

  if (reservedSeats) {
    console.log('====== RES FOUND')
    socket.emit('update reserved seats', { seats: reservedSeats.seats });
  } else {
    console.log('====== RES NOT FOUND')
    socket.emit('update reserved seats', { seats: [] });
  }
}

export default function (server) {
  io = socketio(server);

  io.on('connection', socket => {
    let screenId = socket.handshake.query.screenId;

    socket.on('reserve seat', ({ cartId, seat }) => {
      addReservation(cartId, screenId, seat);
    });

    socket.on('update seats', screenId => {
      getReservations(socket, screenId);
    });

    socket.on('cancel reservation', ({ cartId, seat }) => {
      seat.split('-').forEach(resSeat => {
        cancelReservationBySeat(cartId, screenId, resSeat);
      })
    });

    socket.on('clear reservation', ({ cartId, screenId }) => {
      cancelReservation(cartId, screenId);
    });
  });
}