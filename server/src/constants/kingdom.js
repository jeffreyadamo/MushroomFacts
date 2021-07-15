/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '../../db/knex/seeds/taxaExample.csv'),
  'utf8',
);

const kingdoms = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = kingdoms.data.map(({
  kingdom,
}) => ({
  name: kingdom
}))