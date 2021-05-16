require('dotenv').config();

module.exports = {
  schema: './src/schemas/*.graphql',
  documents: './test/__requests__/*.ts',
};
