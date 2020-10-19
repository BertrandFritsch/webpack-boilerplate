const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');
const { cssLoaders } = require('./util');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Configure Dev Server
const configureDevServer = () => {
  return {
    contentBase: './src',
    open: false,
    port: 8585,
    inline: true,
    stats: "errors-warnings",
    hot: true,
  };
};

// configure File Loader
const configureFileLoader = () => {
  return {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'file-loader'
  }
}

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: configureDevServer(),
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          ...cssLoaders
        ],
      },
      configureFileLoader()
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
});
