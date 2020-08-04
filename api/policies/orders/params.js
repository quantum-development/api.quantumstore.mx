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
   * validate rfc
   * rfc should be required
   * rfc should be string
   * rfc should be length only 13 chars
   */
  if (!req.body.rfc || !_.isString(req.body.rfc)) {
    return res.badRequest(
      {},
      {
        message: 'The rfc is required or corrupted'
      }
    );
  }

  //validate the length of the string
  if (!_.inRange(req.body.rfc.length, 10, 14)) {
    return res.badRequest(
      {},
      {
        message: 'The rfc should be between 10 and 13 chars'
      }
    );
  }
  /**
   * validate social
   * social should be required
   * social should be string
   */
  if (!req.body.social || !_.isString(req.body.social)) {
    return res.badRequest(
      {},
      {
        message: 'The social is required or corrupted'
      }
    );
  }

  /**
   * validate cardId
   * cardId should be required
   * cardId should be string
   */
  if (!req.body.cardId || !_.isNumber(req.body.cardId)) {
    return res.badRequest(
      {},
      {
        message: 'The cardId is required or corrupted'
      }
    );
  }

  /**
   * validate fingerPrint
   * fingerPrint should be required
   * fingerPrint should be string
   */
  if (!req.body.fingerprint || !_.isString(req.body.fingerprint)) {
    return res.badRequest(
      {},
      {
        message: 'The fingerprint is required'
      }
    );
  }

  return next();
};
