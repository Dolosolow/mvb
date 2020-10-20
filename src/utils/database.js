import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

export const connect = async (cb) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('<< connected >>');
    cb();
  } catch (err) {
    console.log(err);
    throw err;
  }
}