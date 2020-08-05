/**
 * Prices.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    label: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 150
    },
    price: {
      type: 'number',
      defaultsTo: 0,
      allowNull: false
    },
    description: {
      type: 'string',
      required: false,
      minLength: 2
    },
    external_purchase: {
      type: 'string',
      required: false,
      minLength: 2,
      maxLength: 250
    },
    purchaseoptions: {
      collection: 'PricesPurchaseOptions',
      via: 'idPrice'
    },
    idItem: {
      model: 'Items'
    }
  }
};
