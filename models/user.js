const getDb = require('../utils/database').getDatabase;
const { v4: uuidv4 } = require('uuid'); 

class User {
  constructor(
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
    this.id = uuidv4();
    this.verified = false; 
    await db.collection('users').insertOne(this);
  }

  static async findById(id) {
    const db = getDb();
    const user = await db.collection('users').findOne({ id });
    return user;
  }
}

module.exports = User;