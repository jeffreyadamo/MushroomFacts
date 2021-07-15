/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '../../db/knex/seeds/taxaExample.csv'),
  'utf8',
);

const families = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = families.data.map(({
  family,
}) => ({
  name: family
}));