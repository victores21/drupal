// Node modules
const path = require('path');

// Webpack plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

// Config files
const pkg = require('../package.json');
const settings = require('./webpack.settings.js');

// Configure Entries
const configureEntries = () => {
  let entries = {};
  for (const [key, value] of Object.entries(settings.entries)) {
    entries[key] = path.resolve(
      __dirname,
      '../' + settings.srcRoot + '/js/' + value,
    );
  }
  return entries;
};

// Configure Clean webpack
const configureCleanWebpack = () => {
  return undefined;
};

// Configure Babel loader
const configureBabelLoader = () => {
  return {
    test: /\.(js)$/,
    exclude: [/(node_modules)/],
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                corejs: {
                  version: 2,
                  proposals: true,
                },
                useBuiltIns: 'entry',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      'eslint-loader',
    ],
  };
};

// Configure Font loader
const configureFontLoader = () => {
  return {
    test: /\.(ttf|eot|woff2?)$/i,
    exclude: /img/,
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[ext]?[contenthash]',
    },
  };
};

// Configure Image loader
const configureImageLoader = () => {
  return {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    loader: 'file-loader',
    options: {
      name: 'img/[name].[ext]?[contenthash]',
    },
  };
};

// Configure Copy Static
const configureCopyStatic = () => {
  return [
    {
      context: './' + settings.srcRoot + '/static/',
      from: '**/*',
      to: './static/[folder]/[name].[ext]?[contenthash]',
      flatten: true,
    },
  ];
};

// Configure Manifest
const configureManifest = fileName => {
  return {
    fileName: fileName,
    basePath: '',
    map: file => {
      file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
      return file;
    },
  };
};

// Configure Vue loader
const configureVueLoader = () => {
  return {
    test: /\.vue$/,
    loader: 'vue-loader',
  };
};

// Common module exports
module.exports = {
  name: pkg.name,
  entry: configureEntries(),
  output: {
    filename: path.join('./js', '[name].bundle.js?[chunkhash:8]'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '.'),
    },
  },
  externals: {
    jquery: 'jQuery',
    Drupal: 'Drupal',
    drupalSettings: 'drupalSettings',
  },
  module: {
    rules: [
      configureBabelLoader(),
      configureFontLoader(),
      configureImageLoader(),
      configureVueLoader(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(configureCleanWebpack()),
    new CopyWebpackPlugin(configureCopyStatic()),
    new WebpackManifestPlugin(configureManifest('manifest.json')),
    new WebpackBuildNotifierPlugin({
      sound: 'Funk',
      successSound: 'Pop',
    }),
    new VueLoaderPlugin(),
  ],
};
