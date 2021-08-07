// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../../src/constants/tableNames');
const classes = require('../../../src/constants/class');

/**
 * @param {Knex} knex
*/

const createClassPromises = [];
const mapClass = (knex, classes) => {
  classes.forEach((classes) => {
    const classes_parent = classes.phylum_name;
    if (classes.name != '') {
      console.log('class_name', classes_parent);
      createClassPromises.push(createClass(knex, classes, classes_parent));
    }
  })
};

const createClass = async (knex, classes, phylum) => {
  console.log({
    "class": classes.name,
    "phylum": phylum,
  })
  try {
    await knex(tableNames.phylum)
      .pluck('id')
      .where('name', phylum)
      .then((phylum_id) => {
        console.log(`${classes.name}'s phylum is ${phylum} and the phylum_id is ${phylum_id}`);
        return knex(tableNames.class)
          .insert({
            name: classes.name,
            phylum_id: phylum_id
          })
          .onConflict('name')
          .ignore();
      });

  } catch (error) {
    console.log('error', error);
  }
};

exports.seed = async (knex) => {
  await mapClass(knex, classes);
  return Promise.all(createClassPromises);
}