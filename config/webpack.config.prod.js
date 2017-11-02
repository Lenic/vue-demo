import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

import config from './webpack.config';

function resolve(dir) {
  return path.join(__dirname, dir);
}

export default merge(config, {
  output: {
    publicPath: '/',
    filename: 'js/[name]-[chunkhash:8].js',
    path: resolve('../dist'),
    chunkFilename: 'js/chunks/[id]-[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.global\.less$/,
        exclude: /\.attached\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            { loader: 'less-loader' },
          ],
          publicPath: '/',
        }),
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'images/[name]-[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name]-[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          keep_fnames: true,
        },
        compress: {
          warnings: false,
          drop_console: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      title: 'CRM 运营后台',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
      template: resolve('index.html'),
      inlineSource: /manifest-.+\.js$/,
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ExtractTextPlugin('css/[name]-[contenthash:8].css'),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
  ],
});
