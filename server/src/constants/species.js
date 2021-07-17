const Papa = require('papaparse');
const csvData = require('./csvData');

const species = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = species.data
  .map(({ specificEpithet }) => ({
    name: specificEpithet,
  }))
  .filter(
    (item, index, array) =>
      index === array.findIndex((t) => t.name === item.name && t.id === item.id)
  );
