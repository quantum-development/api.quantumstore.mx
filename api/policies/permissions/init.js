/**
 * init.js
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated system
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  return next();
};
