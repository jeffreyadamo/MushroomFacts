/* eslint-disable no-undef */
const Papa = require('papaparse');
const csvData = require('./csvData')

const classes = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = classes.data.map(({
  className,
  phylum
}) => ({
  name: className,
  phylum_name: phylum,
}))
.filter(
  (item, index, array) =>
    index === array.findIndex((t) => t.name === item.name && t.id === item.id)
);