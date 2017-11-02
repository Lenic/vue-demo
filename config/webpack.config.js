import path from 'path';
import webpack from 'webpack';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';

function resolve(dir) {
  return path.join(__dirname, dir);
}

export default {
  entry: {
    vendor: [
      'vue',
      'vuex',
      'axios',
      'moment',
      'vue-router',
      'underscore',
      'highcharts',
      'element-ui',
      resolve('../src/lib/utils'),
      resolve('../src/lib/mixins'),
      resolve('../src/lib/components'),
    ],
    app: resolve('../src/client'),
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve('../src'),
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader',
      },
      {
        test: /\.attached\.scss$/,
        exclude: /\.global\.scss$/,
        use: [
          { loader: 'style-loader/useable' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.scss$/,
        exclude: [/\.global\.scss$/, /\.attached\.scss$/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.attached.scss', '.global.scss', '.scss'],
    alias: {
      '~': resolve('../src/client'),
      '$lib': resolve('../src/lib'),
      '$res': resolve('../src/res'),
      'vue$': 'vue/dist/vue.runtime.esm.js',
    },
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 3,
      async: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
