const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname('data'), 'data/movies.json');
const { v4: uuidv4 } = require('uuid');

const getContentsFromFile = cb => {
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
    this.id = uuidv4();
    getContentsFromFile(movies => {
      movies.push(this);
      fs.writeFile(filePath, JSON.stringify(movies, null, 2), err => {
        console.log(err);
      })
    })
  }

  static fetchAllMovies(cb) {
    getContentsFromFile(cb);
  }

  static getById(id, cb) {
    getContentsFromFile(movies => {
      const foundMovie = movies.find(mov => mov.id === id);
      cb(foundMovie);
    })
  }
}
