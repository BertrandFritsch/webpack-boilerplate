const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');
const { cssLoaders } = require('./util');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Configure Dev Server
const configureDevServer = () => {
  return {
    contentBase: './src',
    open: false,
    port: 8080,
    inline: true,
    stats: "errors-warnings",
    hot: true
  };
};

const configureTSLoader = () => {
  return {
    resolve: {
      // resolvable extensions.
      extensions: [ '.ts', '.tsx', '.js' ]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [ 'react-refresh/babel' ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
              }
            }
          ]
        }
      ]
    }
  }
}

const configureFileLoader = () => {
  return {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'file-loader'
  }
}

module.exports = merge(baseConfig,
  configureTSLoader(),
  {
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
      new ReactRefreshPlugin(),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(false)
      }),
      new ForkTsCheckerWebpackPlugin()
    ]
  });
