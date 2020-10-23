import Cart from '@src/models/cart';
import mongoose from 'mongoose';

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
 const cart = await Cart.findOne({ userId: req.session.user._id });
 res.status(200).json({ cart: cart });
}

export const postCart = async (req, res, next) => {
  const { id, screenId, seat_type } = req.body;
  const newItem = { 
    itemId: id, 
    screenId: screenId,
    verified: false, 
    type: 'seating', 
    seat_type: seat_type,
    unit_price: getSeatingPrice(seat_type).toFixed(2) 
  };

  if(req.session.user) {
    await Cart.addItem(newItem, req.session.user._id); 
  } else {
    req.session.user = { _id: mongoose.Types.ObjectId().toHexString(), type: 'guest' };
    await Cart.addItem(newItem, req.session.user);
  }

  res.status(201).json({ msg: `${id} added to cart` });
}

export const deleteCartItem = async (req, res, next) => {
  let { id } = req.params;

  if(!id.includes('+')) {
    await Cart.deleteItem(id, req.session.user._id);
  } else {
    await Cart.clearCart(req.session.user._id);
  }
  
  res.status(200).json({ msg: `${id} removed from cart` });
}