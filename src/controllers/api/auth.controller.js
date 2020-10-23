import User from '@src/models/user';
import mongoose from 'mongoose';

export const postLogin = async (req, res, next) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId('5f7c56881471d5c4fc625539') });
  if(user === null) {
    res.status(401).json({ msg: 'login failed' }).redirect('/');
  } else {
    req.session.user = user;
    res.status(200).json({ msg: 'login successful' });
  }
} 

export const postlogout = (req, res, next) => {
  delete req.session.user;
  req.flash('success', 'You are now logged out. Thanks for using FLIX.');
  res.status(200).json({ msg: 'logout successful' });
}