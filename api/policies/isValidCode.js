/**
 * codes.validate
 *
 * @module      :: Policy
 * @description :: Simple policy to validate verification code
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /**
   * objectType
   * required
   * must be string
   * must be a specific type
   */
  if (_.isUndefined(req.body.objectType)) {
    return res.badRequest(
      {},
      {
        message: 'The type of code is required'
      }
    );
  } else if (!_.isString(req.body.objectType)) {
    return res.badRequest(
      {},
      {
        message: 'The type of code is corrupted'
      }
    );
  } else if (
    !_.contains(
      sails.config.custom.TYPES_VERIFICATIONCODES,
      req.body.objectType
    )
  ) {
    return res.badRequest(
      {},
      {
        message: 'The type of code isn´t valid'
      }
    );
  }
  /**
   * code
   * required
   * must be string
   */
  if (_.isUndefined(req.body.code)) {
    return res.badRequest(
      {},
      {
        message: 'The code is required'
      }
    );
  } else if (!_.isString(req.body.code)) {
    return res.badRequest(
      {},
      {
        message: 'The code is corrupted'
      }
    );
  }

  // Validations by objectType
  let message;
  switch (req.body.objectType) {
    case 'phone':
      if (req.phone.verified) {
        message = 'The phone was verify';
      }
  }
  if (message) {
    return res.badRequest(
      {},
      {
        message: message
      }
    );
  }

  // Get code
  const code = await VerificationCodes.findOne({
    objectType: req.body.objectType,
    code: req.body.code
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  // Verify code
  if (!code) {
    return res.notFound();
  } else if (code.expired) {
    return res.forbidden();
  }
  req.code = code;

  return next();
};
