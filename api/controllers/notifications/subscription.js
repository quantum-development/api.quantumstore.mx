/**
 *  Subcriptions Contact
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();

  const subscriptionParams = {
    email: params.email
  };

  // Card creation
  const subscriptionContact = await Subscriptions.create(subscriptionParams)
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();

  return res.ok(subscriptionContact);
};
