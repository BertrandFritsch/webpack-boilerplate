import { DocumentNode } from 'graphql';
import loader from 'jest-transform-graphql';
import fs from 'fs';

require.extensions[ '.css' ] = (): string => '';
require.extensions[ '.gif' ] = (): string => '';
require.extensions[ '.jpg' ] = (): string => '';
require.extensions[ '.png' ] = (): string => '';
require.extensions[ '.scss' ] = (): string => '';
require.extensions[ '.graphql' ] = (module, file): DocumentNode =>
  eval(loader.process(fs.readFileSync(file, 'utf8')));
