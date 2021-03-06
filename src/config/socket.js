import socketio from 'socket.io';
let io = null;
// -----------------------------
// temp array holding reservations. Considering to move over to redis
let activeReservations = [];

function addReservation(socket, screenId, seat) {
  const screenIdx = activeReservations.findIndex(screen => screen.id === screenId);
  const screen = activeReservations[screenIdx];
  let newMovie;

  if(screen) {
    let userIdx = screen.seats.findIndex(customer => customer.user === socket.id);
    let user = screen.seats[userIdx];


    if(user) {
      user.reserved.push(seat);
      screen.seats[userIdx] = user;
    } else {
      screen.seats.push({ user: socket.id, reserved: [seat] });
    }
    activeReservations[screenIdx] = screen;
  } else {
    newMovie = { id: screenId, seats: [] };
    newMovie.seats.push({ user: socket.id, reserved: [seat] });
    activeReservations.push(newMovie);
  }
}
// -----------------
// Unlike cancelReservationBySeat this takes the act of removing all reservations created
// by that visitor. 
function cancelReservation(socket, screenId) {
  const screenIdx = activeReservations.findIndex(screen => screen.id === screenId);
  const screen = activeReservations[screenIdx];

  if(screen) {
    activeReservations[screenIdx].seats = screen.seats.filter(user => user.user !== socket.id);
  }
}
// -----------------
// Removes a specific reservation item using it seatId(seat).
function cancelReservationBySeat(socket, screenId, seat) {
  const screenIdx = activeReservations.findIndex(screen => screen.id === screenId);
  const screen = activeReservations[screenIdx];

  if(screen) {
    let userIdx = screen.seats.findIndex(customer => customer.user === socket.id);
    let user = screen.seats[userIdx];

    if(user) {
      let updatedUser = { ...user };
      updatedUser.reserved = user.reserved.filter(currentSeat => currentSeat !== seat);
      screen.seats[userIdx] = updatedUser;
      activeReservations[screenIdx] = screen;
    } else {
      return;
    }
  }
}

function getReservations(socket, screenId) {
  const reservedSeats = activeReservations.find(currentScreen => currentScreen.id === screenId);

  if(reservedSeats) {
    socket.emit('update reserved seats', { seats: reservedSeats.seats });
  } else {
    socket.emit('update reserved seats', { seats: [] });
  }
}

export default function(server) {
  io = socketio(server);

  io.on('connection', socket => {
    let screenId = socket.handshake.query.screenId;
    getReservations(socket, screenId);

    socket.on('reserve seat', ({ seat }) => {
      addReservation(socket, screenId, seat);
    });

    socket.on('update seats', screenTestId => {
      screenId = screenTestId;
      getReservations(socket, screenId);
    });

    socket.on('cancel reservation', ({ seat }) => {
      seat.split('-').forEach(resSeat => {
        cancelReservationBySeat(socket, screenId, resSeat);
      })
    });

    socket.on('clear reservation', () => {
      cancelReservation(socket, screenId);
    });

    socket.on('disconnect', () => {
      cancelReservation(socket, screenId);
    });
  });
}