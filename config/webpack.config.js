import path from 'path';
import webpack from 'webpack';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

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
      resolve('../src/res/css'),
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
        test: /\.attached\.less$/,
        exclude: /\.global\.less$/,
        use: [
          { loader: 'style-loader/useable' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.less$/,
        exclude: [/\.global\.less$/, /\.attached\.less$/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.attached.less', '.global.less', '.less'],
    alias: {
      '~': resolve('../src/client'),
      '$lib': resolve('../src/lib'),
      '$res': resolve('../src/res'),
      'vue$': 'vue/dist/vue.runtime.esm.js',
    },
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
