const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const configureResolveAlias = () => {
  return {
    alias: {
      'assets': path.resolve(__dirname, '../src/images')
    }
  }
}

const configureGraphQLTagLoader = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          loader: 'graphql-tag/loader'
        }
      ]
    }
  }
}

module.exports = merge(
  configureGraphQLTagLoader(),
  {
    target: 'web',
    entry: './src/index.tsx',
    resolve: configureResolveAlias(),
    plugins: [
      new HtmlWebPackPlugin({
        template: 'src/index.html'
      })
    ]
  });
