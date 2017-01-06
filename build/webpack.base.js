const path = require('path')
const webpack = require('webpack')

const config = require('../config')
const utils = require('./utils')

module.exports = {
  entry: {
    app: './src/main'
  },
  output: {
    filename: '[name].js',
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: config.src,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: config.src,
        loader: 'babel'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        include: config.src,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.js$/,
        loader: "imports?define=>false"
      }
    ]
  },
  resolve: {
    root: config.src
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
}
