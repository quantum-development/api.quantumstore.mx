const getOpenpay = require('../index');

module.exports = (customer, charge) => {
  return new Promise((resolve, _reject) => {
    const openpay = getOpenpay();
    openpay.customers.charges.create(customer, charge, (error, charge) => {
      if (error) {
        console.log(error);
        resolve(false);
      }
      resolve(charge);
    });
  });
};
