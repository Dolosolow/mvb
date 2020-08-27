const Movie = require('../../models/movie');
const axios = require('axios');
const apiKey = process.env.APIKEY;

function customImgResize(url, size) {
  const newUrl = url.split('_');
  newUrl[2] = `SX${size}.jpg`;
  return newUrl.join('_');
}

exports.getMovieTimes = async (req, res, next) => {
  const moment = require('moment');
  const movieId = req.params.id;
  const dateQuery = req.query.date;

  let foundMovie = await Movie.getById(movieId);
  // ********************
  // refactor this into a function and add it to utils folder. Other implemintation located in regualr movies.controller
  foundMovie.screens = foundMovie.screens.map(screen => {
    screen.times.sort((a, b) => {
      return moment(a.time, 'hh:mm').hour() - moment(b.time, 'hh:mm').hour()
    });

    const hasVariation = screen.times.findIndex(startTime => startTime.time !== '12:00' );

    if(hasVariation !== -1) {
      while(screen.times[screen.times.length - 1].time === '12:00') {
        screen.times.unshift(screen.times.pop());
      }
    }

    return screen;
  })
  // ********************

  if(dateQuery !== undefined) {
    const screenDateRequested = foundMovie.screens.find(screen => screen.numerical_isodate === dateQuery);
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