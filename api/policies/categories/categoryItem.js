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
   * validate idCategory
   * idCategory should be required
   * idCategory should be string
   */
  if (!req.body.idCategory || !_.isNumber(req.body.idCategory)) {
    return res.badRequest(
      {},
      {
        message: 'The idCategory is required'
      }
    );
  }

  /**
   * validate idItem
   * idItem should be required
   * idItem should be string
   */
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
