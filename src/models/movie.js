import mongoose from "mongoose";
import moment from "moment";
import Screen from "@src/models/screen";
import { dateFormat } from "@src/utils/lib/time";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rated: { type: String, required: true },
    runtime: { type: String, required: true },
    genre: { type: String, required: true },
    rated: { type: String, required: true },
    actors: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: true },
    poster_xl: { type: String, required: true },
    screens: [
      {
        date: { type: String, required: true },
        numerical_isodate: { type: String, required: true },
        times: [
          {
            _id: false,
            screenId: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
            time: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

movieSchema.pre("save", async function (next) {
  const newScreen = new Screen({ movieId: this._id, movieTitle: this.title });
  const screen = await newScreen.addMovie(this.runtime.split(" ")[0]);

  this.screens.push({
    date: screen.date,
    numerical_isodate: screen.numerical_isodate,
    times: new Array({ screenId: screen.id, time: screen.startTime }),
  });

  await newScreen.save();
  next();
});

movieSchema.methods.updateMovie = async function (newScreen) {
  const currentDate = moment();
  const dateIdx = this.screens.findIndex((screen) => screen.date === newScreen.date);

  if (dateIdx !== -1) {
    this.screens[dateIdx].times = [
      ...this.screens[dateIdx].times,
      { screenId: newScreen.id, time: newScreen.startTime },
    ];
  } else {
    this.screens.push({
      date: newScreen.date,
      numerical_isodate: newScreen.numerical_isodate,
      times: new Array({ screenId: newScreen.id, time: newScreen.startTime }),
    });
  }

  this.screens.sort((a, b) => {
    return (
      moment(a.date, dateFormat).diff(currentDate) - moment(b.date, dateFormat).diff(currentDate)
    );
  });

  await this.save();
};

export default mongoose.model("Movie", movieSchema);
