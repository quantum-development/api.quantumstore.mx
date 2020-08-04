/**
 * settings.update
 *
 * @module      :: Policy
 * @description :: Simple policy to validate update setting
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = (req, res, next) => {
  /**
   * id
   * Shouldn´t update setting without value
   * Shouldn´t update setting with string value
   * Shouldn´t update setting with value less than 2 chars
   * Shouldn´t update setting with value more than 200 chars
   */
  if (!req.body.value || !_.isString(req.body.value)) {
    return res.badRequest(
      {},
      {
        message: 'The Value is required'
      }
    );
  }

  /**
   * id
   * Shouldn´t update setting with value less than 2 chars
   * Shouldn´t update setting with value more than 200 chars
   */
  if (req.body.value.length < 2 || req.body.value.length > 200) {
    return res.badRequest(
      {},
      {
        message: 'The Value must be 2 to 200 chars'
      }
    );
  }

  return next();
};
