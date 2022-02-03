import Cart from '@src/models/cart';
import Movie from '@src/models/movie';
import Screen from '@src/models/screen';
import moment from 'moment';
import { sortScreenTime } from '@src/utils/lib/time';

export const getAdminDash = (req, res, next) => { 
  res.render('admin-dash', { transNav: false, path: "/admin" });
};

export const getDining = (req, res, next) => {
  res.render('wine-dine', { transNav: false, path: '/dining' });
};

export const getEvents = (req, res, next) => {
  res.render('events', { transNav: false, path: '/events' });
};

export const getMemberships = (req, res, next) => {
  res.render('membership', { transNav: true, path: '/membership' });
};

export const getLocations = (req, res, next) => {
  res.render('locations', { transNav: false, path: '/location' });
};

export const getIndex = async (req, res, next) => {
  const movies = await Movie.find();
  res.render('index', { transNav: true, path: '/', currentMovies: movies });
};

export const getMovieSeats = async (req, res, next) => {
  const movieId = req.params.id;

  const foundMovie = await Movie.findById(movieId);
  foundMovie.screens = sortScreenTime(foundMovie.screens);

  const screen = await Screen.findById(foundMovie.screens[0].times[0].screenId);

  res.render('seat-booking', { transNav: true, path: '/', movie: foundMovie, screen });
};

export const getCheckout = async (req, res, next) => {
  await Cart
    .findOne({ userId: req.session.user._id })
    .populate({ 
      path: 'items.screenId', 
      select: '-_id movieTitle screenRoom startTime endTime', 
      model: 'Screen' 
    })
    .exec((err, cart) => {
      if(!err) {
        cart.items.forEach(item => {
          item.screenId.startTime = moment(new Date(item.screenId.startTime)).format('ddd MM/DD hh:mm');
          item.screenId.endTime = moment(new Date(item.screenId.endTime)).format('ddd MM/DD hh:mm');
        });

        res.render('checkout', { 
          transNav: false, path: '/', 
          cart: cart
        });
      } else {
        res.redirect('/');
      }
    });
};
