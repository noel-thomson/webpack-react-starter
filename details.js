// CLI 
mkdir my-project cd my-project 
npm init -y

// CLI
git init
// .gitignore >
node_modules

// CLI root directory
mkdir src cd src 
touch index.js
// src/index.js >
console.log('hello webpack');

// CLI root directory
mkdir dist cd dist 
touch index.html
// .gitignore >
dist

// CLI
npm install --save-dev webpack webpack-dev-server webpack-cli
// (v1) package.json > scripts > (v1)
  "start": "webpack-dev-server --config ./webpack.config.js --mode development",
  "build": "webpack --config ./webpack.config.js --mode production",

// CLI root directory
touch webpack.config.js
// webpack.config.js >
module.exports = {
  entry: './src/index.js', 
  // devtool: 'none', (optional)
  output: {
    path: __dirname + 'dist', 
    publicPath: '/', 
    filename: 'bundle.[contentHash].js'
  },
  devServer: {
    contentBase: './dist'
  }
};

// dist/index.html > body >
<script src="./bundle.js"></script>

// CLI 
npm run start // browser console 'hello webpack'
npm run build
// (npm i -g http-server)
http-server dist

// CLI root directory
npm install --save-dev @babel/core @babel/preset-env babel-loader
touch .bablerc
// .babelrc > // (or package.json > babel > )
{
  "presets": [
    "@babel/preset-env"
  ]
}
// webpack.config.js > module.exports >
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  }

// CLI 
npm install --save-dev @babel/preset-react

// .babelrc > presets
  ["@babel/preset-env", "@babel/preset-react"]

// CLI
npm install --save-dev html-webpack-plugin

// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
// > module.exports
  plugins: [
      new HtmlWebpackPlugin({
      title: 'Hello Webpack',
      template: './src/index.html'
    }),
  ],

// CLI src
touch index.html // create html template
// src/index.html > 
<head><title><%=htmlWebpackPlugin.options.title%></title></head>

// CLI
npm install --save-dev clean-webpack-plugin

// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack.config.js > module.exports >
  plugins: [
    ...,
    new CleanWebpackPlugin(),
  ]

// webpack.config.js > module.exports
devtool: 'source-map',

// (v2) package.json > replace scripts >
"start": "webpack-dev-server --config ./webpack.dev.js",
"build": "webpack --config ./webpack.prod.js",

// CLI root directory
touch webpack.dev.js webpack.prod.js
// copy content of webpack.config.js to the .dev and .prod files

// wepack.dev.js > module.exports
  mode: 'development',
  devtool: 'source-map',

// wepack.prod.js > module.exports
  mode: 'production',
  devtool: 'eval-source-map',

// (v3) package.json > replace scripts > 
  "start": 
    "webpack-dev-server --config build-utils/webpack.config.js --env.env=dev",
  "build": 
    "webpack --config build-utils/webpack.config.js --env.env=prod",

// CLI root directory
mkdir build-utils cd build-utils
touch webpack.config.js
npm install --save-dev webpack-merge

