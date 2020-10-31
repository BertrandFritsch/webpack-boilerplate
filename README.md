
# Webpack Boilerplate
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Webpack 5 boilerplate with React, Apollo GraphQL, Typescript, Sass, CSS Modules and a lot more.
It also includes optimization for development and production build.

## Clone the repo and install dependencies
```powershell
git clone https://github.com/BertrandFritsch/webpack-boilerplate.git
cd webpack-boilerplate
yarn install
```
## Usage

The app uses GitHub to illustrate the usage of the technologies.
It expects a configuration file [config/config.dev.json](config) containing the [Personal Access Token](https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql).

```json
{
  "GITHUB_PAT": "XXX"
}
```

### Development server

```powershell
yarn dev
```

### Production build

```powershell
yarn prod
```

### Acceptance tests

```powershell
yarn test:cov
```

## Features

- [Webpack](https://webpack.js.org)
- [TypeScript](https://www.typescriptlang.org)
- [React](https://reactjs.org)
- [Material-UI](https://material-ui.com)
- [Apollo GraphQL](https://www.apollographql.com/docs/react)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [Sass](https://sass-lang.com)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [PostCSS](https://postcss.org)
- [ESLint](https://eslint.org)
- [React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)

## Dependencies

### Webpack

- [`webpack`](https://github.com/webpack/webpack) - Module and asset bundler
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for Webpack
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Simplify development and production configuration

### Loaders

- [`ts-loader`](https://github.com/TypeStrong/ts-loader) - Transpile files with Typescript and Webpack
- [`graphql-tag/loader`](https://github.com/apollographql/graphql-tag) - Load GraphQL queries
- [`sass-loader`](https://webpack.js.org/loaders/sass-loader/) - Load SCSS and compile to CSS
- [`sass-resources-loader`](https://github.com/shakacode/sass-resources-loader/) - @import your SASS resources into every required SASS module
- [`node-sass`](https://github.com/sass/node-sass) - Node Sass
- [`postcss-loader`](https://webpack.js.org/loaders/postcss-loader/) - Process CSS with PostCSS
  - [`cssnano`](https://github.com/cssnano/cssnano) - Optimize and compress PostCSS
  - [`autoprefixer`](https://github.com/postcss/autoprefixer) - Parse CSS and add vendor prefixes
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Resolves CSS imports into JS
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Inject CSS into the DOM
- [`file-loader`](https://webpack.js.org/loaders/file-loader/) - Copy files to build folder

### Plugins

- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - Generate HTML files
- [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin) - Remove/clean build folders
- [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin) - Copy files to build directory
- [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - Extract CSS into separate files
- [`terser-webpack-plugin`](https://github.com/webpack-contrib/terser-webpack-plugin) - Minify JavaScript
- [`workbox-webpack-plugin`](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-webpack-plugin) - Workbox provides two webpack plugins: one that generates a complete service worker for you and one that generates a list of assets to precache that is injected into a service worker file.

## License

This project is open source and available under the [MIT License](LICENSE).
