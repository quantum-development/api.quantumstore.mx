/**
 * Oauth.register
 *
 * @module      :: Policy
 * @description :: Simple policy to validate register
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
   * validate password
   * password shouldn't register user if password isn´t Alphanumeric
   * password should be string
   */
  if (!passSchema.validate(req.body.password)) {
    return res.badRequest(
      {},
      {
        message:
          'The Password must be 8 to 20 chars and have to uppercase letters, lowercase letters and digits'
      }
    );
  }

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
   * validate username
   * username should be length between 6 to 100 chars
   */
  if (req.body.username.length < 6 || req.body.username.length > 100) {
    return res.badRequest(
      {},
      {
        message: 'The Username must be 6 to 100 chars'
      }
    );
  }
  return next();
};
