import path from 'path';
import webpack from 'webpack';
import config from '../../webpack.config';
import webpackDM from 'webpack-dev-middleware';
import webpackHM from 'webpack-hot-middleware';

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

export default webpackServerConnect;