const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const base = require('./webpack.base')
const config = require('../config')
const utils = require('./utils')

module.exports = merge(base, {
  output: {
    filename: utils.assetsPath('[name].js'),
    path: config.build.assetsRoot,
    chunkFilename: utils.assetsPath('[id].js')
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: config.src,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          config.build.productionSourceMap
          ? 'css-loader?sourceMap!sass-loader?sourceMap'
          : 'css-loader!sass-loader'
        )
      }
    ]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  stats: {
    children: false
  },
  plugins: [
    new CleanWebpackPlugin([config.build.assetsRoot], {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin(
      utils.assetsPath('[name].css')
    ),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
})
