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
   * USERNAME
   ********************/
  // Shouldn´t login user without username
  // Shouldn´t login user with empty username
  if (!req.body.username) {
    return res.badRequest(
      {},
      {
        message: 'The username is required'
      }
    );
  }

  // Shouldn´t login user with invalid username
  const user = await Users.findOne({
    or: [
      { username: req.body.username},
      { email: req.body.username }
    ]
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
