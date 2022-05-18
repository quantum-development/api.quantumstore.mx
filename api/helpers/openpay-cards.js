/**
 * openpay-cards
 *
 * @module      :: Helper
 * @description :: Simple helper to validate type field
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
const create = require('../openpay/cards/create');
const deleteCard = require('../openpay/cards/delete');
const find = require('../openpay/cards/find');

module.exports = {
  friendlyName: 'Openpay card actions',
  description: 'Operations with cards on openpay',
  inputs: {
    cardData: {
      type: 'json',
      description: 'Card Data',
      required: true
    },
    cardAction: {
      type: 'string',
      description: 'Card Action',
      required: true
    }
  },
  exits: {},
  fn: async function (inputs, exits) {
    let res = false;
    const cardData = inputs.cardData;
    switch (inputs.cardAction) {
      case 'delete':
        res = await deleteCard(cardData.customerId, cardData.cardId);
        break;
      case 'find':
        res = await find(cardData.customerId);
        break;
      default:
        // console.log("controllers/helpers/openpay-cards.js", "exits", exits);
        const card = _.omit(cardData, ['customerId']);
        try {
          res = await create(cardData.customerId, card);
          // console.log("controllers/helpers/openpay-cards.js", "create", res);
        } catch (e) {
          // console.log("controllers/helpers/openpay-cards.js", "try catch e", e);
          return exits.error(e);
        }
        break;
    }
    return exits.success(res);
  }
};
