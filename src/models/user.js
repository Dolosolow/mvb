import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import AuthToken from '@src/models/authToken';

export const accountTypes = {
  GUEST: 'guest',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM : 'platinum',
  PLATNIUM_ELITE: 'platinum elite'
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
  referralCode: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  verified: { type: Boolean, default: false },
  eSubscription: { type: Boolean, default: false },
  authToken: { type: String }
}, {timestamps: true});

userSchema.methods.applyAuthToken = async function(token) {
  const authToken = new AuthToken({ token, user: this });
  this.authToken = authToken.token;
  await authToken.save();
}

userSchema.methods.comparePasswords = function(testPassword) {
  return bcrypt.compareSync(testPassword, this.password);
}

userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next();

  bcrypt.hash(this.password, 12, async (err, hash) => {
    if(err) return next(err);
    this.password = await hash;
    next();
  });
});

export default mongoose.model('User', userSchema);