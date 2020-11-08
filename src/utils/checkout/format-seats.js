export const formatSeats = (cartItems) => {
  let numOfTickets = 0;

  const seats = cartItems.map((item) => {
    numOfTickets += +item.qty;
    return {
      id: {
        seat_type: item.seat_type,
        seat_id: item.itemId,
        qty: item.qty,
      },
    };
  });

  return { qty: numOfTickets, seats };
};
