const getOpenpay = require('../index');

module.exports = (customer) => {
  return new Promise((resolve, reject) => {
    const openpay = getOpenpay();
    openpay.customers.create(customer, (error, customer) => {
      if (error) {
        reject(error.description);
      }
      resolve(customer);
    });
  });
};
