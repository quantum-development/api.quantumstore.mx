/**
 * Contacts.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 150
    },
    email: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    subject: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    message: {
      type: 'string',
      required: true,
      maxLength: 300
    }
  }
};
