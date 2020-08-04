/**
 * isTheUsernameTaken
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated system
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  // Find if the userName exits
  const username = await Users.findOne({
    username: req.body.username
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });
  if (username) {
    return res.badRequest(
      {},
      {
        message: 'The Username is already taken.'
      }
    );
  }
  return next();
};
