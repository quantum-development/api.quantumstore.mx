const getOpenpay = require('../index');

module.exports = (customerId, transactionId, refundRequest) => {
  return new Promise((resolve, _reject) => {
    const openpay = getOpenpay();
    openpay.customers.charges.refund(
      customerId,
      transactionId,
      refundRequest,
      (error, charge) => {
        if (error) {
          resolve(false);
        }
        resolve(charge);
      }
    );
  });
};
