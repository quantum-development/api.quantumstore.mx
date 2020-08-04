/**
 * Roles.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    },
    // Foreign keys
    idUsersRole: {
      collection: 'UsersRoles',
      via: 'idRole'
    },
    // Associations
    idPermissionsRol: {
      collection: 'PermissionsRoles',
      via: 'idRole'
    }
  }
};
