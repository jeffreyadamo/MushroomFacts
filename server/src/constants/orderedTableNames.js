const tableNames = require('./tableNames');

// Bottom tables are the first to be made:last to be dropped
module.exports = [
  tableNames.species,
  tableNames.genus,
  tableNames.family,
  tableNames.class,
  tableNames.phylum,
  tableNames.kingdom,
  tableNames.domain,
];
