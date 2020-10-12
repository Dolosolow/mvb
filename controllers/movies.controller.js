const Movie = require('../models/movie');
const Screen = require('../models/screen');
const time = require('../utils/lib/time');

exports.getAdminDash = (req, res, next) => { 
  res.render('admin-dash', { transNav: false, path: "/admin" });
}

exports.getMovies = async (req, res, next) => {
  const movies = await Movie.getAllMovies();
  res.render('index', { transNav: true, path: '/', currentMovies: movies, user: req.user ? req.user.id : null });
}

exports.getMovieById = async (req, res, next) => {
  const movieId = req.params.id;
  let screen;

  let foundMovie = await Movie.getById(movieId);
  foundMovie.screens = time.sortScreenTime(foundMovie.screens);

  screen = await Screen.getScreenById(foundMovie.screens[0].times[0].id);

  res.render('seat-booking', { transNav: true, path: '/', movie: foundMovie, screen, user: req.user ? req.user.id : null  });
}