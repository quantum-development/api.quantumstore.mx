/**
 * findOne.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate card find information
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  const customer = await Customers.findOne({
    idUser: req.userInfo.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  if (!customer) {
    return res.forbidden(null, {
      message: 'User not authorized.'
    });
  }

  req.customer = customer;
  return next();
};
