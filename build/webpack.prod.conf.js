var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  entry: [path.resolve('src/editor/index.js')],
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    library: "vue-wysiwyg",
    libraryTarget: "umd",
    filename: "vue-wysiwyg.js",
    umdNamedDefine: true
    // filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'vue-wysiwyg.css'
    })
  ]
})


if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
