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
        message: 'The name is required'
      }
    );
  }

  /**
   * validate name
   * name should length between 2 to 100 chars
   */
  if (req.body.name.length < 2 || req.body.name.length > 100) {
    return res.badRequest(
      {},
      {
        message: 'The name must be 5 to 100 chars'
      }
    );
  }

  /**
   * validate lastName
   * lastName should be required
   * lastName should be string
   */
  if (!req.body.lastName || !_.isString(req.body.lastName)) {
    return res.badRequest(
      {},
      {
        message: 'The lastName is required'
      }
    );
  }

  /**
   * validate lastName
   * lastName should length between 2 to 100 chars
   */
  if (req.body.lastName.length < 2 || req.body.lastName.length > 100) {
    return res.badRequest(
      {},
      {
        message: 'The lastName must be 5 to 100 chars'
      }
    );
  }

  /**
   * validate email
   * email should be required
   * email should be string
   */
  if (!req.body.email || !_.isString(req.body.email)) {
    return res.badRequest(
      {},
      {
        message: 'The Email is required'
      }
    );
  }

  /**
   * validate email
   * email should length between 5 to 150 chars
   */
  if (req.body.email.length < 5 || req.body.email.length > 150) {
    return res.badRequest(
      {},
      {
        message: 'The Email must be 5 to 150 chars'
      }
    );
  }

  /**
   * validate email
   * email should be valid
   */
  let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let testEmail = regexEmail.test(req.body.email);
  if (!testEmail) {
    return res.badRequest(
      {},
      {
        message: 'The Email isn´t valid'
      }
    );
  }

  return next();
};
