/**
 * PermissionsViews.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    idUser: {
      model: 'Users',
      required: true
    },
    // Associations
    idRole: {
      model: 'Roles',
      required: true
    },
    url: {
      type: 'string',
      allowNull: true
    },
    method: {
      type: 'string',
      allowNull: true
    },
    username: {
      type: 'string',
      allowNull: true
    },
    role: {
      type: 'string',
      allowNull: true
    }
  }
};
