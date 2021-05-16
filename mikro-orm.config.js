require('dotenv').config();

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: ['dist/entities/*.js'],
  entitiesTs: ['src/entities/*.ts'],
  autoJoinOneToOneOwner: false,
  forceUtcTimezone: true,
  multipleStatements: true,
};
