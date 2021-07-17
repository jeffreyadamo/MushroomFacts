const Papa = require('papaparse');
const csvData = require('./csvData');

const kingdoms = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = kingdoms.data
  .map(({ kingdom }) => ({
    name: kingdom,
  }))
  .filter(
    (item, index, array) =>
      index === array.findIndex((t) => t.name === item.name && t.id === item.id)
  );

// For each item in the array, perform a test to see if we need to filter it out. The test is: find the first matching object with the same name and id as the one we're testing. If the index of that found object is the same as the index of the one we're testing, let it through. If it's a different index (as in, we found a duplicate later on) discard it.
