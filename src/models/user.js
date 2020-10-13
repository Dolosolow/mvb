const getDb = require('../utils/database').getDatabase;
const { v4: uuidv4 } = require('uuid'); 
const moment = require('moment');

const accountTypes = {
  GUEST: 'guest',
  SILVER: 'silver',
  GOLD: 'gold'
};

class User {
  constructor(
    id,
    type,
    email,
    fName, 
    lName, 
    phoneNumber, 
    dob, 
    gender, 
    referralCode, 
    streetAddress,
    city,
    state,
    zipcode,
    mailSubscription
    ) {
    this.id = id || uuidv4();
    this.type = type;
    this.email = email;
    this.fName = fName;
    this.lName = lName;
    this.phoneNumber = phoneNumber;
    this.dob = dob;
    this.gender = gender;
    this.referralCode = referralCode;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.mailSubscription = mailSubscription;
  }

  async save() {
    const db = getDb();
    this.dateCreated = moment().toString();
    if(this.type !== accountTypes.GUEST) {
      this.verified = false; 
      await db.collection('users').insertOne(this);
    }
  }

  static async findById(id) {
    const db = getDb();
    const user = await db.collection('users').findOne({ id });
    return user;
  }
}

module.exports = User;