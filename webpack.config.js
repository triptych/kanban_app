const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./lib/parts');



const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

//module.exports = {
const common = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter to form given it's convenient with more complex configurations.
  
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo v1"
    })
  ]
};

// Default configuration. We will return this if
// Webpack is called outside of npm.

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    //config = merge(common, {});
    config = merge(
      common,
      parts.setupCSS(PATHS.app)
    );
    break;
  default:
    // config = merge(common, {});
    config = merge(
      common,
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
