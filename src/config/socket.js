import socketio from "socket.io";

import {
  addReservation,
  cancelReservation,
  cancelReservationBySeat,
  getReservations,
} from "@src/utils/lib/one-seat";

let io = null;

export default function (server) {
  io = socketio(server);

  io.on("connection", (socket) => {
    let ShakeScreenId = socket.handshake.query.screenId;

    console.log(`connection created. Handshake: ${ShakeScreenId}`);

    socket.on("reserve seat", ({ cartId, screenId, seat }) => {
      console.log("adding reservation...");
      addReservation(cartId, screenId, seat);
    });

    socket.on("update seats", (screenId) => {
      console.log("getting reservations...");
      getReservations(socket, screenId);
    });

    socket.on("cancel reservation", ({ cartId, screenId, seat }) => {
      console.log("cancelling reservations...");
      seat.split("-").forEach((resSeat) => {
        cancelReservationBySeat(cartId, screenId, resSeat);
      });
    });

    socket.on("clear reservation", ({ cartId, screenId }) => {
      console.log("clearing all reservations...");
      cancelReservation(cartId, screenId);
    });
  });
}
