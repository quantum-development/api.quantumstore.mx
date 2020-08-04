const validateJSON = value => {
  try {
    return JSON.parse(value);
  } catch (e) {
    e = false;
    return e;
  }
};
/**
 * validPage.js
 *
 * @module      :: Policy
 * @description :: Simple policy to validate image create parameters
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  req.body = req.allParams();
  /**
   * validate page
   * page should be optional
   * page should be number
   */
  if (!_.isUndefined(req.body.page)) {
    req.body.page = parseInt(req.body.page);
    if (_.isNaN(req.body.page)) {
      return res.badRequest(
        {},
        {
          message: 'The page should be a number'
        }
      );
    }
  }

  /**
   * validate limit
   * limit should be optional
   * limit should be number
   */
  if (!_.isUndefined(req.body.limit)) {
    req.body.limit = parseInt(req.body.limit);
    if (_.isNaN(req.body.limit)) {
      return res.badRequest(
        {},
        {
          message: 'The limit should be a number'
        }
      );
    }
  }

  /**
   * validate where
   * where should be optional
   * where should be number
   */
  if (!_.isUndefined(req.body.where)) {
    req.body.where = validateJSON(req.body.where);
    if (!_.isObject(req.body.where)) {
      return res.badRequest(
        {},
        {
          message: 'The where params are invalid'
        }
      );
    }
  }


  // Asign default page and limit number
  req.body.page = req.body.page || sails.config.custom.PAGE_DEFAULT_NUMBER;
  req.body.limit = req.body.limit || sails.config.custom.LIMIT_DEFAULT_NUMBER;

  return next();
};
