const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../js');
const APP_DIR = path.resolve(__dirname, 'src');

const PROD = false
const environment = PROD ? 'production' : 'development'

const config = {
  mode: environment,
  entry:  APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: "figure.bundle.js"
  },

  performance: {
    hints: PROD ? 'error' : false, // turn off perf hints
    maxAssetSize: 3000000, // int (in bytes),
    maxEntrypointSize: 8000000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  target: "web",

  plugins: [
    new webpack.DefinePlugin({
      'typeof window': '"object"',
    }),
  ],
  node: {
    dns: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties'],
          env: {
            production: {
              plugins: ['minimify-dead-code-elimination'],
            }
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.node'],
  },
  optimization: {
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ],
  }
};

module.exports = config;
