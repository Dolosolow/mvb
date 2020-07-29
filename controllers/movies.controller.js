const Movie = require('../models/movie');
const apiCall = require('../utils/api');
const { v4: uuidv4 } = require('uuid');

function customImgResize(url, size) {
  const newUrl = url.split('_');
  newUrl[2] = `SX${size}.jpg`;
  return newUrl.join('_');
}

exports.getAdminDash = (req, res, next) => { 
  res.render('admin-dash', { transNav: false, path: "/admin" });
}

// ALTER THIS LATER, ADMIN NOT RELATING TO MOVIES ^^^^

exports.getCurrentMovies = (req, res, next) => {
  const currentMovies = Movie.fetchAllMovies();
  res.render('index', { transNav: true, path: '/', currentMovies });
}

exports.getCurrentMoviesData = (req, res, next) => {
  const currentMovies = Movie.fetchAllMovies();
  res.status(200).json({ currentMovies });
}

exports.getMovieDetails = (req, res, next) => {
  const movieId = req.params.id;
  const currentMovies = Movie.fetchAllMovies();
  const foundMovie = currentMovies.find(mov => mov.id == movieId);
  
  res.render('seat-booking', { transNav: true, path: '/', movie: foundMovie })
}

exports.postAddMovie = async (req, res, next) => {
  const movieId = req.body.movieId;
  const foundMovie = await apiCall.getMovieById(movieId);

  const { 
    Title, 
    Rated, 
    Runtime, 
    Genre, 
    Actors, 
    Plot, 
    Poster 
  } = foundMovie;

  const randomTheaterRoom = Math.floor(Math.random() * Math.floor(10)) + 1;

  const newMovie = new Movie(
    uuidv4(),
    randomTheaterRoom,
    Title,
    Rated,
    Runtime,
    Genre,
    Actors,
    Plot,
    customImgResize(Poster, 600),
    customImgResize(Poster, 1500)
  );
  newMovie.save();
  res.status(200).json({ Title });
}