/**
 *  Create Openpay card
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  try {
    const customerFind = await Customers.findOne({
      idUser: req.userInfo.id
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
      customerId: req.userInfo.id,
      name: params.name,
      email: params.email,
      last_name: params.lastName,
      required_account: false
    };

    const customer = await sails.helpers.openpayCustomer(customerData, 'create');

    // Customer creation
    const createCustomer = await Customers.create({
      customerId: customer.id,
      idUser: req.userInfo.id
    }).fetch();

    return res.ok(createCustomer);

  } catch (e) {
    const error_message = `${e.raw || e.details || e}`;
    return res.badRequest(
      {},
      {
        message: `The customer can't created: ${error_message}`
      }
    );
  }
};
