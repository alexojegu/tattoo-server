require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  globalSetup: './test/__configs__/setup.ts',
  globalTeardown: './test/__configs__/teardown.ts',
};
