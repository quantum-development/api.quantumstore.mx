const getOpenpay = require('../index');

module.exports = (customerId, card) => {
  return new Promise((resolve, _reject) => {
    const openpay = getOpenpay();
    openpay.customers.cards.create(customerId, card, (error, card) => {
      if (error) {
        resolve(false);
      }
      resolve(card);
    });
  });
};
