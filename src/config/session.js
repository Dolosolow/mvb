import session from 'express-session';
import createMongoStore from 'connect-mongodb-session';
// -------------
// connect express-session to connect-mongodb-session
const monogDBStore = createMongoStore(session);

export default (sessionSecret) => {
  return session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: '_311820',
    cookie: {
      maxAge: 1000*60*60*24
    },
    store: new monogDBStore({
      uri: process.env.MONGO_URI,
      collection: 'sessions',
      expires: 1000*60*60*24
    })
  });
}