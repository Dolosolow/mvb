const autoprefixer = require('autoprefixer');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: ['./public/js'],
    dashboardAM: './public/js/add-movie/forms.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name]-[hash]-bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    writeToDisk: true,
    overlay: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'assets/css/styles-[hash].css' }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { 
        from: './public/images', to: 'assets/images'
      },
      {
        from: './views/partials', to: 'partials'
      }
    ]),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/main.template.ejs',
      filename: 'main.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/add-movie.template.ejs',
      filename: 'add-movie.ejs',
      chunks: ['main', 'dashboardAM']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/404.template.ejs',
      filename: '404.ejs',
    }),
  ]
}