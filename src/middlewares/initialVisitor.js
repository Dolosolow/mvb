/**
|--------------------------------------------------
| This middleware purpose is to globally set a vistor a guest
| temp account while browsing. As well as setting the csrfToken. 
| Should be kept before any route is registered to the express app. 
|--------------------------------------------------
*/
import mongoose from 'mongoose';

export default (req, res, next) => {
  // -------------
  // req.session.user: Sets a initial account with type 'guest' to users when visit site.
  // changes to the session.account are done if user login/signup.
  if(!req.session.user) {
    req.session.user = { _id: mongoose.Types.ObjectId(), type: 'guest' };
  }
  res.locals.user = req.session.user;
  res.locals.csrfToken = req.csrfToken();
  next();
}