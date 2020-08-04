/**
 * settings.destroy
 *
 * @module      :: Policy
 * @description :: Simple policy to validate destroy setting
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /**
   * id
   * Shouldn´t destroy setting without id
   * Shouldn´t destroy setting with empty id
   * Shouldn´t destroy setting with invalid id
   */
  req.body = req.allParams();
  if (!req.body.id || !_.isString(req.body.id)) {
    return res.badRequest(
      {},
      {
        message: 'The setting is required'
      }
    );
  }

  /**
   * validate settting
   * setting should be exits
   */
  const user = await Users.findOne({
    // NOSONAR
    id: req.userInfo.id
  })
    .populate('settings', {
      id: req.body.id
    })
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });
  if (!user.settings.length) {
    return res.badRequest(
      {},
      {
        message: 'The setting isn´t valid'
      }
    );
  }

  /**
   * validate setting
   * setting shouldn't delete if is private
   */
  if (user.settings[0].isPrivate) {
    return res.badRequest(
      {},
      {
        message: 'You can´t delete this setting because is private.'
      }
    );
  }

  return next();
};
