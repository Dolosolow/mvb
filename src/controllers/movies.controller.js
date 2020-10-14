import Movie from '@src/models/movie';
import Screen from '@src/models/screen';
import { sortScreenTime } from '@src/utils/lib/time';

export const getAdminDash = (req, res, next) => { 
  res.render('admin-dash', { transNav: false, path: "/admin" });
}

export const getMovies = async (req, res, next) => {
  const movies = await Movie.getAllMovies();
  res.render('index', { transNav: true, path: '/', currentMovies: movies, user: req.user ? req.user.id : null });
}

export const getMovieById = async (req, res, next) => {
  const movieId = req.params.id;
  let screen;

  let foundMovie = await Movie.getById(movieId);
  foundMovie.screens = sortScreenTime(foundMovie.screens);

  screen = await Screen.getScreenById(foundMovie.screens[0].times[0].id);

  res.render('seat-booking', { transNav: true, path: '/', movie: foundMovie, screen, user: req.user ? req.user.id : null  });
}