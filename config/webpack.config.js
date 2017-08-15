import fs from 'fs';
import path from 'path';
import _ from 'underscore';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

function resolve (dir) {
  return path.join(__dirname, dir);
}

export default {
  entry: {
    vendor: ['underscore', 'es6-promise/auto', 'axios'],
    app: resolve('../src/client'),
  },
  output: {
    filename: '[name].js',
    path: resolve('../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('../src/client'), resolve('../src/lib')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' },
          ],
        }),
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.less'],
    alias: {
      '$lib': resolve('../src/lib'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vuex Test',
      template: resolve('index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('[name].css'),
  ],
}
