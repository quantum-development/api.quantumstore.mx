/**
 * UsersRoles.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    // Foreign keys
    idUser: {
      model: 'Users',
      required: true
    },
    // Associations
    idRole: {
      model: 'Roles',
      required: true
    }
  }
};
