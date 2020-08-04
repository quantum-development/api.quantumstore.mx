/**
 * Este metodo genera el cambio de contraseña
 * desde la petecion de un email
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const params = req.allParams();
  const token = base64url.decode(params.token);
  // Verify the token data
  jwt.verify(
    token,
    sails.config.custom.jwtSecret,
    {},
    async (err, tokenData) => {
      // Show forbidden if error
      if (err) {
        return res.forbidden();
      }
      const updatedUser = await Users.update({
        id: tokenData.id,
        resetToken: tokenData.rtkn
      })
        .set({
          resetToken: null,
          password: params.newpwd
        })
        .intercept(err => {
          return res.negotiate(err);
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
      if (!updatedUser[0]) {
        return res.badRequest(null, {
          message: 'Invalid token.'
        });
      }
      return res.ok(null, {
        message: 'The password has ben updated succesfuly.'
      });
    }
  );
};
