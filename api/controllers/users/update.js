/**
 * Este metodo actualiza valores de un usuario
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();
  // prettier-ignore
  const user = await Users.update({// NOSONAR
    id: req.userInfo.id
  })
    .set({
      firstName: params.firstName,
      lastName: params.lastName,
      birthdate: params.birthdate,
      gender: params.gender,
      phone: params.phone
    })
    .intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    })
    .fetch();
  return res.ok(user[0]);
};
