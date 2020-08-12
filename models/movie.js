const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const movieData = path.join(path.dirname('data'), 'data/movies.json');
const seatingData = path.join(path.dirname('data'), 'data/seat-chart.json');

const getContentsFromFile = (filePath, cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if(err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Movie {
  constructor(
    title,
    rated,
    runtime,
    genre,
    actors,
    plot,
    poster,
    poster_xl
  ) {
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
    this.id = uuidv4();
    this.theater = Math.floor(Math.random() * Math.floor(10)) + 1;
    this.seating_chart = JSON.parse(fs.readFileSync(seatingData));
    getContentsFromFile(movieData, movies => {
      movies.push(this);
      fs.writeFile(movieData, JSON.stringify(movies, null, 2), err => console.log(err));
    })
  }

  static fetchAllMovies(cb) {
    getContentsFromFile(movieData, cb);
  }

  static getById(id, cb) {
    getContentsFromFile(movieData, movies => {
      let movie = movies.find(mov => mov.id === id);
      cb(movie);
    })
  }

  static updateSeat(movieId, seat, reserve) {
    getContentsFromFile(movieData, movies => {
      const movieIdx = movies.findIndex(mov => mov.id === movieId);
      const movie = movies[movieIdx];
      let rowIdx = movie.seating_chart.findIndex(row => row.row_id.toUpperCase() === seat.split('')[0]);
      const row = movie.seating_chart[rowIdx];
      let updatedRow;

      if(row) {
        updatedRow = { ...row };
        let seatIdx = updatedRow.seats.findIndex(currentSeat => currentSeat.id === seat.toLowerCase());
        updatedRow.seats[seatIdx].reserved = reserve;
        movie.seating_chart[rowIdx] = updatedRow;
        movies[movieIdx] = movie;

        fs.writeFile(movieData, JSON.stringify(movies, null, 2), err => console.log(err));
      }
    })
  }
}
