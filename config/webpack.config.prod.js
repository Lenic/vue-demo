import fs from 'fs';
import path from 'path';
import _ from 'underscore';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import devConfig from './webpack.config';

function resolve(dir) {
  return path.join(__dirname, dir);
}

export default {
  ...devConfig,
  output: {
    chunkFilename: 'chunks/[id]-[chunkhash:8].js',
    filename: '[name]-[chunkhash:8].js',
    path: resolve('../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vuex Test',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      template: resolve('index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
    }),
    new ExtractTextPlugin('css/[name]-[contenthash:8].css'),
  ],
}
