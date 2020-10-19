import { HeaderQueryData, RepositoryListQueryData } from '../src/components/dataTypes';
import { loadDataFile } from './loadDataFile';

export function loadHeaderData() {
  return loadDataFile<{ data: HeaderQueryData }>('Header').data;
}

export function loadRepositoryListData() {
  return loadDataFile<{ data: RepositoryListQueryData }>('RepositoryList').data;
}
