const Papa = require('papaparse');
const csvData = require('./csvData');

const families = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = families.data
  .map(({ family }) => ({
    name: family,
  }))
  .filter(
    (item, index, array) =>
      index === array.findIndex((t) => t.name === item.name && t.id === item.id)
  );
