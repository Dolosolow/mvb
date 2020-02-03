import moment from "moment";

import Cart from "@src/models/cart";
import Screen from "@src/models/screen";

import EmailService from "@src/services/EmailService";
import { formatSeats } from "@src/utils/checkout/format-seats";

const itemCatelog = {
  SEATING: "SEATING",
};

const priceCatelog = {
  seats: {
    SEAT_REG: 18.0,
    SEAT_CPLE: 40.0,
    SEAT_VIP: 30.0,
    SEAT_ACC: 18.0,
  },
};

function getSeatingPrice(itemObjDesc) {
  switch (itemObjDesc.item_type) {
    case itemCatelog.SEATING:
      switch (itemObjDesc.seat_type) {
        case "seat-reg":
          return priceCatelog.seats.SEAT_REG;
        case "seat-cple":
          return priceCatelog.seats.SEAT_CPLE;
        case "seat-vip":
          return priceCatelog.seats.SEAT_VIP;
        case "seat-acc":
          return priceCatelog.seats.SEAT_ACC;
        default:
          return null;
      }
    default:
      return null;
  }
}

export default class CartService {
  static addToCart = async (item, userId) => {
    console.log("adding item(s) to cart....");

    return new Promise(async (resolve, reject) => {
      const { id, screenId, seat_type } = item;
      const newItem = {
        itemId: id,
        screenId: screenId,
        verified: false,
        type: "seating",
        seat_type: seat_type,
        unit_price: getSeatingPrice({
          item_type: itemCatelog.SEATING,
          seat_type: seat_type,
        }).toFixed(2),
      };

      try {
        const cart = await Cart.addItem(newItem, userId.toString());
        resolve(cart);
      } catch (err) {
        reject("Error: Something went wrong, item was not added");
      }
    });
  };

  static clearCart = (cartId) => {
    console.log("clearing requested cart....");

    return new Promise(async (resolve, reject) => {
      try {
        const cart = await Cart.findOneAndUpdate(
          { _id: cartId },
          { totalPrice: 0, items: [] },
          { new: true }
        );
        resolve(cart);
      } catch (err) {
        reject("Error: Something went wrong, cart was not cleared");
      }
    });
  };

  static deleteCart = (cartId) => {
    console.log("delete requested cart....");

    return new Promise(async (resolve, reject) => {
      try {
        await Cart.findOneAndRemove({ _id: cartId });
        resolve();
      } catch (err) {
        reject("Error: Something went wrong, cart was not removed");
      }
    });
  };

  static deleteCartItem = (itemId, userId) => {
    console.log("remove item(s) to cart....");

    return new Promise(async (resolve, reject) => {
      let cart;
      try {
        if (!itemId.includes("+")) {
          cart = await Cart.deleteItem(itemId, userId);
        } else {
          cart = await Cart.clearCart(userId);
        }
        resolve(cart);
      } catch (err) {
        reject("Error: Something went wrong, item was not removed");
      }
    });
  };

  static getCart = (cartId) => {
    console.log("retreving cart....");

    return new Promise(async (resolve, reject) => {
      const cart = await Cart.findById(cartId);
      if (cart) {
        resolve(cart);
      } else {
        reject("Error: No cart was found");
      }
    });
  };

  static getCheckout = (cartId) => {
    return new Promise(async (resolve, reject) => {
      await Cart.findById(cartId)
        .populate({
          path: "items.screenId",
          select: "_id movieTitle screenRoom startTime endTime",
          model: "Screen",
        })
        .exec((err, cart) => {
          if (!err) {
            cart.items.forEach((item) => {
              item.screenId.startTime = moment(new Date(item.screenId.startTime)).format(
                "ddd MM/DD hh:mm"
              );
              item.screenId.endTime = moment(new Date(item.screenId.endTime)).format(
                "ddd MM/DD hh:mm"
              );
            });
            console.log(`Found cart: ${cart._id}`);
            resolve(cart);
          } else {
            console.log("Error: No cart found");
            reject(new Error("No cart found"));
          }
        });
    });
  };

  static processCheckout = (cart, formValues) => {
    return new Promise(async (resolve, reject) => {
      const screenData = [];
      const { name, email } = formValues;
      const { movieTitle, screenRoom, startTime } = cart.items[0].screenId;

      const { seats, qty } = formatSeats(cart.items);

      const newTicket = {
        recipientName: name,
        email,
        seats,
        movie: {
          title: movieTitle,
          showTimes: { date: startTime.split(" ")[1], time: startTime.split(" ")[2] },
          screenRoom,
        },
        qty,
        totalPrice: cart.totalPrice,
      };

      cart.items.forEach((item) => {
        screenData.push({ id: item.screenId._id, seating: item.itemId });
      });

      screenData.forEach(async (data) => {
        await Screen.reserveSeats(data.id, data.seating);
      });

      try {
        await this.deleteCart(cart._id);
        await EmailService.sendConfirmationMail(email, newTicket);
        resolve(true);
      } catch (err) {
        reject(new Error("Issue with processing transaction"));
      }
    });
  };
}
