/**
 * params
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated email
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /**
   * validate name
   * name should be required
   * name should be string
   */
  if (!req.body.name || !_.isString(req.body.name)) {
    return res.badRequest(
      {},
      {
        message: 'The Name is required'
      }
    );
  }

  /**
   * validate name
   * name should length between 5 to 150 chars
   */
  if (req.body.name.length < 2 || req.body.name.length > 150) {
    return res.badRequest(
      {},
      {
        message: 'The Name must be 5 to 150 chars'
      }
    );
  }

  /**
   * validate description
   * description should be required
   * description should be string
   */
  if (!req.body.description || !_.isString(req.body.description)) {
    return res.badRequest(
      {},
      {
        message: 'The description is required'
      }
    );
  }

  /**
   * validate description
   * description should length between 5 to 150 chars
   */
  if (req.body.description.length < 2 || req.body.description.length > 150) {
    return res.badRequest(
      {},
      {
        message: 'The description must be 5 to 150 chars'
      }
    );
  }

  /**
   * validate prices
   * prices should be required
   * prices should be string
   */
  if (!req.body.prices || !_.isArray(req.body.prices)) {
    return res.badRequest(
      {},
      {
        message: 'The Prices is required'
      }
    );
  }

  /**
   * validate prices
   * prices should length mora than 0
   */
  if (req.body.prices.length < 1) {
    return res.badRequest(
      {},
      {
        message: 'The Price be have a least one item '
      }
    );
  }

  /**
   * validate prices
   * prices should be numbers
   */
  req.body.prices.every(price => {
    if (!_.isNumber(price)) {
      return res.badRequest(
        {},
        {
          message: 'The Prices should be numbers'
        }
      );
    }
  });

  return next();
};
