// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../../src/constants/tableNames');
const genus = require('../../../src/constants/genus');

/**
* @param {Knex} knex
*/

const createGenusPromises = [];
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
    await knex(tableNames.family)
      .pluck('id')
      .where('name', taxa_parent)
      .then((parent_id) => {
        console.log('parent_id', parent_id)
        return knex(tableNames.genus)
        .insert({
            name: taxa.name,
            family_id: parent_id,
        })
        .onConflict('name')
        .ignore();
      })
  } catch (error) {
    console.log('error', error);
  }
}

exports.seed = async (knex) => {
  await mapTaxa(knex, genus, createGenusPromises);
  return Promise.all(createGenusPromises);
}