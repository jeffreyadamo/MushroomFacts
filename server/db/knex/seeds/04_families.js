// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../../src/constants/tableNames');
const families = require('../../../src/constants/family');

/**
* @param {Knex} knex
*/

const createFamilyPromises = [];
const mapTaxa = (knex, taxa, promiseArr) => {
  taxa.forEach((taxa) => {
    console.log('taxa', taxa.name, 'parent', taxa.parent)
    if (taxa.name != '') {
      promiseArr.push(createTaxa(knex, taxa, taxa.parent))
    }
  })
};

const createTaxa = async (knex, taxa, taxa_parent) => {
  try {
    await knex(tableNames.order)
      .pluck('id')
      .where('name', taxa_parent)
      .then((parent_id) => {
        console.log('parent_id', parent_id)
        return knex(tableNames.family)
        .insert({
            name: taxa.name,
            order_id: parent_id,
        })
        .onConflict('name')
        .ignore();
      })
  } catch (error) {
    console.log('error', error);
  }
}

exports.seed = async (knex) => {
  await mapTaxa(knex, families, createFamilyPromises);
  return Promise.all(createFamilyPromises);
}