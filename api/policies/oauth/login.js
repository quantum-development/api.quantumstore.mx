/**
 * Oauth.register
 *
 * @module      :: Policy
 * @description :: Simple policy to validate login
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /*******************
   * EMAIL
   ********************/
  // Shouldn´t login user without email
  // Shouldn´t login user with empty email
  if (!req.body.email) {
    return res.badRequest(
      {},
      {
        message: 'The email is required'
      }
    );
  }

  // Shouldn´t login user with invalid email
  const user = await Users.findOne({
    email: req.body.email
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });
  if (!user) {
    return res.forbidden(
      {},
      {
        message: 'User not authorized'
      }
    );
  }

  req.body.userInfo = user;
  /*******************
   * PASSWORD
   ********************/
  // Shouldn´t login user without password
  // Shouldn´t login user with empty password
  if (!req.body.password) {
    return res.badRequest(
      {},
      {
        message: 'The password is required'
      }
    );
  }
  return next();
};
