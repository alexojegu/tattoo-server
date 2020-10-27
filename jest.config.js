require('dotenv').config({ path: '.env.test' });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './test/__configs__/setup.ts',
  globalTeardown: './test/__configs__/teardown.ts',
};
