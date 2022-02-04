import User from "@src/models/user";

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
// gold signup get
export const getGoldSignup = (req, res, next) => {
  res.render("signup-gold", { transNav: false, path: "/membership", user: req.session.user });
};
// -------------------
// silver signup get
export const getSilverSignup = (req, res, next) => {
  res.render("signup-silver", { transNav: false, path: "/membership", user: req.session.user });
};
// -------------------
// silver signup post
export const postSilverSignup = async (req, res, next) => {
  const { email } = req.body.data;

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(401).json({ msg: "Email already exists." }).redirect("/membership/silver");
  } else {
    const newUser = new User({ ...req.body.data, verified: false });
    // for now this is ok, but later after silver auth is complete and ready other mem type
    // add functionality for accepting both silver & gold memberships.
    // divide both under given condition i.e. by type.
    await newUser.save();
  }
};
