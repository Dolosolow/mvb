const Movie = require('../models/movie');
const Screen = require('../models/screen');
const moment = require('moment');

exports.getAdminDash = (req, res, next) => { 
  res.render('admin-dash', { transNav: false, path: "/admin" });
}

exports.getMovies = async (req, res, next) => {
  await Movie.fetchAllMovies(currentMovies => {
    res.render('index', { transNav: true, path: '/', currentMovies });
  });
}

exports.getMovieById = async (req, res, next) => {
  const movieId = req.params.id;
  let screen;

  let foundMovie = await Movie.getById(movieId);
  // ********************
  // refactor this into a function and add it to utils folder. Other implemintation located in api movies.controller
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

  screen = await Screen.getScreenById(foundMovie.screens[0].times[0].id);

  res.render('seat-booking', { transNav: true, path: '/', movie: foundMovie, screen  });
}