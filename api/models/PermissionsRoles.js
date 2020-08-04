/**
 * PermissionsRoles.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    idPermission: {
      model: 'Permissions',
      required: true
    },
    idRole: {
      model: 'Roles',
      required: true
    }
  }
};
