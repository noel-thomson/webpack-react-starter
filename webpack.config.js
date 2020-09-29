// package.json > scripts >
// "start": "webpack-dev-server --config build-utils/webpack.config.js --env.env=dev",
// "build": "webpack --config build-utils/webpack.config.js --env.env=prod",

const { merge } = require("webpack-merge");
const commonConfig = require("./build-utils/webpack.common.js");

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`);
  return merge(commonConfig, envConfig);
};
