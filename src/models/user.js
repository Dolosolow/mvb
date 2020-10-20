import moment from 'moment';
import mongoose from 'mongoose';
import { dateFormat } from '@src/utils/lib/time';

export const accountTypes = {
  GUEST: 'guest',
  SILVER: 'silver',
  GOLD: 'gold'
};

const userSchema = new mongoose.Schema({
  acct_type: { type: String, required: true },
  email: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  referralCode: { type: String },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  mailSubscription: { type: Boolean, default: false, required: true },
  date_created: {
    type: String,
    default: moment().format(dateFormat),
    required: true
  },
  date_updated: {
    type: String,
    default: moment().format(dateFormat),
    required: true
  }
});

export default mongoose.model('User', userSchema);


// export default class User {
//   constructor(
//     id,
//     type,
//     email,
//     fName, 
//     lName, 
//     phoneNumber, 
//     dob, 
//     gender, 
//     referralCode, 
//     streetAddress,
//     city,
//     state,
//     zipcode,
//     mailSubscription
//     ) {
//     this.id = id || uuidv4();
//     this.type = type;
//     this.email = email;
//     this.fName = fName;
//     this.lName = lName;
//     this.phoneNumber = phoneNumber;
//     this.dob = dob;
//     this.gender = gender;
//     this.referralCode = referralCode;
//     this.streetAddress = streetAddress;
//     this.city = city;
//     this.state = state;
//     this.zipcode = zipcode;
//     this.mailSubscription = mailSubscription;
//   }

//   async save() {
//     this.dateCreated = moment().toString();
//     if(this.type !== accountTypes.GUEST) {
//       const db = getDatabase();
//       this.verified = false; 
//       await db.collection('users').insertOne(this);
//     }
//   }

//   static async findById(id) {
//     const db = getDatabase();
//     const user = await db.collection('users').findOne({ id });
//     return user;
//   }
// }