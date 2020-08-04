/**
 * Tokens.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    token: {
      type: 'string',
      required: true
    },
    pwh: {
      type: 'string'
    },
    expiresIn: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      isIn: ['register', 'login', 'change', 'reset'],
      required: true
    },
    rtkn: {
      type: 'string'
    },
    userAgent: {
      type: 'string',
      required: true
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    },
    // Foreign keys
    idUser: {
      model: 'Users'
    }
  }
};
