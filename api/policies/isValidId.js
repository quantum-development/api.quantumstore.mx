/**
 * isValidId.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate id
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();
  if (
    _.isUndefined(req.body.id) ||
    _.isObject(req.body.id) ||
    req.body.id === 'undefined'
  ) {
    return res.badRequest();
  }
  return next();
};
