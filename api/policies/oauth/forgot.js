/**
 * Oauth.change
 *
 * @module      :: Policy
 * @description :: Simple policy to validate forgot password
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = (req, res, next) => {
  /*******************
   * EMAIL
   ********************/
  // Shouldn´t reset user without email
  // Shouldn´t reset user with empty email
  if (!req.body.email) {
    return res.badRequest(
      {},
      {
        message: 'The email is required'
      }
    );
  }
  return next();
};
