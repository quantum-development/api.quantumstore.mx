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
      expiresIn: '48h'
    });

    await Tokens.create({
      token: token,
      rtkn: resetToken,
      expiresIn: '48h',
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
    token = base64url.encode(token);
    // Enviar Email con el reset token
    if (user.email) {
      const send = await sails.helpers.sendEmail(
        'email',
        {
          From: 'Lánzate al Mundial',
          To: user.email,
          NameTo: user.name,
          Subject: 'Recuperación de contraseña',
          // "TextBody": "Hello dear Postmark user.",
          HtmlBodyTemplate: `forgot_password`,
          Data: {
            TEMPORALPASSWORD: token,
            USER_NAME: user.name,
            USER_EMAIL: user.email
          }
          // "MessageStream": "outbound"
        },
        {}
      );
      return res.ok(null, {
        message: 'Check your email and follow instructions.'
      });
    }
  }
  // Responder la peticion siempre
  return res.ok(null, {
    message: 'Check your email and follow instructions.'
  });
};
