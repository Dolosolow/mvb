const getDb = require('../utils/database').getDatabase;
const { v4: uuidv4 } = require('uuid');
const Screen = require('./screen');
const moment = require('moment');

async function isAlreadyCreated(title) {
  const db = getDb();
  const movie = await db.collection('movies').findOne({ title });

  if(movie) {
    return movie;
  } else {
    return false;
  }
}

async function updateMovie(movie, newScreen) {
  const db = getDb();
  const currentDate = moment();
  const dateFormat = Screen.getDateFormat();
  const dateIndex = movie.screens.findIndex(screen => screen.date === newScreen.date);

  console.log(`index: ${dateIndex}`)

  if(dateIndex !== -1) {
    movie.screens[dateIndex].times = [...movie.screens[dateIndex].times, { id: newScreen.id, time: newScreen.startTime }];
  } else {
    movie.screens.push({ date: newScreen.date, numerical_isodate: newScreen.numerical_isodate, times: new Array({ id: newScreen.id, time: newScreen.startTime }) });
  }

  movie.screens.sort((a, b) => {
    return moment(a.date, dateFormat).diff(currentDate) - moment(b.date, dateFormat).diff(currentDate)
  })

  await db.collection('movies').updateOne({ id: movie.id }, { $set: { screens: movie.screens } });
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
    this.screens = []
  }

  async save() {
    const db = getDb();
    const screen = new Screen();
    
    let movie = await isAlreadyCreated(this.title);

    this.id = movie ? movie.id : uuidv4();

    let newScreen = {};
    newScreen = await screen.addMovie(this.id, this.runtime.split(' ')[0]);

    if(movie) {
      updateMovie(movie, newScreen);
    } else {
      this.screens.push({ date: newScreen.date, numerical_isodate: newScreen.numerical_isodate, times: new Array({ id: newScreen.id, time: newScreen.startTime }) });
      await db.collection('movies').insertOne(this);
    }
  }

  static async getAllMovies() {
    const db = getDb();
    const movies = await db.collection('movies').find().toArray();
    return movies;
  }

  static async getById(id) {
    const db = getDb();
    const foundMovie = await db.collection('movies').findOne({ id });
    return foundMovie;
  }

  static updateSeat(movieId, seat, reserve) {
  }
}