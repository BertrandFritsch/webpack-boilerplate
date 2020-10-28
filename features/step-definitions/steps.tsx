import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { act, cleanup, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';
import * as React from 'react';
import { After, Given, Then, When } from '@cucumber/cucumber';
import expect from 'expect';
import { loadHeaderData } from '../../data/loadData';
import { loadDataFile } from '../../data/loadDataFile';
import Main from '../../src/components/Main';
import { NNU } from '../../src/helpers';
import { TestingLibraryWorld } from '../types';

interface Props {}

const getApolloClient = (fetchMockResponse?: fetchMock.MockResponse) => {
  // if no fetch function has been provided, provide a default one
  const mockedNetworkFetch = fetchMock.sandbox().mock('*', fetchMockResponse || ((url: string, { body }: { body: string }) => {
    const query: { operationName: string; variables: Record<string, any>; query: string } = JSON.parse(body);
    if (query.operationName === 'Header') {
      return loadDataFile('Header');
    }

    if (query.operationName === 'RepositoryList') {
      if (query.variables.query !== 'error') {
        return loadDataFile('RepositoryList');
      }
      else {
        throw new Error('Loading error!');
      }
    }

    throw new Error(`Unexpected GraphQL call: ${ query.operationName }!`);
  }));

  return new ApolloClient({
    link: new HttpLink({ fetch: mockedNetworkFetch }),
    cache: new InMemoryCache()
  });
};

const getInitialProps = (props: Partial<Props>): Props => ({
  ...props
});

const renderComponent = async (providedProps: Partial<Props> = {}, comp?: RenderResult, client = getApolloClient()) => {
  const props = getInitialProps(providedProps);

  const element = (
    <ApolloProvider client={ client }>
      <Main { ...props } />
    </ApolloProvider>
  );

  let c!: ReturnType<typeof render>;
  await act(async () => {
    if (!comp) {
      c = render(element);
    }
    else {
      comp.rerender(element);
    }
  });

  return comp || c;
};

After(cleanup);

Given('I am on the main page', async function (this: TestingLibraryWorld) {
  this.component = await renderComponent();
});

When('I search for the repositories containing the word {string}', async function(this: TestingLibraryWorld, searchString: string) {
  await userEvent.type(NNU(this.component).getByPlaceholderText('Search…'), searchString);
});

When('An error occurs while searching for the repositories matching a search string', async function(this: TestingLibraryWorld) {
  await userEvent.type(NNU(this.component).getByPlaceholderText('Search…'), 'error');
});

Then('I should see my profile', async function(this: TestingLibraryWorld) {
  expect(await NNU(this.component).findByText(loadHeaderData().viewer.name)).toBeDefined();
});

Then('I should see the list of repositories', async function(this: TestingLibraryWorld) {
  expect(await NNU(this.component).findByText(/repositories found/)).toBeDefined();
});

Then('I should not see the list of repositories', function(this: TestingLibraryWorld) {
  expect(NNU(this.component).queryByText(/repositories found/)).toBeNull();
});

Then('I should see an error message', async function(this: TestingLibraryWorld) {
  expect(await NNU(this.component).findByText(/An error occurred during the loading of the data!/)).toBeDefined();
});
