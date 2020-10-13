require('dotenv').config();
const path = require('path');
const express = require('express');
const server = express();

require('../utils/wpServer').webpackServerConnect(server, true);

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.set('view engine', 'ejs');
server.set('views', 'dist');

const apiRoutes = require('../routes/api');
const errorController = require('../controllers/error.controller');
const adminRoutes = require('../routes/admin');
const storeRoutes = require('../routes/store');

const User = require('../models/user');

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

const http = require('http').createServer(server);
require('../utils/socket')(http);

const mongoDB = require('../utils/database').connect;

mongoDB(() => {
  http.listen(5001, () => console.log('🚀-lift off'));
});