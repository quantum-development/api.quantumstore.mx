const Openpay = require('openpay');

module.exports = () =>
  new Openpay(
    sails.config.custom.openpay.id,
    sails.config.custom.openpay.privateKey,
    sails.config.custom.openpay.production
  );
