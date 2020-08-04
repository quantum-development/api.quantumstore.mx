/**
 * images.js
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
    order: {
      type: 'number',
      required: true
    },
    size: {
      type: 'string',
      required: true
    },
    src: {
      type: 'string',
      required: true
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
