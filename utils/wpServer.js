const webpack = require('webpack');
const config = require('../webpack.config');
const webpackDM = require('webpack-dev-middleware');
const webpackHM = require('webpack-hot-middleware');

const webpackServerConnect = (server, inDevelopment) => {
  if(inDevelopment) {
    const compiler = webpack(config);
    
    server.use(webpackDM(compiler, {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      host: `localhost`,
      publicPath: config.output.publicPath
    }))

    server.use(webpackHM(compiler));
  }
}

exports.webpackServerConnect = webpackServerConnect;