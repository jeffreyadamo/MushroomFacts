/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const csvData = fs.readFileSync(
  path.join(__dirname, '../../db/knex/seeds/taxaExample.csv'),
  'utf8',
);

// const csvData = fs.readFileSync(
//   path.join(__dirname, '../../../../mushroom/taxa/taxa.csv'),
//   'utf8',
// );

module.exports = csvData;