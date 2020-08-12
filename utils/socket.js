const socketio = require('socket.io');
let io = null;

let activeReservations = [];

const addReservation = (socket, movieId, seat) => {
  const movieIdx = activeReservations.findIndex(mov => mov.id === movieId);
  const movie = activeReservations[movieIdx];
  let newMovie;

  if(movie) {
    let userIdx = movie.seats.findIndex(customer => customer.user === socket.id);
    let user = movie.seats[userIdx];

    if(user) {
      user.reserved.push(seat);
      movie.seats[userIdx] = user;
    } else {
      movie.seats.push({ user: socket.id, reserved: [seat] });
    }
    activeReservations[movieIdx] = movie;
  } else {
    newMovie = { id: movieId, seats: [] };
    newMovie.seats.push({ user: socket.id, reserved: [seat] });
    activeReservations.push(newMovie);
  }
}

const cancelReservation = (socket, movieId) => {
  const movieIdx = activeReservations.findIndex(mov => mov.id === movieId);
  const movie = activeReservations[movieIdx];

  if(movie) {
    activeReservations[movieIdx].seats = movie.seats.filter(user => user.user !== socket.id);
  }
}

const cancelReservationBySeat = (socket, movieId, seat) => {
  const movieIdx = activeReservations.findIndex(mov => mov.id === movieId);
  const movie = activeReservations[movieIdx];

  if(movie) {
    let userIdx = movie.seats.findIndex(customer => customer.user === socket.id);
    let user = movie.seats[userIdx];

    if(user) {
      let updatedUser = { ...user };
      updatedUser.reserved = user.reserved.filter(currentSeat => currentSeat !== seat);
      movie.seats[userIdx] = updatedUser;
      activeReservations[movieIdx] = movie;
    } else {
      return;
    }
  }
}

const getReservations = (socket, reservations) => {
  if(reservations) {
    socket.emit('check reserved seats', { seats: reservations.seats });
  }
}

module.exports = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const movieId = socket.handshake.query.movieId;

    const reservedSeats = activeReservations.find(currentMovie => currentMovie.id === movieId);
    getReservations(socket, reservedSeats);

    socket.on('disconnect', () => {
      cancelReservation(socket, movieId);
    });

    socket.on('reserve seat', ({ seat }) => {
      addReservation(socket, movieId, seat);
    });

    socket.on('cancel reservation', ({ seat }) => {
      seat.split('-').forEach(resSeat => {
        cancelReservationBySeat(socket, movieId, resSeat);
      })
    });
  });
}