require('dotenv').config();
const path = require('path');
const express = require('express');
const server = express();

const config = require('../webpack.config');
const webpack = require('webpack');
const webpackDM = require('webpack-dev-middleware');
const webpackHM = require('webpack-hot-middleware');

const isDevServer = true;

if(isDevServer) {
  const compiler = webpack(config);
  
  server.use(webpackDM(compiler, {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    host: `localhost`,
    publicPath: config.output.publicPath
  }))

  server.use(webpackHM(compiler));
}


server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.set('view engine', 'ejs');
server.set('views', 'dist');

const errorController = require('../controllers/error.controller');

const adminRoutes = require('../routes/admin');
const storeRoutes = require('../routes/store');

server.use('/admin', adminRoutes);
server.use('/', storeRoutes);

server.use((req, res) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

server.use(errorController.get404);

server.listen(5001, () => console.log('🚀-lift off'));