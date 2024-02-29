import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Deprecated definition of "ts-jest"
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      // Remove the 'compilerOptions' property
    },
  },
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts'],

  setupFilesAfterEnv: ['./jest-setup.ts'],

  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;
