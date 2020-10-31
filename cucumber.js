/* eslint-disable @typescript-eslint/no-var-requires */
// cucumber.js
const dotenv = require('dotenv');
const os = require('os');
dotenv.config();
const IS_DEV = process.env.NODE_ENV === 'development';
const CPU_COUNT = IS_DEV ? 1 : os.cpus().length / 2;
const FAIL_FAST = IS_DEV ? [ '--fail-fast' ] : [];
const FORMAT = process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar';
module.exports = {
  default: [
    '--publish-quiet',
    './features/*.feature',
    ...FAIL_FAST,
    `--format ${ FORMAT }`,
    `--parallel ${ CPU_COUNT }`,
    '--require-module jsdom-global/register',
    '--require ./features/utils/ts-node.js',
    // Dependencies
    '--require ./features/utils/loaders.ts',
    // '--require ./features/utils/references.ts',
    // // Test
    // '--require ./features/worlds/index.tsx',
    '--require ./features/{step-definitions,common}/**/*.{ts,tsx}'
  ].join(' ')
};
