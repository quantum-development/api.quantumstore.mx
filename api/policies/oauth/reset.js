/**
 * Oauth.reset
 *
 * @module      :: Policy
 * @description :: Simple policy to validate reset password
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
const passValidator = require('password-validator');
const passSchema = new passValidator();
passSchema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(); // Must have digits
module.exports = (req, res, next) => {
  /**
   * validate token
   * token should be required
   * token should be string
   */
  if (!req.body.token || !_.isString(req.body.token)) {
    return res.badRequest(
      {},
      {
        message: 'The Token is required'
      }
    );
  }

  /**
   * validate newpwd
   * newpwd should be required
   * newpwd should be string
   */
  if (!req.body.newpwd || !_.isString(req.body.newpwd)) {
    return res.badRequest(
      {},
      {
        message: 'The New Password is required'
      }
    );
  }

  /**
   * validate newpwd
   * newpwd should be valid
   */
  if (!passSchema.validate(req.body.newpwd)) {
    return res.badRequest(
      {},
      {
        message:
          'The New Password must be 8-20 chars and have to uppercase letters, lowercase letters and digits'
      }
    );
  }
  return next();
};
