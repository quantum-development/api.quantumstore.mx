/**
 * validatePassword
 *
 * @module      :: Helper
 * @description :: Simple helper to validate password
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */

const bcrypt = require('bcryptjs');

module.exports = {
  friendlyName: 'Validate password',

  description: '',

  inputs: {
    sendPwd: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    const res = await bcrypt.compareSync(inputs.sendPwd, inputs.password);
    return exits.success(res);
  }
};
