const { merge } = require("webpack-merge");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  entry: {
    main: ["webpack-hot-middleware/client?reload=true&timeout=1000"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: "development",
              reloadAll: true,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
