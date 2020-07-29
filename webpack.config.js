const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: ['webpack-hot-middleware/client?reload=true&timeout=1000', './public/js'],
    gen_acct: ['./public/js/accounts'],
    admin_acct: ['./public/js/accounts/adminAcct/movieList', './public/js/accounts/adminAcct/searchMovie'],
    memberships: ['./public/js/main-membership.js'],
    owl_carousel: ['./public/js/owl-carousel.js'],
    signup: ['./public/js/signup.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(svg|png|jpg?e)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/svg/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: 'development',
              reloadAll: true
            }
          },
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({ filename: 'assets/css/styles.css' }),
    new Dotenv(),
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
      template: '!!raw-loader!./views/pages/404.template.ejs',
      filename: '404.ejs',
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/admin-dash.template.ejs',
      filename: 'admin-dash.ejs',
      chunks: ['main', 'gen_acct', 'admin_acct']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/seat-booking.template.ejs',
      filename: 'seat-booking.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/index.template.ejs',
      filename: 'index.ejs',
      chunks: ['main', 'owl_carousel']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/events.template.ejs',
      filename: 'events.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/membership.template.ejs',
      filename: 'membership.ejs',
      chunks: ['main', 'memberships']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/locations.template.ejs',
      filename: 'locations.ejs',
      chunks: ['main', 'owl_carousel']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/signup-gold.template.ejs',
      filename: 'signup-gold.ejs',
      chunks: ['main', 'signup']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/signup-silver.template.ejs',
      filename: 'signup-silver.ejs',
      chunks: ['main', 'signup']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./views/pages/wine-dine.template.ejs',
      filename: 'wine-dine.ejs',
      chunks: ['main']
    }),
  ]
}