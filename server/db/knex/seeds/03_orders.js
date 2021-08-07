// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../../src/constants/tableNames');
const orders = require('../../../src/constants/order');

/**
* @param {Knex} knex
*/

const createOrderPromises = [];
const mapTaxa = (knex, taxa, promiseArr) => {
  taxa.forEach((taxa) => {
    console.log('taxa', taxa.name, 'parent', taxa.parent)
    if (taxa.name != '') {
      promiseArr.push(createTaxa(knex, taxa, taxa.parent))
    }
  })
};

const createTaxa = async (knex, taxa, taxa_parent) => {
  try {
    await knex(tableNames.class)
      .pluck('id')
      .where('name', taxa_parent)
      .then((parent_id) => {
        console.log('parent_id', parent_id)
        return knex(tableNames.order)
        .insert({
            name: taxa.name,
            class_id: parent_id,
        })
          .onConflict('name')
          .ignore();
        
      })
  } catch (error) {
    console.log('error', error);
  }
}
// const mapOrder = (knex, orders) => {
//   orders.forEach((orders) => {
//     const orders_parent = orders.parent;
//     if (orders.name != '') {
//       console.log('class_name', orders_parent);
//       createOrderPromises.push(createOrder(knex, orders, orders_parent));
//     }
//   })
// };

// const createOrder = async (knex, orders, classes) => {
//   console.log({
//     "order": orders.name,
//     "class": classes,
//   })
//   try {
//     await knex(tableNames.class)
//       .pluck('id')
//       .where('name', classes)
//       .then((class_id) => {
//         console.log(`${orders.name}'s class is ${classes} and the class_id is ${class_id}`);
//         return knex(tableNames.order)
//           .insert({
//             name: orders.name,
//             class_id
//           })
//           .onConflict('name')
//           .ignore();
//       });

//   } catch (error) {
//     console.log('error', error);
//   }
// };



exports.seed = async (knex) => {
  // await mapOrder(knex, orders);
  // return Promise.all(createOrderPromises);
  await mapTaxa(knex, orders, createOrderPromises);
  return Promise.all(createOrderPromises);
}