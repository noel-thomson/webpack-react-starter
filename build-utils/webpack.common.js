const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    // vendor: "./src/vendor.js",
  },
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    // publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"], // requires assets with JS
      },
      {
        test: /\.(svg|png|jpg|jpe?g|gif|webp|mp3|wav|ogg|mp4|webm)$/,
        use: [
          {
            loader: "file-loader", // exports assets to dist
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  // resolve: {
  //   extensions: ["*", ".js", ".jsx"],
  // },
};
