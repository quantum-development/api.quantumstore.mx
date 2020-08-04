/**
 * verificationCodes.findOne.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate id
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();
  const code = await VerificationCodes.findOne({
    // NOSONAR
    id: req.body.id
  });
  if (!code) {
    return res.badRequest(
      {},
      {
        message: 'The Verification Code isn´t valid'
      }
    );
  }
  return next();
};
