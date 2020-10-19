const path = require('path');

module.exports.cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 2,
      modules: {
        auto: true,
        localIdentName: '[name]__[local]_[hash:base64:5]',
        exportLocalsConvention: 'camelCaseOnly'
      }
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve(__dirname, 'postcss.config.js'),
      }
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        './src/scss/modules/_config.scss',
        './src/scss/modules/_global.scss'
      ],
    },
  },
];
