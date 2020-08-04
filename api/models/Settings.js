/**
 * Settings.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    field: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      required: true
    },
    value: {
      type: 'string',
      required: true,
      minLength: 2
      //maxLength: 254
    },
    isPrivate: {
      type: 'boolean',
      defaultsTo: false
    },
    // Foreign keys
    idUser: {
      model: 'Users',
      required: true
    }
  }
};
