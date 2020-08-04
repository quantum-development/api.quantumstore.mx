/**
 * params
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated email
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();

  /**
   * validate deviceSesionId
   * deviceSesionId should be required
   * deviceSesionId should be string
   */
  if (!req.body.deviceSesionId || !_.isString(req.body.deviceSesionId)) {
    return res.badRequest(
      {},
      {
        message: 'The deviceSesionId is required or corrupted'
      }
    );
  }
  return next();
};
