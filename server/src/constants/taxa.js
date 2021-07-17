const Papa = require('papaparse');
const csvData = require('./csvData');

const taxa = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

console.log("raw data", taxa.data);

taxa.data = taxa.data.map(({ taxonRank }) => ({
  taxonRank
}));

console.log("mapped data", taxa.data);