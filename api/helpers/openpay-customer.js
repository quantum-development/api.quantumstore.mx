/**
 * openpay-customer
 *
 * @module      :: Helper
 * @description :: Simple helper to validate type field
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
const create = require('../openpay/customers/create');
const findOne = require('../openpay/customers/findOne');
module.exports = {
  friendlyName: 'Openpay customers actions',
  description: 'Operations with customers on openpay',
  inputs: {
    customerData: {
      type: 'json',
      description: 'Customer Data',
      required: true
    },
    customerAction: {
      type: 'string',
      description: 'Customer Action',
      required: true
    }
  },
  exits: {},
  fn: async function (inputs, exits) {
    let res = false;
    const customerData = inputs.customerData;
    switch (inputs.customerAction) {
      case 'find':
        try {
          res = await findOne(customerData.customerId);
        } catch (e) {
          return exits.error(e);
        }
        break;
      case 'create':
        try {
          res = await create(customerData);
        } catch (e) {
          return exits.error(e);
        }
        break;
      default:
        return exits.error("Invalid action");
        break
    }
    return exits.success(res);
  }
};
