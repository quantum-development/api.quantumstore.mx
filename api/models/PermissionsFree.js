/**
 * Permissions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    url: {
      type: 'string',
      required: true
    },
    method: {
      type: 'string',
      required: true
    },
    module: {
      type: 'string',
      allowNull: true
    },
    description: {
      type: 'string',
      allowNull: true
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    }
  }
};
