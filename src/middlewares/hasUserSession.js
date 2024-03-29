/**
|--------------------------------------------------
| This middleware purpose is to globally set a vistor a guest
| temp account while browsing. As well as setting the csrfToken. 
| Should be kept before any route is registered to the express app. 
|--------------------------------------------------
*/
import mongoose from "mongoose";
import Cart from "@src/models/cart";

export default async (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  let tempUserId;
  // -------------
  // req.session.user: Sets a initial account with type 'guest' to users when visit site.
  // changes to the session.account are done if user login/signup.
  //
  // Additionally, for the case where a user might login at checkout or after a cart has been created
  // the userId accompanied with the cart will be changed for the user's account id.
  if (!req.session.user) {
    tempUserId = mongoose.Types.ObjectId();
    req.session.guestId = tempUserId;
    req.session.user = { _id: tempUserId, type: "guest" };
  }

  if (req.session.user.type !== "guest") {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.session.guestId },
      { userId: req.session.user._id },
      { new: true }
    );

    if (cart) {
      delete req.session.guestId;
      console.log("cart found and updated to signed-in user");
    } else {
      console.log("no cart found");
    }
  }

  res.locals.user = req.session.user;
  next();
};
