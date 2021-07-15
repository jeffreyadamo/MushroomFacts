/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '../../db/knex/seeds/taxaExample.csv'),
  'utf8',
);

const genus = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = genus.data.map(({
  genus,
}) => ({
  name: genus
}));