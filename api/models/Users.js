/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcryptjs');

module.exports = {
  schema: true,
  attributes: {
    password: {
      type: 'string',
      required: true,
      allowNull: false
    },
    name: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    },
    lastName: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    },
    birthdate: {
      type: 'ref',
      columnType: 'datetime'
    },
    email: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    street: {
      type: 'string',
      required: true,
      maxLength: 200
    },
    district: {
      type: 'string',
      required: true,
      maxLength: 200
    },
    city: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    codpost: {
      type: 'string',
      required: true,
      maxLength: 10
    },
    phone: {
      type: 'string',
      allowNull: true
    },
    gender: {
      type: 'string',
      required: true,
      isIn: ['Female', 'Male', 'Other']
    },
    // Fields exclusive for oauth logic
    locked: {
      type: 'boolean',
      defaultsTo: false
    },
    passwordFailures: {
      type: 'number',
      defaultsTo: 0
    },
    emailVerificated: {
      type: 'number',
      defaultsTo: 0
    },
    lastPasswordFailure: {
      type: 'ref',
      columnType: 'datetime'
    },
    resetToken: {
      type: 'string',
      allowNull: true
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    },
    // Associations
    settings: {
      collection: 'Settings',
      via: 'idUser'
    },
    roles: {
      collection: 'UsersRoles',
      via: 'idUser'
    }
  },
  customToJSON: function () {
    return _.omit(this, [
      'password',
      'locked',
      'passwordFailures',
      'lastPasswordFailure',
      'resetToken'
    ]);
  },

  beforeCreate: (user, next) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    return next(false, user);
  },

  beforeUpdate: (user, next) => {
    if (user.hasOwnProperty('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      return next(false, user);
    } else {
      return next(null, user);
    }
  }
};
