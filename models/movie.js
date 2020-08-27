const { v4: uuidv4 } = require('uuid');
const Screen = require('./screen');
const moment = require('moment');

const isAlreadyCreated = async title => {
  const db = require('../utils/database').getDatabase();
  const movie = await db.collection('movies').findOne({ title });

  if(movie) {
    return movie;
  } else {
    return false;
  }
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
    const db = require('../utils/database').getDatabase();
    
    try {
      const screen = new Screen();
      let currentDate = moment();
      const dateFormat = Screen.getDateFormat();
      let movie = await isAlreadyCreated(this.title);

      this.id = movie ? movie.id : uuidv4();

      let newScreen = {};
      await screen.addMovie(this.id, this.runtime.split(' ')[0], nScreen => {
        newScreen = nScreen;
      });

      if(movie) {
        const dateIndex = movie.screens.findIndex(screen => screen.date === newScreen.date);

        if(dateIndex !== -1) {
          movie.screens[dateIndex].times = [...movie.screens[dateIndex].times, { id: newScreen.id, time: newScreen.startTime }];
        } else {
          movie.screens.push({ date: newScreen.date, numerical_isodate: newScreen.numerical_isodate, times: new Array({ id: newScreen.id, time: newScreen.startTime }) });
        }

        movie.screens.sort((a, b) => {
          return moment(a.date, dateFormat).diff(currentDate) - moment(b.date, dateFormat).diff(currentDate)
        })

        await db.collection('movies').updateOne({ title: this.title }, { $set: { screens: movie.screens } });
      } else {
        this.screens.push({ date: newScreen.date, numerical_isodate: newScreen.numerical_isodate, times: new Array({ id: newScreen.id, time: newScreen.startTime }) });
        await db.collection('movies').insertOne(this);
      }

      console.log(this);
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchAllMovies(cb) {
    const db = require('../utils/database').getDatabase();
    
    try {
      const cursor = db.collection('movies').find({});
      const movies = await cursor.toArray();
      cb(movies);
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(id) {
    const db = require('../utils/database').getDatabase();

    try {
      const foundMovie = await db.collection('movies').findOne({ id });
      return foundMovie;
    } catch (err) {
      console.log('err');
    }
  }

  static updateSeat(movieId, seat, reserve) {
  }
}