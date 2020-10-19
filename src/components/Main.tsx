import * as React from 'react';
import Header from './Header';
import RepositoryList from './RepositoryList';

import styles from './Main.module.scss';

export default function Main() {
  const [ searchString, setSearchString ] = React.useState<string | null>(null);

  return (
    <main className={ styles.main }>
      <Header searchString={ searchString } searchStringChanged={ setSearchString } />
      <RepositoryList searchString={ searchString } />
    </main>
  );
}
