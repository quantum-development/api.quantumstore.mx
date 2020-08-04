/**
 * Este metodo el cambio de contraseña de un usuario
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const params = req.allParams();
  //Check username  token
  if (req.userInfo.username !== params.username) {
    return res.forbidden();
  }
  // Verify if the passwords are the same
  const isValid = await sails.helpers.validatePassword(
    params.password,
    req.userInfo.password
  );
  if (!isValid) {
    return res.badRequest(
      {},
      {
        message: `The password isn't valid.`
      }
    );
  }

  // password
  let userUpdated = await Users.update({
    id: req.userInfo.id
  })
    .set({
      password: params.newPassword,
      resetToken: null,
      passwordFailures: 0
    })
    .fetch()
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });

  //Get token
  userUpdated = userUpdated[0];
  const token = await sails.helpers.generateToken(userUpdated);
  userUpdated.oauth = {
    token: token.token,
    expiresIn: '24h',
    type: 'Bearer'
  };

  // Update Token
  await Tokens.update({
    id: req.userInfo.tokenId
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

  // Token creation
  await Tokens.create({
    token: token.token,
    pwh: token.password,
    expiresIn: '24h',
    type: 'change',
    userAgent: req.headers['user-agent'],
    idUser: userUpdated.id
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });
  return res.ok(userUpdated);
};
