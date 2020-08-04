const getOpenpay = require('../index');

module.exports = (customer) => {
  return new Promise((resolve, _reject) => {
    const openpay = getOpenpay();
    openpay.customers.get(customer, (error, customer) => {
      if (error) {
        resolve(false);
      }
      resolve(customer);
    });
  });
};
