// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
/**
 * @param {Knex} knex
*/
const tableNames = require('../../../src/constants/tableNames');

function addDefaultColumns(table) {
  table.timestamps(false, true); // adds 'created_at' & 'updated_at'
  table.datetime('deleted_at');
}

// function createTable(knex, table_name) {
//   knex.schema.createTable(table_name, (table) => {
//     table.increments().notNullable().unique();
//     table.string('name', 50).notNullable().unique();
//     addDefaultColumns(table);
// });
// }


function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
}
exports.up = async (knex) => {
  // await Promise.all([
  // createTable(knex, tableNames.life),
  // createTable(knex, tableNames.domain), 
  // createTable(knex, tableNames.kingdom),
  // createTable(knex, tableNames.phylum),
  // createTable(knex, tableNames.class),
  // createTable(knex, tableNames.family),
  // createTable(knex, tableNames.genus),
  // createTable(knex, tableNames.species),
  // ]);
  // await knex.schema.createTable(tableNames.life, (table) => {
  //    table.increments().notNullable().unique();
  //    table.string('name', 100).notNullable().unique();
  //    addDefaultColumns(table);
  //  });

  await knex.schema.createTable(tableNames.domain, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.kingdom, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
    references(table, tableNames.domain);
  });

  await knex.schema.createTable(tableNames.phylum, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
    references(table, tableNames.kingdom); 
  });

  await knex.schema.createTable(tableNames.class, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
    references(table, tableNames.phylum); 
  });

  await knex.schema.createTable(tableNames.family, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
    references(table, tableNames.class); 
  });

  await knex.schema.createTable(tableNames.genus, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
    references(table, tableNames.family); 
  });

  await knex.schema.createTable(tableNames.species, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 100).notNullable().unique();
    addDefaultColumns(table);
    references(table, tableNames.genus); 
  });


};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.species,
    tableNames.genus,
    tableNames.family,
    tableNames.class,
    tableNames.phylum,
    tableNames.kingdom,
    tableNames.domain,
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
}