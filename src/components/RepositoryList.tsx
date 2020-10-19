import { useQuery } from '@apollo/client';
import * as React from 'react';
import classNames from 'classnames';
import RepositoryListQuery from './RepositoryList.graphql';
import { Chip, Typography } from '@material-ui/core';
import { ANNU, formatLocaleNumber, noop } from '../helpers';
import { RepositoryListQueryData } from './dataTypes';

import styles from './RepositoryList.module.scss';

interface Props {
  searchString: string | null;
}

interface Variables {
  first?: number;
  after?: number;
  query: string;
}

export default function RepositoryList({ searchString }: Props) {
  const { loading, error, data } = useQuery<RepositoryListQueryData, Variables>(
    RepositoryListQuery, {
      fetchPolicy: 'network-only',
      variables: {
        first: 20,
        query: searchString || ''
      },
      skip: searchString === null
    });

  if (error) {
    return (
      <Typography className={ classNames(styles.message, styles.errorMessage) }>An error occurred during the loading of the data!</Typography>
    );
  }

  if (!data && !loading) {
    return (
      <Typography className={ styles.message }>Start by doing a search</Typography>
    );
  }

  if (!data && loading) {
    return (
      <p className={ styles.message }>Loading...</p>
    );
  }

  ANNU(data);

  return (
    <section className={ styles.container }>
      <Typography className={ styles.header }>
        { `${ formatLocaleNumber(data.search.repositoryCount) } repositories found` }
      </Typography>
      {
        data.search.edges.map(
          r => (
            <section key={ r.node.url } className={ styles.repository }>
              <Typography className={ styles.url }>
                <a href={ r.node.url }>{ r.node.nameWithOwner }</a>
              </Typography>
              <Typography>
                { r.node.description }
              </Typography>
              <div className={ styles.topics }>
                {
                  r.node.repositoryTopics.edges.map(
                    t => (
                      <Chip key={ t.node.topic.name } className={ styles.topic } label={ t.node.topic.name } onClick={ noop } />
                    )
                  )
                }
              </div>
            </section>
          )
        )
      }
    </section>
  );
}
