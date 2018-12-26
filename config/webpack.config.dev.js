const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const config = require('./webpack.config');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = merge(config, {
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    path: resolve('../dist'),
    chunkFilename: 'js/chunks/[id].js'
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      title: '运营模版系统',
      inlineSource: /runtime\.js$/,
      template: resolve('index.html')
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/chunks/[id].css'
    })
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
  ]
});
