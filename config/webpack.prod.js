const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { cssLoaders } = require('./util');

const OUTPUT_DIR = 'docs';

const configureOutput = () => {
  return {
    path: path.resolve(__dirname, `../${ OUTPUT_DIR }`),
    filename: 'vendor/[name].[contenthash].js',
    chunkFilename: 'vendor/[name].[contenthash].js',
  }
}

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
          use: [
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    }
  }
}

const configureFileLoader = () => {
  return {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
      outputPath: url => {
        if (/src/.test(url)) {
          return url.replace('src', '../..');
        }
      }
    },
  }
}

const configureTerser = () => {
  return {
    parallel: true
  };
};

const configureOptimization = () => {
  return {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.s?css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true,
        },
      }
    },
    minimizer: [ new TerserPlugin(configureTerser()) ]
  }
}

const configureMiniCssExtract = () => {
  return {
    filename: 'vendor/css/[name].[contenthash].css',
    chunkFilename: 'vendor/css/[name].[contenthash].css',
  }
}

const configureSW = () => {
  return {
    clientsClaim: true,
    skipWaiting: true,
    directoryIndex: 'index.html',
    offlineGoogleAnalytics: true
  }
}

const configureCopy = () => {
  return {
    patterns: [
      { from: 'src/assets/', to: 'assets/' },
      { from: 'src/images/', to: 'images/' }
    ]
  }
};

module.exports = merge(baseConfig,
  configureTSLoader(),
  {
    mode: 'production',
    output: configureOutput(),
    target: 'web',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            ...cssLoaders
          ],
        },
        configureFileLoader()
      ],
    },
    optimization: configureOptimization(),
    plugins: [
      new CleanWebpackPlugin({
        dry: false,
        verbose: true
      }),
      new MiniCssExtractPlugin(
        configureMiniCssExtract()
      ),
      new WorkboxPlugin.GenerateSW(
        configureSW()
      ),
      new CopyWebpackPlugin(
        configureCopy()
      ),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true)
      }),
      new BundleAnalyzerPlugin({
        openAnalyzer: true
      }),
    ]
  });
