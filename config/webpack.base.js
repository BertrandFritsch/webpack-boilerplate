const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

const configureResolveAlias = () => {
  return {
    alias: {
      'assets': path.resolve(__dirname, '../src/images')
    }
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

const configurePnPPlugin = () => {
  return {
    resolve: {
      plugins: [
        PnpWebpackPlugin,
      ],
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
  };
}

module.exports = merge(
  configurePnPPlugin(),
  configureTSLoader(),
  configureGraphQLTagLoader(),
  {
    entry: './src/index.tsx',
    resolve: configureResolveAlias(),
    plugins: [
      new HtmlWebPackPlugin({
        template: 'src/index.html'
      })
    ]
  });
