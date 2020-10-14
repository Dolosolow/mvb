import { config } from 'dotenv';
import path from 'path';
import express from 'express';
import { createServer } from 'http';
import * as mongoDB from '@src/utils/database';
import createSocket from '@src/utils/socket';

import webpackServerConnect from '@src/utils/wpServer';

import * as errorController from '@src/controllers/error.controller';
import apiRoutes from '@src/routes/api';
import adminRoutes from '@src/routes/admin';
import storeRoutes from '@src/routes/store';

import User from '@src/models/user';

config();

const server = express();
webpackServerConnect(server, true);

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.set('view engine', 'ejs');
server.set('views', 'dist');

// server.use(async (req, res, next) => {
//   try {
//     const foundUser = await User.findById('00');
//     req.user = foundUser;
//   } catch (err) {
//     console.log('something went wrong, call to db was not reached');
//   }
//   next();
// });
server.use('/api', apiRoutes);
server.use('/admin', adminRoutes);
server.use('/', storeRoutes);
server.use((req, res) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});
server.use(errorController.get404);

const http = createServer(server);
createSocket(http);

mongoDB.connect(() => {
  http.listen(5001, () => console.log('🚀-lift off'));
});
