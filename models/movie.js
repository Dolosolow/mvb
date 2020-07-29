const currentMovies = [];

module.exports = class Movie {
  constructor(
    id,
    theater,
    title,
    rated,
    runtime,
    genre,
    actors,
    plot,
    poster,
    poster_xl
  ) {
    this.id = id;
    this.theater = theater;
    this.title = title;
    this.rated = rated;
    this.runtime = runtime;
    this.genre = genre;
    this.actors = actors;
    this.plot = plot;
    this.poster = poster;
    this.poster_xl = poster_xl;
  }

  save() {
    currentMovies.push(this);
  }

  static fetchAllMovies() {
    console.log(currentMovies)
    return currentMovies;
  }
}