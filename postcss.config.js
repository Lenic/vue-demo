// 注意不要更改插件的顺序
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-url'),
    require('postcss-preset-env')({
      stage: 0,
      features: {
        'nesting-rules': true
      }
    })
  ]
};
