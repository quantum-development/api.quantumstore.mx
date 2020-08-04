/**
 * findOne.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate params to findOne layout
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();
  if (req.body.idUser) {
    req.body.id = req.body.idUser;
  }
  const user = await Users.findOne({
    id: req.body.id,
    deleted: false
  });
  if (!user) {
    return res.badRequest(
      {},
      {
        message: 'The user isn´t valid'
      }
    );
  }

  req.user = user;

  return next();
};
