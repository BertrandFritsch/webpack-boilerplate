import { useQuery } from '@apollo/client';
import * as React from 'react';
import { debounce } from 'underscore';
import HeaderQuery from './Header.graphql';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { HeaderQueryData } from './dataTypes';

import styles from './Header.module.scss';

interface Props {
  searchString: string | null;

  searchStringChanged: (searchString: string | null) => void;
}

export default function Header({ searchString, searchStringChanged }: Props) {
  const { data } = useQuery<HeaderQueryData>(HeaderQuery);
  const [ localSearchString, setLocalSearchString ] = React.useState(searchString);

  const debouncedSearchString = React.useMemo(
    () => debounce(searchStringChanged, 600),
    []
  );

  React.useEffect(
    () => {
      debouncedSearchString(localSearchString);
    },
    [ localSearchString ]
  );

  return (
    <AppBar position='static' className={ styles.header }>
      <Toolbar className={ styles.toolbar }>
        <Typography variant="h6" noWrap>
          Github explorer demo
        </Typography>
        <div className={ styles.search }>
          <InputBase
            placeholder="Search…"
            classes={ {
              root: styles.inputRoot,
              input: styles.inputInput
            } }
            inputProps={ { 'aria-label': 'search' } }
            value={ localSearchString || '' }
            onChange={ e => setLocalSearchString(e.target.value.trim() || null)}
          />
          <div className={ styles.searchIcon }>
            <SearchIcon />
          </div>
        </div>
        {
          data &&
          <>
            <img className={ styles.avatar } src={ data.viewer.avatarUrl } alt='avatar' />
            <Typography className={ styles.user }>{ data.viewer.name }</Typography>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}
