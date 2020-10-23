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
    admin_acct: ['./src/public/js/accounts/adminAcct/movieList.js', './src/public/js/accounts/adminAcct/searchMovie.js'],
    cart: ['./src/public/js/cart/cart.js'],
    gen_acct: ['./src/public/js/pages/accounts-dash.js'],
    main: ['webpack-hot-middleware/client?reload=true&timeout=1000', './src/public/js/pages/index.js', './src/public/js/forms/login-form.js'],
    memberships: ['./src/public/js/pages/main-membership.js'],
    owl_carousel: ['./src/public/js/pages/owl-carousel.js'],
    reservations: ['./src/public/js/reservations/index.js', './src/public/js/reservations/seat-reservations.js'],
    signup: ['./src/public/js/pages/signup.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      client_utils: path.resolve(__dirname, 'src/public/js/utils')
    },
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(svg|png|jpg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[ext]/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              }
            }
          }
        ]
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
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'assets/css/styles.css' }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/public/images/favicons', to: 'assets/images/favicons' },
        { from: './src/views/partials', to: 'partials' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/404.template.ejs',
      filename: '404.ejs',
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/admin-dash.template.ejs',
      filename: 'admin-dash.ejs',
      chunks: ['main', 'gen_acct', 'admin_acct']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/seat-booking.template.ejs',
      filename: 'seat-booking.ejs',
      chunks: ['main', 'reservations', 'cart']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/index.template.ejs',
      filename: 'index.ejs',
      chunks: ['main', 'owl_carousel']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/events.template.ejs',
      filename: 'events.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/membership.template.ejs',
      filename: 'membership.ejs',
      chunks: ['main', 'memberships']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/locations.template.ejs',
      filename: 'locations.ejs',
      chunks: ['main', 'owl_carousel']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/signup-gold.template.ejs',
      filename: 'signup-gold.ejs',
      chunks: ['main', 'signup']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/signup-silver.template.ejs',
      filename: 'signup-silver.ejs',
      chunks: ['main', 'signup']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/checkout.template.ejs',
      filename: 'checkout.ejs',
      chunks: ['main', 'signup', 'cart']
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/wine-dine.template.ejs',
      filename: 'wine-dine.ejs',
      chunks: ['main']
    }),
  ]
}