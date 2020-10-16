import Cart from '@src/models/cart';

const priceCatelog = {
  seats: {
    SEAT_REG: 18.00,
    SEAT_CPLE: 40.00,
    SEAT_VIP: 30.00,
    SEAT_ACC: 18.00
  },
};

function getSeatingPrice(seat_type) {
  switch (seat_type) {
    case 'seat-reg':
      return priceCatelog.seats.SEAT_REG;
    case 'seat-cple':
      return priceCatelog.seats.SEAT_CPLE;
    case 'seat-vip':
      return priceCatelog.seats.SEAT_VIP;
    case 'seat-acc':
      return priceCatelog.seats.SEAT_ACC;
    default:
      return null;
  }
}

export const getCart = async (req, res, next) => {
 const cart = await Cart.getCart(req.user.id);
 res.status(200).json({ cart: cart });
}

export const postCart = async (req, res, next) => {
  const { id, seat_type } = req.body;
  const newProduct = { 
    id, 
    verified: false, 
    type: 'seating', 
    unit_price: getSeatingPrice(seat_type).toFixed(2) 
  };

  if(newProduct.type === 'seating') {
    newProduct.seat_type = seat_type;
  }

  const cart = new Cart();

  await cart.createCart(req.user.id);
  await Cart.addItem(newProduct, req.user.id);  

  res.status(201).json({ msg: `${id} added to cart` });
}

export const deleteCartItem = (req, res, next) => {
  const { id } = req.params;
  Cart.deleteItem(id, req.user.id);
  
  res.status(200).json({ msg: `${id} removed from cart` });
}