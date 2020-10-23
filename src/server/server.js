import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

import mongoose from 'mongoose';
import createMongoStore from 'connect-mongodb-session';
import * as mongoDB from '@src/config/database';
import createSocket from '@src/config/socket';

import webpackServerConnect from '@src/config/wpServer';

import * as errorController from '@src/controllers/error.controller';
import apiRoutes from '@src/routes/api';
import adminRoutes from '@src/routes/admin';
import storeRoutes from '@src/routes/store';
// -------------
// .env
dotenv.config();
// -------------
// initializing express & connect to webpack middleware
const server = express();
webpackServerConnect(server, process.env.NODE_ENV === 'development');
// -------------
// creation of http server & socket.io 
const http = createServer(server);
createSocket(http);
// -------------
// connect express-session to connect-mongodb-session
const monogDBStore = createMongoStore(session);

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.set('view engine', 'ejs');
server.set('views', 'dist');

server.use(cookieParser(process.env.SESSION_SECRET));
server.use(session({
  secret: process.env.SESSION_SECRET,
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
}));
server.use(flash());

// -------------
// Global variables
server.use((req, res, next) => {
  // -------------
  // req.session.user: Sets a initial account with type 'guest' to users when visit site.
  // changes to the session.account are done if user login/signup.
  if(!req.session.user) {
    req.session.user = { _id: mongoose.Types.ObjectId(), type: 'guest' };
  }
  res.locals.successMsg = req.flash('success');
  res.locals.errorMsg = req.flash('error');
  
  next();
});

server.use('/api', apiRoutes);
server.use('/admin', adminRoutes);
server.use('/', storeRoutes);
server.use((req, res) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});
server.use(errorController.get404);

mongoDB.connect(() => {
  http.listen(5001, () => console.log('🚀-lift off'));
});