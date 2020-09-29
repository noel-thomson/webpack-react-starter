const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[hash].bundle.js",
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        // removeAttributeQuotes: true,
      },
    }),
    new Dotenv({
      path: "./.env.production",
    }),
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({ filename: "[name].[hash].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          miniCssExtractPlugin.loader, // 4. extract css into a file and minify
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
