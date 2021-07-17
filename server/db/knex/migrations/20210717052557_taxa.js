// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
/**
 * @param {Knex} knex
*/
const tableNames = require('../../../src/constants/tableNames');
const {
  addDefaultColumns,
  references,
} = require('../../../src/lib/tableUtils');

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.taxa, (table) => {
    table.increments().notNullable().unique();
    addDefaultColumns(table);
    table.integer('inat_id').unique();
    table.string('taxonID').unique();
    table.integer('parentNameUsageID').unique();
    references(table, tableNames.kingdom);
    references(table, tableNames.phylum);
    references(table, tableNames.class);
    references(table, tableNames.order);
    references(table, tableNames.family);
    references(table, tableNames.genus);
    references(table, tableNames.species);
    table.string('infraspecificEpithet');
    table.string('modified');
    table.string('scientificName');
    table.string('taxonRank');
    table.string('reference_url');
  });
};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.taxa
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
}