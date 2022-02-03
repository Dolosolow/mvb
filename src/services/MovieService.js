import Movie from "@src/models/movie";
import Screen from "@src/models/screen";
import { sortScreenTime } from "@src/utils/lib/time";
// ------------------
// Changes url for the movie poster image coming from the api.
// Purpose is to make a request for a smaller img and maintain same size
// for all movie request made.
function customImgResize(url, size) {
  const newUrl = url.split("_");
  newUrl[2] = `SX${size}.jpg`;
  return newUrl.join("_");
}

export default class MovieService {
  static addNewMovie = async (movieData) => {
    const { Title, Rated, Runtime, Genre, Actors, Plot, Poster } = movieData;

    const foundMovie = await Movie.findOne({ title: Title });

    if (foundMovie) {
      const newScreen = new Screen({ movieId: foundMovie.id, movieTitle: foundMovie.title });
      const screen = await newScreen.addMovie(foundMovie.runtime.split(" ")[0]);
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
        poster_xl: customImgResize(Poster, 1500),
      });

      await newMovie.save();
    }

    return Title;
  };

  static getAllMovies = async () => {
    const movies = await Movie.find();

    if (movies.length > 0) {
      return movies;
    } else {
      return [];
    }
  };

  static getAllShowtimes = async () => {
    const allShowtimes = await Screen.find();
    return allShowtimes;
  };

  static getShowtimeById = async (id) => {
    const foundShowtime = await Screen.findById(id);
    return foundShowtime;
  };

  static getShowtimes = async (movieId, date) => {
    const movie = await Movie.findById(movieId);
    movie.screens = sortScreenTime(movie.screens);

    if (date !== undefined) {
      let screenDateRequested = movie.screens.find((screen) => screen.numerical_isodate === date);
      return screenDateRequested;
    }

    throw new Error(
      "Sorry for the inconvience, an issue has occured on our end. We are working on a solution."
    );
  };

  static getTheaterSeat = async (movieId) => {
    const foundMovie = await Movie.findById(movieId);
    foundMovie.screens = sortScreenTime(foundMovie.screens);
    const movieScreen = await Screen.findById(foundMovie.screens[0].times[0].screenId);

    return { movie: foundMovie, screen: movieScreen };
  };
}
