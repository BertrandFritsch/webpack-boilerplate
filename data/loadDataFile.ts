const cachedImports: { [ file: string ]: unknown } = {};

export function loadDataFile<T>(file: string): T {
  const filename = `${ file }.data.json`;
  return (cachedImports[ filename ] as T) || (cachedImports[ filename ] = require(`../data/${ filename }`));
}
