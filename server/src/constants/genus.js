const Papa = require('papaparse');
const csvData = require('./csvData');

const genus = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = genus.data
  .map(({ 
    genus,
    family 
  }) => ({
    name: genus,
    parent: family
  }))
  .filter(
    (item, index, array) =>
      index === array.findIndex((t) => t.name === item.name && t.id === item.id)
  );
