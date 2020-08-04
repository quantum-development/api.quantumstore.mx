/**
 * Users.update
 *
 * @module      :: Policy
 * @description :: Simple policy to validate user update
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /**
   * validate default
   * default should be required
   * default should be string
   */
  if (!req.body.default || !_.isString(req.body.default)) {
    return res.badRequest(
      {},
      {
        message: 'The default is required'
      }
    );
  }
  return next();
};
