// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
/**
 * @param {Knex} knex
*/
const tableNames = require('../../../src/constants/tableNames');
const {
  createTable,
  createTableWithReference,
} = require('../../../src/lib/tableUtils');

exports.up = async (knex) => {
  await Promise.all([
  createTable(knex, tableNames.domain), 
  createTableWithReference(knex, tableNames.kingdom, tableNames.domain),
  createTableWithReference(knex, tableNames.phylum, tableNames.kingdom),
  createTableWithReference(knex, tableNames.class, tableNames.phylum),
  createTableWithReference(knex, tableNames.order, tableNames.class),
  createTableWithReference(knex, tableNames.family, tableNames.order),
  createTableWithReference(knex, tableNames.genus, tableNames.family),
  createTableWithReference(knex, tableNames.species, tableNames.genus),
  ]);

};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.taxa,
    tableNames.species,
    tableNames.genus,
    tableNames.family,
    tableNames.order,
    tableNames.class,
    tableNames.phylum,
    tableNames.kingdom,
    tableNames.domain
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
}