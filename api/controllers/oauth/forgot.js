/**
 * Este metodo genera el email para el cambio de contraseña
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  let user = await Users.findOne({
    email: req.body.email
  }).intercept(_err => {
    return res.badRequest(
      {},
      {
        message: `There an error on DB`
      }
    );
  });

  if (user) {
    // Generate temporal token
    const resetToken = uuidv3(user.email, uuidv3.URL);
    // Update Reset Token Info
    await Users.update({
      id: user.id
    })
      .set({
        resetToken: resetToken
      })
      .intercept(err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });

    //Create a sign to verificate user
    const payload = {
      id: user.id,
      rtkn: resetToken
    };

    let token = jwt.sign(payload, sails.config.custom.jwtSecret, {
      expiresIn: '1h'
    });

    await Tokens.create({
      token: token,
      rtkn: resetToken,
      expiresIn: '1h',
      type: 'reset',
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

    // encode el token para hacerlo url safe
    // token = base64url.encode(token);
    // Enviar Email con el reset token
    // if (user.emails[0].email) {
    //   const urlResetPassword =
    //     sails.config.custom.notifications.urlResetPassword;
    //   const payloadEmail = {
    //     to: user.emails[0].email,
    //     subject: `Restablecimiento de contraseña`,
    //     template: sails.config.custom.notifications.templateForgotPaswd, // NOSONAR
    //     vars: {
    //       name: user.firstName,
    //       action_url: `${urlResetPassword}/${token}`
    //     }
    //   };
    //   request({
    //     method: 'POST',
    //     uri: sails.config.custom.notifications.url + 'emails', // NOSONAR
    //     form: payloadEmail,
    //     headers: {
    //       'x-system': sails.config.custom.notifications.idSystem, // NOSONAR
    //       id: callId, // NOSONAR
    //       app: sails.config.custom.app, // NOSONAR
    //       version: sails.config.custom.version // NOSONAR
    //     }
    //   });
    // }
  }
  // Responder la peticion siempre
  return res.ok(null, {
    message: 'Check your email and follow instructions.'
  });
};
