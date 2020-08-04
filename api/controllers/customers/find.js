/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const customerData = {
    customerId: req.customer.customerId
  };

  const customer = await sails.helpers.openpayCustomer(customerData, 'find');

  if (!customer) {
    return res.notFound(
      {},
      {
        message: `The customer doesn't exits`
      }
    );
  }

  return res.ok(customer);
};
