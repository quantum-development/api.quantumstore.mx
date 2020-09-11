/**
 * Orders.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    subtotal: {
      type: 'number',
      defaultsTo: 0,
      allowNull: false
    },
    total: {
      type: 'number',
      defaultsTo: 0,
      allowNull: false
    },
    social: {
      type: 'string',
      required: false
    },
    rfc: {
      type: 'string',
      required: false
    },
    status: {
      type: 'string',
      isIn: ['cancel', 'waiting_for_payment', 'payed', 'delivered'],
      defaultsTo: 'waiting_for_payment'
    },
    openpay: {
      type: 'string',
      required: false
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    },
    idUser: {
      model: 'Users'
    },
    idShoppingCart: {
      model: 'ShoppingCart'
    }
  }
};
