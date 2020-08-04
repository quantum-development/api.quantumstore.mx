const getOpenpay = require('../index');

module.exports = (customer) => {
  return new Promise((resolve, _reject) => {
    const openpay = getOpenpay();
    openpay.customers.create(customer, (error, customer) => {
      if (error) {
        resolve(false);
      }
      resolve(customer);
    });
  });
};
