import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: 'src',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
 