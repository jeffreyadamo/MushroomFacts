// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const tableNames = require('../../../src/constants/tableNames');
const orderedTableNames = require('../../../src/constants/orderedTableNames');
/**
 * @param {Knex} knex
*/

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  // ===========================================================
  // Drop data in table without deleting tables before seeding new or repeat data
  // This will drop the tables in order asycronously
  await orderedTableNames
    .reduce(async (promise, table_name) => {
      await promise;
      // eslint-disable-next-line no-console
      console.log('Clearing', table_name);
      return knex(table_name).del();
    }, Promise.resolve());
  // alternatively...
  // await Promise.all(
  //   orderedTableNames.map((table_name) => knex(table_name).del()),
  // );
  // ===========================================================
  // Example of if inserting data:
  // await knex(tableNames.department).insert(departments);
  const domains = [
    {name: "Bacteria" },
    {name: "Archaea" },
    {name: "Eukaryota" },
  ]

    const [createdDomains] = await knex(tableNames.domain).insert(domains);

  console.log("Domains created", { createdDomains });

}