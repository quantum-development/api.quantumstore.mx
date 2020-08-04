/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const customerFind = await Customers.findOne({
    idUser: req.userInfo.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  if (customerFind) {
    return res.badRequest(
      {},
      {
        message: `The customer can't created`
      }
    );
  }

  const customerData = {
    name: params.name,
    email: params.email,
    last_name: params.lastName,
    required_account: false
  };

  const customer = await sails.helpers.openpayCustomer(customerData, 'create');

  if (!customer) {
    return res.badRequest(
      {},
      {
        message: `The customer can't created`
      }
    );
  }

  // Customer creation
  const createCustomer = await Customers.create({
    customerId: customer.id,
    idUser: req.userInfo.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  }).fetch();

  return res.ok(createCustomer);
};
