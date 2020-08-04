/**
 * openpay-charge
 *
 * @module      :: Helper
 * @description :: Simple helper to validate type field
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
const create = require('../openpay/charges/create');
module.exports = {
  friendlyName: 'Openpay charge actions',
  description: 'Operations with charge on openpay',
  inputs: {
    customerId: {
      type: 'string',
      description: 'Customer Id',
      required: true
    },
    chargeData: {
      type: 'json',
      description: 'Charge Data',
      required: true
    },
    chargeAction: {
      type: 'string',
      description: 'Charge Action',
      required: true
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    let res = false;
    switch (inputs.chargeAction) {
      case 'charge':
        res = await create(inputs.customerId, inputs.chargeData);
        break;
      default:
        res = await create(inputs.customerId, inputs.chargeData);
        break;
    }
    return exits.success(res);
  }
};
