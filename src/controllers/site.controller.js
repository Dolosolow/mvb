import Cart from "@src/models/cart";
import Movie from "@src/models/movie";
import Screen from "@src/models/screen";
import AuthToken from "@src/models/authToken";

import { sortScreenTime } from "@src/utils/lib/time";
import CartService from "@src/services/CartService";

import context from "@src/lang/en.json";

export const getIndex = async (req, res, next) => {
  const movies = await Movie.find();
  res.render("index", { transNav: true, path: "/", currentMovies: movies });
};

export const getAdminDash = (req, res, next) => {
  res.render("admin-dash", { transNav: false, path: "/admin" });
};

export const getDining = (req, res, next) => {
  res.render("wine-dine", { transNav: false, path: "/dining" });
};

export const getEvents = (req, res, next) => {
  res.render("events", { transNav: false, path: "/events" });
};

export const getMemberships = (req, res, next) => {
  res.render("membership", { transNav: true, path: "/membership" });
};

export const getLocations = (req, res, next) => {
  res.render("locations", { transNav: false, path: "/location" });
};

export const getGoldSignup = (req, res, next) => {
  res.render("signup-gold", { transNav: false, path: "/membership", user: req.session.user });
};

export const getSilverSignup = (req, res, next) => {
  res.render("signup-silver", { transNav: false, path: "/membership", user: req.session.user });
};

export const getMovieSeats = async (req, res, next) => {
  const movieId = req.params.id;

  const foundMovie = await Movie.findById(movieId);
  foundMovie.screens = sortScreenTime(foundMovie.screens);

  const screen = await Screen.findById(foundMovie.screens[0].times[0].screenId);

  res.render("seat-booking", { transNav: true, path: "/", movie: foundMovie, screen });
};

export const getCheckout = async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.session.user._id });
  const fullCart = await CartService.getCheckout(cart._id);

  if (fullCart) {
    return res.render("checkout", {
      transNav: false,
      path: "/",
      cart: fullCart,
    });
  }

  res.redirect("/");
};

// -------------------
// get reset account password page response
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

export const postCheckout = async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.session.user._id });
  const fullCart = await CartService.getCheckout(cart._id);

  const processed = await CartService.processCheckout(fullCart, req.body.data);

  res.status(200).json({ msg: context.email.sendTicketMail.success, status: processed });
};
