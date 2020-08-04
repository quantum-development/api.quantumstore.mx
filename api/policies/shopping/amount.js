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
   * validate amount
   * amount should be required
   * amount should be string
   */
  req.body.amount = _.isString(req.body.amount)
    ? parseFloat(req.body.amount)
    : req.body.amount;
  if (!req.body.amount || !_.isNumber(req.body.amount)) {
    return res.badRequest(
      {},
      {
        message: 'The amount is required'
      }
    );
  }

  /**
   * validate amount
   * amount should be > 0
   */
  if (!req.body.amount > 0) {
    return res.badRequest(
      {},
      {
        message: 'The amount is invalid'
      }
    );
  }

  /**
   * validate price
   * price should be required
   * price should be string
   */
  req.body.price = _.isString(req.body.price)
    ? parseFloat(req.body.price)
    : req.body.price;
  if (!req.body.price || !_.isNumber(req.body.price)) {
    return res.badRequest(
      {},
      {
        message: 'The price is required'
      }
    );
  }

  /**
   * validate price
   * price should be > 0
   */
  if (!req.body.price > 0) {
    return res.badRequest(
      {},
      {
        message: 'The price is invalid'
      }
    );
  }

  return next();
};
