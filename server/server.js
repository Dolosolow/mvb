require('dotenv').config();
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);

const server = express();

server.use(webpackDevMiddleware);
server.set('view engine', 'ejs');
server.set('views', 'dist');
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'dist/')));

const adminRoutes = require('../routes/admin');
const mainRoutes = require('../routes/main');

server.use('/admin', adminRoutes);
server.use('/', mainRoutes);

server.use((req, res) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).render('404', { pageTitle: 'Page Not Found' });
});

server.listen(5000, () => console.log('🚀-lift off'));