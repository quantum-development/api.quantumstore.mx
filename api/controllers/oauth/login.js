/**
 * Este metodo genera el registro de un nuevo usuario
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  let user = req.body.userInfo;

  // Validate the password
  const isValid = await sails.helpers.validatePassword(
    req.body.password,
    user.password
  );

  // Validate the times that user try to connect
  if (!isValid) {
    await sails.helpers.updateLockState(user);
    if (user.locked) {
      return res.forbidden(null, {
        message: 'The account is locked, wait 10 minutes before try againg'
      });
    }
    return res.forbidden(null, {
      message: 'User not authorized.'
    });
  }

  // Generate Token
  const token = await sails.helpers.generateToken(user);
  user.oauth = {
    token: token.token,
    expiresIn: '24h',
    type: 'Bearer'
  };

  //Delete all the tokens create
  await Tokens.update({
    idUser: user.id
  })
    .set({
      deleted: true
    })
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });

  // Save the Token data
  await Tokens.create({
    token: token.token,
    pwh: token.password,
    expiresIn: '24h',
    type: 'login',
    userAgent: req.headers['user-agent'],
    idUser: user.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  return res.ok(user);
};
