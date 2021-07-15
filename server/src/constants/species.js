/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '../../db/knex/seeds/taxaExample.csv'),
  'utf8',
);

const species = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = species.data.map(({
  specificEpithet,
}) => ({
  name: specificEpithet
}));