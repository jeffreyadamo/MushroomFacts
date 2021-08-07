const Papa = require('papaparse');
const csvData = require('./csvData');

const orders = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

module.exports = orders.data
  .map(({ 
    order,
    className
   }) => ({
    name: order,
    parent: className,
  }))
  .filter(
    (item, index, array) =>
      index === array.findIndex((t) => t.name === item.name && t.id === item.id)
  );
