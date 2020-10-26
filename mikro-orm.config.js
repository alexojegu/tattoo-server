require('dotenv').config({ path: '.env.development' });

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABSE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: ['dist/entities/*.js'],
  entitiesTs: ['src/entities/*.ts'],
  forceUtcTimezone: true,
  multipleStatements: true,
};
