const getOpenpay = require('../index');

module.exports = (customerId, card) => {
  return new Promise((resolve, reject) => {
    const openpay = getOpenpay();
    openpay.customers.cards.create(customerId, card, (error, card) => {
      if (error) {
        // console.log("controllers/openpay/cards/create.js", "error", error);
        reject(error.description);
      }
      resolve(card);
    });
  });
};
