const knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('../knexfile');

// eslint-disable-next-line no-undef
const environment = process.env_NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);

module.exports = connection;
