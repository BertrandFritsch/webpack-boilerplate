import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import config from '../config/config.dev.json';

import 'normalize.css';

import Main from './components/Main';

export const GRAPHQL_URI = 'https://api.github.com/graphql';

const cache = new InMemoryCache();

const errorLink = onError(({ operation, response, graphQLErrors }) => {
  if (graphQLErrors) {
    console.error('[GraphQL error]:', { operation, response, graphQLErrors });
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    createHttpLink({ uri: GRAPHQL_URI, headers: { authorization: `Bearer ${ config.GITHUB_PAT }` } })
  ]),
  cache
});

const App = () =>
  <ApolloProvider client={ client }>
    <Main />
  </ApolloProvider>;

export default hot(App);
