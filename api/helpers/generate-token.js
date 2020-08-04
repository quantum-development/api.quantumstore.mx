/**
 * generateToken
 *
 * @module      :: Helper
 * @description :: Simple helper to generate new token
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
const jwt = require('jsonwebtoken');
const farmhash = require('farmhash');

module.exports = {
  friendlyName: 'Generate token',

  description: '',

  inputs: {
    user: {
      type: 'ref',
      required: true
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    // Password hash helps to invalidate token when password is changed
    const passwordHash = farmhash.hash32(inputs.user.password);
    const payload = {
      id: inputs.user.id,
      pwh: passwordHash,
      key: sails.config.custom.jwtKey
    };
    const token = jwt.sign(payload, sails.config.custom.jwtSecret, {
      expiresIn: '24h'
    });
    const data = {
      token: token,
      password: passwordHash
    };

    // All done.
    return exits.success(data);
  }
};
