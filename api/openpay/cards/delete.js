const getOpenpay = require('../index');

module.exports = (customerId, cardId) => {
  return new Promise((resolve, _reject) => {
    const openpay = getOpenpay();
    openpay.customers.cards.delete(customerId, cardId, error => {
      if (error) {
        resolve(false);
      }
      resolve(true);
    });
  });
};
