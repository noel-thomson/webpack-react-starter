const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
  },
  // devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello Webpack",
      template: "./src/index.html",
    }),
    new Dotenv({
      path: "./.env.development",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // 4. inject style tag into DOM
          "css-loader",
          {
            loader: "postcss-loader", // 2. add vendor prefixes
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader", // 1. convert sass into CSS
            options: {
              // sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
      },
    ],
  },
});
