import bcrypt from 'bcryptjs';
import moment from 'moment';
import mongoose from 'mongoose';
import { dateFormat } from '@src/utils/lib/time';

export const accountTypes = {
  GUEST: 'guest',
  SILVER: 'silver',
  GOLD: 'gold'
};

const userSchema = new mongoose.Schema({
  type: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: String },
  gender: { type: String },
  email: { type: String, required: true },
  referralCode: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  verified: { type: Boolean, default: false },
  eSubscription: { type: Boolean, default: false },
  date_created: {
    type: String,
    default: moment().format(dateFormat),
  },
  date_updated: {
    type: String,
    default: moment().format(dateFormat),
  }
});

userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next();

  bcrypt.hash(this.password, 12, async (err, hash) => {
    if(err) return next(err);
    this.password = await hash;
    next();
  });
});

userSchema.methods.comparePasswords = function(testPassword) {
  return bcrypt.compareSync(testPassword, this.password);
}

export default mongoose.model('User', userSchema);