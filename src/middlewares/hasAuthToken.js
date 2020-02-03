/**
|--------------------------------------------------
| Middleware checks if in the req-url includes "token" in it's context. 
| If found, it extracts the token from the url and runs a search on the db.
| Then checks if it contains "reset" in the url, if so, apply the token to res.locals.
| Redirects to main page if there is any condition is not met and removes the token from any user with
| the token under evaluation, otherwise continues(next).
|--------------------------------------------------
*/
import AuthToken from '@src/models/authToken';
import User from '@src/models/user';

export default async (req, res, next) => {
  res.locals.resetToken = '';

  if (req.originalUrl.includes('token')) {
    const token = req.originalUrl.split('=')[1];

    try {
      const rsttoken = await AuthToken.findOne({ token });

      if (req.originalUrl.includes('reset')) res.locals.resetToken = rsttoken.token;

    } catch (err) {
      console.log('Error: Token not found, reset token time exceeded');

      const user = await User.findOne({ authToken: token });
      if (user) {
        user.authToken = undefined;
        await user.save();
      }

      return res.redirect('/');
    }
  }

  next();
}