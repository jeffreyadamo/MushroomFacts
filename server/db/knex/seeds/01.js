// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../../src/constants/tableNames');
const orderedTableNames = require('../../../src/constants/orderedTableNames');
const kingdoms = require('../../../src/constants/kingdom');
const phylums = require('../../../src/constants/phylum');
// const classes = require('../../../src/constants/class');
// const orders = require('../../../src/constants/order');
// const families = require('../../../src/constants/family');
// const genus = require('../../../src/constants/genus');
// const species = require('../../../src/constants/species');
/**
 * @param {Knex} knex
*/


const createPhylumPromises = [];
const mapPhylum = (knex, phylums) => {
  phylums.forEach((phylums) => {
    const phylum_parent = phylums.kingdom_name;
    if (phylums.name != '') {
      console.log('kingdom_name', phylum_parent);
      createPhylumPromises.push(createPhylum(knex, phylums, phylum_parent));
    }    
  });
}

const createPhylum = async (knex, phylum, kingdom) => {
  console.log({
    "phylum": phylum.name,
    "kingdom": kingdom,
  })
  try {
    await knex(tableNames.kingdom)
      .pluck('id')
      .where('name', kingdom)
      .then((kingdom_id) => {
        console.log(`${phylum.name}'s kingdom_name is ${kingdom} and the kingdom_id is ${kingdom_id}`);
        return knex(tableNames.phylum)
          .insert({
            name: phylum.name,
            kingdom_id: kingdom_id
          })
          .onConflict('name')
          .ignore();
      });

  } catch (error) {
    console.log('error', error);
  }
};

exports.seed = async (knex) => {
  console.log("Kingdoms object", kingdoms);
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

  const domains = [
    {name: "Bacteria" },
    {name: "Archaea" },
    {name: "Eukaryota" },
  ]

  const [createdDomains] = await knex(tableNames.domain).insert(domains);
  const [createdKingdoms] = await knex(tableNames.kingdom)
    .insert(kingdoms)
    .onConflict('name')
    .ignore();

  console.log('createdDomains', createdDomains);
  console.log('createdKingdoms', createdKingdoms);
 


  await mapPhylum(knex, phylums);

  return Promise.all(createPhylumPromises);



  // const [createdClasses] = await knex(tableNames.class)
  //   .insert(classes)
  //   .onConflict('name')
  //   .ignore();
  // const [createdOrders] = await knex(tableNames.order)
  //   .insert(orders)
  //   .onConflict('name')
  //   .ignore();
  // const [createdFamilies] = await knex(tableNames.family)
  //   .insert(families)
  //   .onConflict('name')
  //   .ignore();
  // const [createdGenus] = await knex(tableNames.genus)
  //   .insert(genus)
  //   .onConflict('name')
  //   .ignore();
  // const [createdSpecies] = await knex(tableNames.species)
  //   .insert(species)
  //   .onConflict('name')
  //   .ignore();
  // console.log("Domains created", { createdDomains });
  // console.log("Kingdoms created", { createdKingdoms });
  // console.log("Classes created", { createdClasses });
  // console.log("Orders created", { createdOrders });
  // console.log("Families created", { createdFamilies });
  // console.log("Genus created", { createdGenus });
  // console.log("Species created", { createdSpecies });



  // await knex(tableNames.phylum)
  //   .where('name', '')
  //   .del();
  // await knex(tableNames.class)
  //   .where('name', '')
  //   .del();
  // await knex(tableNames.order)
  //   .where('name', '')
  //   .del();
  // await knex(tableNames.family)
  //   .where('name', '')
  //   .del();
  // await knex(tableNames.genus)
  //   .where('name', '')
  //   .del();
  // await knex(tableNames.species)
  //   .where('name', '')
  //   .del();
  //   await knex(tableNames.class)
  //   .where('name', '')
  //   .del();
  //   await knex(tableNames.class)
  //   .where('name', '')
  //   .del();

}