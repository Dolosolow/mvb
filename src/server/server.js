import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';

import csrf from 'csurf';
import express from 'express';
import createSession from '@src/config/session';
import helmetProtection from '@src/config/helmet';

import * as mongoDB from '@src/config/database';
import createSocket from '@src/config/socket';

import webpackServerConnect from '@src/config/wpServer';

import hasAuthToken from '@src/middlewares/hasAuthToken';
import hasUserSession from '@src/middlewares/hasUserSession';

import * as errorController from '@src/controllers/error.controller';
import apiRoutes from '@src/routes/api';
import adminRoutes from '@src/routes/admin';
import storeRoutes from '@src/routes/store';
import userRoutes from '@src/routes/user';
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
// csurf protection
const csrfProtection = csrf();

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.set('view engine', 'ejs');
server.set('views', 'dist');
server.use(createSession(process.env.SESSION_SECRET));
// -------------
// helmetjs + csrf protection
server.use(csrfProtection);
server.use(helmetProtection);
// -------------
// middleware required for all routes
server.use(hasAuthToken);
server.use(hasUserSession);
// -------------
// All routes being served
server.use('/api', apiRoutes);
server.use('/admin', adminRoutes);
server.use('/account', userRoutes);
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