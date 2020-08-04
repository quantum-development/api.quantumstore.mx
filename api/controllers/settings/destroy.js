/**
 * Este metodo actualiza valores de un usuario
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  const params = req.allParams();
  await Settings.update({
    id: params.id
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
  return res.ok();
};
