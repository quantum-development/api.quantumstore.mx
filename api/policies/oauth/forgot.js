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
   * USERNAME
   ********************/
  // Shouldn´t reset user without username
  // Shouldn´t reset user with empty username
  if (!req.body.username) {
    return res.badRequest(
      {},
      {
        message: 'The username is required'
      }
    );
  }
  return next();
};
