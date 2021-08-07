const Papa = require('papaparse');
const csvData = require('./csvData');

const phylums = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = phylums.data
  .map(({ 
    phylum, 
    kingdom 
  }) => ({
    name: phylum,
    kingdom_name: kingdom,
  }))
  .filter(
    (item, index, array) =>
      index === array.findIndex((t) => t.name === item.name && t.id === item.id)
  );
