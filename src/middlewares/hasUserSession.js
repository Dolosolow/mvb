/**
|--------------------------------------------------
| This middleware purpose is to globally set a vistor a guest
| temp account while browsing. As well as setting the csrfToken. 
| Should be kept before any route is registered to the express app. 
|--------------------------------------------------
*/
import mongoose from 'mongoose';

export default async (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  // -------------
  // req.session.user: Sets a initial account with type 'guest' to users when visit site.
  // changes to the session.account are done if user login/signup.
  // 
  // Additionally, for the case where a user might login at checkout or after a cart has been created
  // the userId accompanied with the cart will be changed for the user's account id.
  if (!req.session.user) {
    req.session.user = { _id: mongoose.Types.ObjectId(), type: 'guest' };
  }
  if (req.session.cart && req.session.cart.userId !== req.session.user._id) {
    req.session.cart.userId = req.session.user._id;
  }
  res.locals.user = req.session.user;

  next();
}