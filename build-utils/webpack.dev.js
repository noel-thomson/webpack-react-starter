const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
  },
  devtool: "eval-source-map",
  plugins: [
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
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // 4. inject style tag into DOM
          {
            loader: "css-loader", // 3. turn css into JS
            options: {
              modules: true,
            },
          },
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
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
