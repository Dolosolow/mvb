import fs  from 'fs';
import path  from 'path';
import moment  from 'moment';
import mongoose from 'mongoose';
import { dateFormat } from '@src/utils/lib/time';
// -------------------------------
// movie screen room seating chart. By default all new screening start with an empty theater(screen).
const seatingData = path.join(path.dirname('src/data'), 'data/seat-chart.json');
// -------------------------------
// determines the start time for the next movie playing. With consideration of the current schedule
// for that day. Each movie receives an extra 15 in minutes added for 'cleaning' to it's endtime.
function setStartTime(schedule) {
  const lastMoviePlaying = schedule[schedule.length - 1];
  const cleanRoomInMin = 15;
  return moment(lastMoviePlaying.endTime, dateFormat).add(cleanRoomInMin, 'm');
}
// -------------------------------
// makes a search to the db screen collection for the requested room. Once found the dates
// for that room get filtered by the date requested and return the list/schedule for that date.
async function getDaySchedule(room, date) {
  const screens = await mongoose.model('Screen').find({ screenRoom: room });

  const daySchedule = screens.filter(screen => { 
    let currentScreen = moment(screen.startTime, dateFormat).format('MM DD YYYY');
    const requestedScreen = moment(date.toString(), dateFormat).format('MM DD YYYY');
    
    return currentScreen === requestedScreen;
  });

  return daySchedule;
}
// -------------------------------
// Randomizes a screen room to play in + a random day. After recieving the random schedule day 
// from getDaySchedule ^ next looks to set a start time. If there is no movie playing it 
// recieves noon(12) as the start time. Otherwise it makes a call to setStartTime ^.
async function getMovieScreenTimes(runtime) {
  let screenRoom = Math.floor(Math.random() * 3) + 1;
  let randomDay = Math.floor(Math.random() * 5) + 1;

  const scheduledDate = moment().add(randomDay, 'd');

  let startTime = moment(scheduledDate, dateFormat).hour(2).minute(0).second(0);

  const daySchedule = await getDaySchedule(screenRoom, scheduledDate);
  if(daySchedule.length > 0) {
    startTime = setStartTime(daySchedule);
  }

  const endTime = moment(startTime, dateFormat).add(runtime, 'm');

  return { screenRoom, startTime, endTime };
}

const screenSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  screenRoom: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  seating_chart: [{ 
    _id: false,
    row_id: { type: String, required: true }, 
    seats: [{ 
      id: { type: String, required: true }, 
      type: { type: String, required: true }, 
      reserved: { type: Boolean, default: false } 
    }] 
  }],
  date_created: {
    type: String,
    default: moment().format(dateFormat),
    required: true
  }
});

screenSchema.methods.addMovie = async function(runtime) {
  const movieStartTimes = await getMovieScreenTimes(runtime);

  this.screenRoom = movieStartTimes.screenRoom;
  this.startTime = movieStartTimes.startTime;
  this.endTime = movieStartTimes.endTime;
  this.seating_chart = JSON.parse(fs.readFileSync(seatingData));

  return {
    id: this._id,
    date: moment(this.startTime, dateFormat).format('ddd MMM Do YYYY'),
    numerical_isodate: moment(this.startTime, dateFormat).format('YYYYMMDD'),
    startTime: moment(this.startTime, dateFormat).format('hh:mm')
  }
}

export default mongoose.model('Screen', screenSchema);