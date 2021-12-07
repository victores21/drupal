// Node modules
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const moment = require('moment');

// Webpack plugins
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

// Config files
const common = require('./webpack.common.js');
const pkg = require('../package.json');

// Configure file banner
const configureBanner = () => {
  return {
    banner: [
      '/*!',
      ' * @project        ' + pkg.name,
      ' * @name           ' + '[filebase]',
      ' * @author         ' + pkg.author.name,
      ' * @build          ' + moment().format('llll') + ' ET',
      ' * @copyright      Copyright (c) ' +
        moment().format('YYYY') +
        ' ' +
        pkg.author.name,
      ' *',
      ' */',
      '',
    ].join('\n'),
    raw: true,
  };
};

// Configure the Postcss loader
const configurePostcssLoader = () => {
  return {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  };
};

// Configure optimization
const configureOptimization = () => {
  return {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  };
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  optimization: configureOptimization(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../',
  },
  module: {
    rules: [configurePostcssLoader()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('./css', '[name].css?[contenthash]'),
    }),
    new webpack.BannerPlugin(configureBanner()),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};

// Production module exports
module.exports = merge(common, prodConfig);
