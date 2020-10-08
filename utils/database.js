require('dotenv').config({path: '../.env.local'});
const { MongoClient } = require('mongodb');
let db;

const connect = async (cb) => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@flix.qnebs.mongodb.net/flix?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
      );
    console.log('<< connected >>');
    db = client.db();
    cb();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getDatabase = () => {
  if(db) {
    return db;
  }
  throw 'No database found';
}

exports.connect = connect;
exports.getDatabase = getDatabase;