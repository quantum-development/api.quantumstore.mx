const getOpenpay = require('../index');

module.exports = customerId => {
  return new Promise((resolve, _reject) => {
    const openpay = getOpenpay();
    openpay.customers.cards.list(customerId, {}, (error, cards) => {
      if (error) {
        resolve([]);
      }
      resolve(cards);
    });
  });
};
