/**
 * Prices.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    price: {
      type: 'number',
      defaultsTo: 0,
      allowNull: false
    },
    idItem: {
      model: 'Items'
    }
  }
};
