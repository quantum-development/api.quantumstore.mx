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
   * email shouldn't register user if email is taken
   *  email shouldn´t create email if email is taken
   */
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
  if (user) {
    return res.badRequest(
      {},
      {
        message: 'The Email is already taken.'
      }
    );
  }

  return next();
};
