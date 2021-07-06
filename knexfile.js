/* eslint-disable no-undef */
// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    debug: true,
    client: 'mysql',
    connection: {
      database: process.env.KNEX_DATABASE,
      user: process.env.DMYSQL_USER,
      password: process.env.DMYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './server/db/knex/migrations',
    },
    seeds: {
      directory: './server/db/knex/seeds',
    },
    test: {
      // debug: true,
      client: 'mysql',
      connection: {
        database: process.env.KNEX_TEST_DB,
        user: process.env.DMYSQL_USER,
        password: process.env.DMYSQL_PASSWORD,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './db/knex/migrations',
      },
      seeds: {
        directory: './db/knex/seeds',
      },
    },
  },

};
