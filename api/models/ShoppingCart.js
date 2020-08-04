/**
 * ShoppingCart.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    idUser: {
      model: 'Users'
    },
    data: {
      type: 'string',
      required: true
    },
    total: {
      type: 'number',
      defaultsTo: 0,
      allowNull: false
    },
    fingerprint: {
      type: 'string',
      required: true
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    },
    finished: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
