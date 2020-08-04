/**
 * Este metodo actualiza valores de un usuario
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();
  const setting = await Settings.update({
    id: params.id,
    idUser: req.userInfo.id
  })
    .set({
      value: params.value
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
  if (!setting.length) {
    return res.notFound(
      {},
      {
        message: 'There no setting to update'
      }
    );
  }
  return res.ok(setting);
};
