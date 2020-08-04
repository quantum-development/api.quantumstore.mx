/**
 * params.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate card parameters
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();

  /**
   * validate name
   * name should be required
   * name should be string
   * name should be length between 5 and 100 chars
   */
  if (!req.body.name || !_.isString(req.body.name)) {
    return res.badRequest(
      {},
      {
        message: 'The name is required or corrupted'
      }
    );
  }

  //validate the length of the string
  if (!_.inRange(req.body.name.length, 5, 101)) {
    return res.badRequest(
      {},
      {
        message: 'The name should be between 5 and 100 chars'
      }
    );
  }

  return next();
};
