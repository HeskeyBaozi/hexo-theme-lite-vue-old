const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

module.exports = merge(baseConfig, {
  entry: './src/entry-server.ts',
  target: 'node',
  devtool: 'source-map',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new VueSSRServerPlugin()
  ]
});
