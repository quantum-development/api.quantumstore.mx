/**
 * categoryItem
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated email
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();
  /**
   * validate idUser
   * idUser should be required
   * idUser should be string
   */
  req.body.idUser = _.isString(req.body.idUser)
    ? parseInt(req.body.idUser)
    : req.body.idUser;
  if (!_.isNumber(req.body.idUser)) {
    return res.badRequest(
      {},
      {
        message: 'The idUser is required'
      }
    );
  }

  /**
   * validate fingerPrint
   * fingerPrint should be required
   * fingerPrint should be string
   */
  if (!req.body.fingerPrint || !_.isString(req.body.fingerPrint)) {
    return res.badRequest(
      {},
      {
        message: 'The fingerPrint is required'
      }
    );
  }

  return next();
};
