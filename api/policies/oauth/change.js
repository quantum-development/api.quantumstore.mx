/**
 * Oauth.change
 *
 * @module      :: Policy
 * @description :: Simple policy to validate change password
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
module.exports = async (req, res, next) => {
  /**
   * validate username
   * username should be required
   * username should be string
   */
  if (!req.body.username || !_.isString(req.body.username)) {
    return res.badRequest(
      {},
      {
        message: 'The Username is required'
      }
    );
  }

  /**
   * validate password
   * password should be required
   * password should be string
   */
  if (!req.body.password || !_.isString(req.body.password)) {
    return res.badRequest(
      {},
      {
        message: 'The Password is required'
      }
    );
  }

  /**
   * validate newpassword
   * newpassword should be required
   * newpassword should be string
   */
  if (!req.body.newPassword || !_.isString(req.body.newPassword)) {
    return res.badRequest(
      {},
      {
        message: 'The New Password is required'
      }
    );
  }

  /**
   * validate newpassword
   * newpassword shouldn´t register user if newPassword isn´t Alphanumeric
   */
  if (!passSchema.validate(req.body.newPassword)) {
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
