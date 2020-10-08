const Movie = require('../../models/movie');
const Screen = require('../../models/screen');
const axios = require('axios');
const apiKey = process.env.APIKEY;
const time = require('../../utils/lib/time');

function customImgResize(url, size) {
  const newUrl = url.split('_');
  newUrl[2] = `SX${size}.jpg`;
  return newUrl.join('_');
}

exports.getAllScreens = async (req, res, next) => {
  const allScreens = await Screen.getAllScreens();
  res.status(200).json({ screens: allScreens });
}

exports.getScreenById = async (req, res, next) => {
  const screenId = req.params.id;
  const foundScreen = await Screen.getScreenById(screenId);
  res.status(200).json({ screen: foundScreen });
}

exports.getAllMovies = async (req, res, next) => {
  const movies = await Movie.getAllMovies();
  res.status(200).json({ movies });
}

exports.getMovieTimes = async (req, res, next) => {
  const movieId = req.params.id;
  const dateQuery = req.query.date;

  let foundMovie = await Movie.getById(movieId);
  foundMovie.screens = time.sortScreenTime(foundMovie.screens);

  if(dateQuery !== undefined) {
    let screenDateRequested = foundMovie.screens.find(screen => screen.numerical_isodate === dateQuery);
    return res.status(200).json({ schedule: screenDateRequested });
  }
}

exports.postMovie = async (req, res, next) => {
  const movieId = req.body.movieId;
  const movieData = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
  const foundMovie = movieData.data;

  const { 
    Title, 
    Rated, 
    Runtime, 
    Genre, 
    Actors, 
    Plot, 
    Poster 
  } = foundMovie;

  const newMovie = new Movie(
    Title,
    Rated,
    Runtime,
    Genre,
    Actors,
    Plot,
    customImgResize(Poster, 600),
    customImgResize(Poster, 1500)
  );

  await newMovie.save();
  res.status(200).json({ Title });
}