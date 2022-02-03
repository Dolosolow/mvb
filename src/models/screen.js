import fs from "fs";
import path from "path";
import moment from "moment";
import mongoose from "mongoose";

import { dateFormat } from "@src/utils/lib/time";
import { getMovieScreenTimes } from "@src/utils/lib/screen-scheduler";

// -------------------------------
// movie screen room seating chart. By default all new screening start with an empty theater(screen).
const seatingData = path.join(path.dirname("src/data"), "data/seat-chart.json");

const screenSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true },
    movieTitle: { type: String, required: true },
    screenRoom: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    seating_chart: [
      {
        _id: false,
        row_id: { type: String, required: true },
        seats: [
          {
            id: { type: String, required: true },
            type: { type: String, required: true },
            reserved: { type: Boolean, default: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

screenSchema.methods.addMovie = async function (runtime) {
  const movieStartTimes = await getMovieScreenTimes(runtime);

  this.screenRoom = movieStartTimes.screenRoom;
  this.startTime = movieStartTimes.startTime;
  this.endTime = movieStartTimes.endTime;
  this.seating_chart = JSON.parse(fs.readFileSync(seatingData));

  return {
    id: this._id,
    date: moment(this.startTime, dateFormat).format("ddd MMM Do YYYY"),
    numerical_isodate: moment(this.startTime, dateFormat).format("YYYYMMDD"),
    startTime: moment(this.startTime, dateFormat).format("hh:mm"),
  };
};

screenSchema.statics.reserveSeats = async function (screenId, seats) {
  const seatIds = seats.toLowerCase().split("-");
  const row = seatIds[0].charAt(0);
  const screen = await this.findOne({ _id: screenId });

  const screenSeatsRowIdx = screen.seating_chart.findIndex((screenRow) => screenRow.row_id === row);
  const screenSeatsRow = screen.seating_chart[screenSeatsRowIdx];

  if (screenSeatsRow) {
    seatIds.forEach((requestedSeat) => {
      const seatIdx = screenSeatsRow.seats.findIndex((seat) => seat.id === requestedSeat);
      screenSeatsRow.seats[seatIdx].reserved = true;
    });
  }

  screen.seating_chart[screenSeatsRowIdx] = screenSeatsRow;

  await screen.save();
};

export default mongoose.model("Screen", screenSchema);