// build-utils/webpack.config.js
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`);
  return merge(commonConfig, envConfig);
};

// rename original ./webpack.config.js to ./webpack.common.js
// drag webpack.common.js into /build-utils/
// edit build-utils/webpack.common.js >
  const path = require('path');
  // module.exports >
    output: {
        path: path.resolve(__dirname, '../', 'dist'),
    },
    // (remove) devtool: 'source-map'

// CLI build-utils/
touch webpack.dev.js webpack.prod.js // (v2)
// build-utils/webpack.dev.js > 
const { DefinePlugin } = require('webpack');
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ],
};

// build-utils/webpack.prod.js >
const { DefinePlugin } = require('webpack');
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
  ],
};

// CLI root directory
rm webpack.dev.js webpack.prod.js // (delete v1's)

// CLI root directory
npm i --save-dev dotenv-webpack
touch .env.development .env.production
// .env.development >
NODE_ENV=development
// .env.production >
NODE_ENV=production
// .gitignore >
./.env.development
./.env.production

// build-utils/webpack.dev.js >
const Dotenv = require('dotenv-webpack');
// module.exports >
  plugins: [
    new Dotenv({
      path: './.env.development',
    })
  ],

// build-utils/webpack.prod.js >
const Dotenv = require('dotenv-webpack');
// module.exports >
  plugins: [
    new Dotenv({
      path: './.env.production',
    })
  ],

// (v4 increased readability) package.json > replace scripts > 
  "start": 
    "webpack-dev-server --config build-utils/webpack.dev.js --open",
  "build": 
    "webpack --config build-utils/webpack.prod.js",

// /build-utils/webpack.dev.js && /build-utils/webpack.prod.js >
const common = require("./webpack.common.js");
module.exports = merge(common, { ... });
// /build-utils/webpack.config.js no longer required

// /build-utils/webpack.prod.js >
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// module.exports.plugins: [..., ] >
new CleanWebpackPlugin();
// remove clean-webpack-plugin from /build-utils/webpack.dev.js > 

// CLI
npm i --save-dev @babel/preset-react

// .babelrc > presets: [..., ] >
  "@babel/preset-react"

// package.json > module.exports.module.rules[0] >
  test: /\.(js|jsx)$/,
// module.exports.resolve.extensions: [..., ] >
  '.jsx'

// CLI 
npm i --save react react-dom
cd src/components touch App.js
// App.js >
import React from 'react';
const App = ({greeting}) => <div>{greeting}</div>;
export default App;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const greeting = "Hello React";
ReactDOM.render(
  <App greeting={greeting}/>, document.getElementById('root')
);

// CLI
npm i --save-dev react-hot-loader
// build-utils/webpack.common.js > module.exports.plugins: [...,]
  new webpack.HotModuleReplacementPlugin(),
// module.exports.devserver >
  hot: true
// src/index.js >
module.hot.accept();

// CLI
npm i --save-dev css-loader style-loader

// build-utils/webpack.common.js > 
// module.exports.module.rules [...,] >
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      'style-loader', // inject styles into DOM
      {
        loader: 'css-loader', // turn css into js
        options: {
          modules: true,
        },
      },
    ],
  },

// CLI src/components >
touch app.css 
// src/components/app.css >
#greeting { color: red; }

// CLI 
npm i --save-dev postcss-loader postcss autoprefixer
// /build-utils/webpack.config.common.js > module.exports.module.rules.use [...,] >
"css, loader",
{
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [require("autoprefixer")]
    },
  },
},


// src/components/App.js
import styles from './app.css';
const App = ({greeting}) => (
  <div id="style.greeting">{greeting}</div>;
)
// CLI
npm i --save-dev sass-loader node-sass

// // build-utils/webpack.common.js > 
// module.exports.module.rules.use [...,] >
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true, // webpack.prod.js > false (?)
    },
  },

// CLI 
npm i --save-dev html-loader file-loader

// CLI /src/
mkdir assets

// /build-utils/webpack.common.js > module.exports.module.rules: [..., ] >
{
  test: /\.html$/,
  use: ['html-loader'] // requires assets with JS
},
{
  test: /\.(svg|png|jpg?e|gif|mp3)$/,
  use: {
    loader: 'file-loader', // exports assets to dist
    options: {
      name: '[name].[hash].[ext]',
      outputPath: 'assets', 
    }
  }
}

// /build-utils/webpack.common.js > module.exports >
entry: {
  index: './src/index.js',
  vendor: './src/vendor.js' 
}

// /build-utils/webpack.production.js > module.exports.output >
  filename: '[name].[hash].bundle.js' // name maps to entry prop

// /build-utils/webpack.production.js > module.exports.output >
  filename: '[name].bundle.js' 

// CLI
npm i --save-dev lodash
// /src/vendor.js >
import 'lodash'; // (for example)

// CLI 
npm i --save-dev mini-css-extract-plugin

// /build-utils/webpack.prod.js >
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// module.exports.plugins: [..., ] >
new miniCssExtractPlugin({ filename: "[name].[hash].css" },)

// move module.rules[{test: /\.scss$/, ...}] to webpack.dev.js

// /build-utils/webpack.prod.js > module.exports >
module: {
  rules: [
    {
      test: /\.scss$/,
      use: [
        miniCssExtractPlugin.loader, // extract css into a file
        "css-loader",
        "sass-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [require("autoprefixer")]
            },
          },
        },
      ]
    }
  ]
}

// // CLI (to minify CSS - but it's already taken care of)
// npm install --save-dev optimize-css-assets-webpack-plugin
// // /build-utils/webpack.prod.js >
// const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const terserWebpackPlugin = require('terser-webpack-plugin');
// // module.exports > 
// optimization: {
//   minimizer: [
//     new optimizeCssAssetsWebpackPlugin(),
//     new terserWebpackPlugin(),
//   ]
// }

// /build-utils/ cut and paste from webpack.common.js to webpack.dev.js > module.exports >
const htmlWebpackPlugin = require('html-webpack-plugin');
plugins: [new htmlWebpackPlugin(...)]

// /build-utils/webpack.prod.js > module.exports >
const htmlWebpackPlugin = require('html-webpack-plugin');
plugins: [new htmlWebpackPlugin(
  ...,
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    // removeAttributeQuotes: true,
  }
)]

// CLI 
npm i --save-dev image-webpack-loader

// /build-utils/webpack.common.js > module.exports.module.rules [...,] >
{
  test: /\.(svg|png...)$/,
  use: [
    {
      loader: "file-loader", // exports assets to dist
      ...
    },
    {
      loader: "image-webpack-loader", // optimize images
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65, // ...
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
