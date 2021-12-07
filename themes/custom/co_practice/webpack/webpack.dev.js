// Node modules
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

// Config files
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');


// Configure the webpack-dev-server
const configureDevServer = () => {
  return {
    port: settings.devServerConfig.port,
    hot: true,
    open: true,
    https: settings.devServerConfig.https,
    publicPath: settings.devServerConfig.public,
    headers: { 'Access-Control-Allow-Origin': '*' },
    overlay: true,
    compress: true,

    contentBase: path.resolve(__dirname, settings.paths.templates),
    watchContentBase: true,
    // Settings for http-proxy-middleware.
    proxy: {
      '/': {
        index: '',
        context: () => true,
        target: settings.devServerConfig.proxy,
        // publicPath: settings.devServerConfig.public,
        secure: false,
        // These settings allow Drupal authentication to work, so you can sign
        // in to your Drupal site via the proxy. They require some corresponding
        // configuration in Drupal's settings.php.
        changeOrigin: true,
        xfwd: true,
      },
    },
  };
};

// Configure the Postcss loader
const configurePostcssLoader = () => {
  return {
    test: /\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
  };
};

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: settings.devServerConfig.public,
  },
  devServer: configureDevServer(),
  module: {
    rules: [configurePostcssLoader()],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

// Development module exports
module.exports = merge(common, devConfig);
