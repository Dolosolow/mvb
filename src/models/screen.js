import fs  from 'fs';
import path  from 'path';
import moment  from 'moment';
import { v4 as uuidv4 }  from 'uuid';
import { getDatabase } from '@src/utils/database';

const seatingData = path.join(path.dirname('data'), 'data/seat-chart.json');
const dateFormat = 'ddd MMM D YYYY hh:mm:ss GMT';

function setStartTime(schedule) {
  const lastMoviePlaying = schedule[schedule.length - 1];
  const cleanRoomInMin = 15;
  return moment(lastMoviePlaying.endTime, dateFormat).add(cleanRoomInMin, 'm');
}

async function getScreensByRoom(room, date) {
  const db = getDatabase();
  const screens = await db.collection('screens').find({ screenRoom: room }).toArray();

  const daySchedule = screens.filter(screen => { 
    let currentScreen = moment(screen.startTime, dateFormat).format('MM DD YYYY');
    let requestedScreen = moment(date.toString(), dateFormat).format('MM DD YYYY');
    
    return currentScreen === requestedScreen;
  });

  return daySchedule;
}

async function getMovieTimes(runtime) {
  let screenRoom = Math.floor(Math.random() * 3) + 1;
  let randomDay = Math.floor(Math.random() * 5) + 1;
  const scheduledDate = moment().add(randomDay, 'd');
  let startTime = moment(scheduledDate, dateFormat).hour(12).minute(0).second(0);

  const daySchedule = await getScreensByRoom(screenRoom, scheduledDate);
  
  if(daySchedule.length > 0) {
    startTime = setStartTime(daySchedule);
  }

  const endTime = moment(startTime, dateFormat).add(runtime, 'm');

  return { screenRoom, startTime, endTime };
}

export default class Screen {
  static getDateFormat() {
    return dateFormat;
  }

  async addMovie(movieId, runtime, cb) {
    const db = getDatabase();
    this.id = uuidv4();

    const movieTimes = await getMovieTimes(runtime);

    this.movieId = movieId;
    this.screenRoom = movieTimes.screenRoom;
    this.startTime = movieTimes.startTime.toString();
    this.endTime = movieTimes.endTime.toString();
    this.seating_chart = JSON.parse(fs.readFileSync(seatingData));

    await db.collection('screens').insertOne(this);
    
    return { 
      id: this.id, 
      date: moment(this.startTime, dateFormat).format('ddd MMM Do YYYY'),
      numerical_isodate: moment(this.startTime,  dateFormat).format('YYYYMMDD'),
      startTime: moment(this.startTime, dateFormat).format('hh:mm') 
    };
  }

  static async getAllScreens() {
    const db = getDatabase();
    const allScreens = await db.collection('screens').find().toArray();
    return allScreens;
  }

  static async getScreenById(id) {
    const db = getDatabase();
    const screen = await db.collection('screens').findOne({ id });

    return screen;
  }

  static async getScreensByDate(date) {
    const db = getDatabase();
    const screen = await db.collection('screens').find({ date });

    console.log(screen)
  }
}