import axios from 'axios';
import Movie from '@src/models/movie';
import Screen from '@src/models/screen';
import { sortScreenTime } from '@src/utils/lib/time';

function customImgResize(url, size) {
  const newUrl = url.split('_');
  newUrl[2] = `SX${size}.jpg`;
  return newUrl.join('_');
}

export const getAllScreens = async (req, res, next) => {
  const allScreens = await Screen.find();
  res.status(200).json({ screens: allScreens });
}

export const getScreenById = async (req, res, next) => {
  const screenId = req.params.id;
  const foundScreen = await Screen.findById(screenId);
  res.status(200).json({ screen: foundScreen });
}

export const getAllMovies = async (req, res, next) => {
  const movies = await Movie.find();
  res.status(200).json({ movies });
}

export const getMovieTimes = async (req, res, next) => {
  const movieId = req.params.id;
  const dateQuery = req.query.date;

  let foundMovie = await Movie.findById(movieId);
  foundMovie.screens = sortScreenTime(foundMovie.screens);

  if(dateQuery !== undefined) {
    let screenDateRequested = foundMovie.screens.find(screen => screen.numerical_isodate === dateQuery);
    return res.status(200).json({ schedule: screenDateRequested });
  }
}

export const postMovie = async (req, res, next) => {
  const movieId = req.body.movieId;
  const movieData = await axios.get(`${process.env.BASE_API_URL}&i=${movieId}`);
  const movieResults = movieData.data;
  const { 
    Title, 
    Rated, 
    Runtime, 
    Genre, 
    Actors, 
    Plot, 
    Poster 
  } = movieResults;

  const foundMovie = await Movie.findOne({ title: Title });
  
  if(foundMovie) {
    const newScreen = new Screen({ movieTitle: foundMovie.title });
    const screen = await newScreen.addMovie(foundMovie.runtime.split(' ')[0]);
    await newScreen.save();
    await foundMovie.updateMovie(screen);
  } else {
    const newMovie = new Movie({
      title: Title,
      rated: Rated,
      runtime: Runtime,
      genre: Genre,
      actors: Actors,
      plot: Plot,
      poster: customImgResize(Poster, 600),
      poster_xl: customImgResize(Poster, 1500)
    });

    await newMovie.save();
  }

  res.status(200).json({ Title });
}