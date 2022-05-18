const getOpenpay = require('../index');

module.exports = (customer, charge) => {
  return new Promise((resolve, reject) => {
    const openpay = getOpenpay();
    openpay.customers.charges.create(customer, charge, (error, charge) => {
      if (error) {
        // console.log("controllers/openpay/charges/create.js", "error", error);
        reject(error.description);
      }
      resolve(charge);
    });
  });
};
