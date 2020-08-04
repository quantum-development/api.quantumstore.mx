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
   * validate subject
   * subject should be required
   * subject should be string
   */
  if (!req.body.subject || !_.isString(req.body.subject)) {
    return res.badRequest(
      {},
      {
        message: 'The subject is required'
      }
    );
  }

  /**
   * validate subject
   * subject should length between 5 to 150 chars
   */
  if (req.body.subject.length < 2 || req.body.subject.length > 100) {
    return res.badRequest(
      {},
      {
        message: 'The subject must be 5 to 150 chars'
      }
    );
  }

  /**
   * validate message
   * message should be required
   * message should be string
   */
  if (!req.body.message || !_.isString(req.body.message)) {
    return res.badRequest(
      {},
      {
        message: 'The message is required'
      }
    );
  }

  /**
   * validate message
   * message should length between 5 to 150 chars
   */
  if (req.body.message.length < 2 || req.body.message.length > 300) {
    return res.badRequest(
      {},
      {
        message: 'The message must be 5 to 150 chars'
      }
    );
  }

  return next();
};
