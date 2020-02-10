import User from "@src/models/user";
import UserService from "@src/services/UserService";

import context from "@src/lang/en.json";

// -------------------
// login post
export const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    return res.status(400).send({ msg: "Email and/or password invalid." });
  } else {
    const isMatch = await user.comparePasswords(password);
    if (!isMatch) return res.status(400).send({ msg: "Email and/or password invalid." });

    req.session.user = user;
    return res.redirect("/events");
  }
};
// -------------------
// logout post
export const postlogout = (req, res, next) => {
  delete req.session.user;
  // req.flash('success', 'You are now logged out. Thanks for using FLIX.');
  res.status(200).json({ msg: "You are now logged out. We hope to see you again soon." });
};
// -------------------
// get reset password
export const getResetPwd = async (req, res, next) => {
  const qryToken = req.query.token;
  const movies = await Movie.find();

  try {
    const userEmail = await AuthToken.getUserEmailByToken(qryToken);
    return res.render("index", {
      transNav: true,
      path: "/",
      currentMovies: movies,
      userEmail: userEmail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: context.email.resetPwdMail.fail });
  }
};
// -------------------
// verify email
export const postVerifyEmail = async (req, res, next) => {
  try {
    const user = await UserService.verifyEmailAccount(req.body.token);
    if (user) {
      return res.status(200).send({ status: true, msg: context.account.success.signup_verified });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
// -------------------
// post reset password
export const postResetPwd = async (req, res, next) => {
  try {
    await UserService.resetAccountPwd(req.body.email);
  } catch (err) {
    console.log(err);
  }

  return res.status(200).send({
    status: true,
    msg: context.email.resetPwdMail.success,
  });
};
// -------------------
// post new password
export const postNewPwd = async (req, res, next) => {
  try {
    const user = await UserService.updateAccountPwd(req.body);
    if (user) {
      return res.status(200).send({ status: true, msg: "Password was successfully changed." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, error: "Password was not changed." });
  }
};
// -------------------
// silver signup post
export const postSilverSignup = async (req, res, next) => {
  const { email } = req.body.data;

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(401).json({ msg: "Email already exists." }).redirect("/membership/silver");
  } else {
    const newUser = new User({ ...req.body.data, type: "silver", verified: false });
    await newUser.save();
  }
};
// -------------------
// gold signup post
export const postGoldSignup = async (req, res, next) => {
  const { email } = req.body.data;

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(401).json({ msg: "Email already exists." }).redirect("/membership/gold");
  } else {
    const newUser = new User({ ...req.body.data, type: "gold", verified: false });
    await newUser.save();
  }
};
