import mongoose from "mongoose";

import CartServices from "@src/services/CartService";
/**
 * Returns a cart
 */
export const getCart = async (req, res, next) => {
  const cart = await CartServices.getCartByUserId(req.session.user._id);
  if (cart) {
    res.status(200).json({
      msg: `Returning Cart found ${cart.id}.`,
      cart: { _id: cart._id, items: cart.items, totalPrice: cart.totalPrice },
    });
  } else {
    res.status(200).json({ cart: null });
  }
};
/**
 * Returns the ids for the seats in the cart
 */
export const getCartSeatIds = async (req, res, next) => {
  const { cartId, seatIds } = await CartServices.getCartSeatsId(req.session.user._id);

  if (cartId) {
    res.status(200).json({
      msg: `Returning seat ids for ${cartId}.`,
      cartId,
      seatIds,
    });
  } else {
    res.status(200).json({ cartId, seatIds });
  }
};
/**
 * Adds an item to the cart
 */
export const postCart = async (req, res, next) => {
  let cart;

  if (!req.session.user) {
    req.session.user = { _id: mongoose.Types.ObjectId().toHexString(), type: "guest" };
  }

  cart = await CartServices.addToCart(req.body, req.session.user._id);

  res.status(201).json({
    msg: `${req.body.id} added to cart`,
    cart: { _id: cart._id, items: cart.items, totalPrice: cart.totalPrice },
  });
};
/**
 * Removes an item from the cart
 */
export const deleteCartItem = async (req, res, next) => {
  let { id } = req.params;

  const cart = await CartServices.deleteCartItem(id, req.session.user._id);

  res.status(200).json({
    msg: `${id} removed from cart`,
    cart: { _id: cart._id, items: cart.items, totalPrice: cart.totalPrice },
  });
};
