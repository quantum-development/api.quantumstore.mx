/**
 * destroy.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate card id
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();

  //verifiy if id exists
  if (!req.body.id || !_.isString(req.body.id) || req.body.id === 'undefined') {
    return res.badRequest(
      {},
      {
        message: 'The card is required or corrupted'
      }
    );
  }
  return next();
};
