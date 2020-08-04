/**
 * categoryItem
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated email
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /**
   * validate idItem
   * idItem should be required
   * idItem should be string
   */
  req.body.idItem = _.isString(req.body.idItem)
    ? parseInt(req.body.idItem)
    : req.body.idItem;
  if (!req.body.idItem || !_.isNumber(req.body.idItem)) {
    return res.badRequest(
      {},
      {
        message: 'The idItem is required'
      }
    );
  }

  return next();
};
