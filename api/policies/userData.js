/**
 * Users.update
 *
 * @module      :: Policy
 * @description :: Simple policy to validate user update
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
   * name should be length between 2 to 100 chars
   */
  if (req.body.name.length < 2 || req.body.name.length > 100) {
    return res.badRequest(
      {},
      {
        message: 'The name must be 2 to 100 chars'
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
        message: 'The LastName is required'
      }
    );
  }

  /**
   * validate lastName
   * lastName should be length between 2 to 100 chars
   */
  if (req.body.lastName.length < 2 || req.body.lastName.length > 100) {
    return res.badRequest(
      {},
      {
        message: 'The LastName must be 2 to 80 chars'
      }
    );
  }

  /**
   * validate birthdate
   * birthdate should be required
   * birthdate should be string
   */
  if (!req.body.birthdate || !_.isString(req.body.birthdate)) {
    return res.badRequest(
      {},
      {
        message: 'The Birthdate is required'
      }
    );
  }

  /**
   * validate birthdate
   * birthdate should be valid
   */
  let dateCheck = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;
  let dateTest = dateCheck.test(req.body.birthdate);
  if (!dateTest) {
    return res.badRequest(
      {},
      {
        message: 'The Birthdate isn´t valid'
      }
    );
  }

  /**
   * validate phone
   * phone should be valid
   */
  if (req.body.phone && _.isString(req.body.phone)) {
    let phoneCheck = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let phoneTest = phoneCheck.test(req.body.phone);
    if (!phoneTest) {
      return res.badRequest(
        {},
        {
          message: 'The Phone isn´t valid'
        }
      );
    }
  } else if (req.body.phone && !_.isString(req.body.phone)) {
    return res.badRequest(
      {},
      {
        message: 'The Phone isn´t valid'
      }
    );
  }

  /**
   * validate gender
   * gender should be required
   * gender should be string
   */
  if (!req.body.gender || !_.isString(req.body.gender)) {
    return res.badRequest(
      {},
      {
        message: 'The Gender is required'
      }
    );
  }

  /**
   * validate gender
   * gender should be valid
   */
  if (!_.contains(sails.config.custom.ALLOW_GENDERS, req.body.gender)) {
    // NOSONAR
    return res.badRequest(
      {},
      {
        message: 'The Gender isn´t valid'
      }
    );
  }

  return next();
};
