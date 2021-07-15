const addDefaultColumns = (table) => {
  table.timestamps(false, true); // adds 'created_at' & 'updated_at'
  table.datetime('deleted_at');
}

const createTable = (knex, table_name) => {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 50).notNullable().unique();
    addDefaultColumns(table);
});
}

const createTableWithReference = (knex, table_name, reference_table) => {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable().unique();
    table.string('name', 50).notNullable().unique();
    references(table, reference_table);
    addDefaultColumns(table);    
});
}

const references = (table, tableName) => {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
}

module.exports = {
  addDefaultColumns,
  createTable,
  createTableWithReference,
  references
}