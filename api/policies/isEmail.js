/**
 * isTheEmailTaken
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated email
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /**
   * validate email
   * email should be required
   * email should be string
   */
  if (!req.body.email || !_.isString(req.body.email)) {
    return res.badRequest(
      {},
      {
        message: 'The Email is required'
      }
    );
  }

  /**
   * validate email
   * email should length between 5 to 100 chars
   */
  if (req.body.email.length < 5 || req.body.email.length > 100) {
    return res.badRequest(
      {},
      {
        message: 'The Email must be 5 to 100 chars'
      }
    );
  }

  /**
   * validate email
   * email should be valid
   */
  let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let testEmail = regexEmail.test(req.body.email);
  if (!testEmail) {
    return res.badRequest(
      {},
      {
        message: 'The Email isn´t valid'
      }
    );
  }

  return next();
};
