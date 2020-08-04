/**
 * SettingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findByUser: async (req, res) => {
    const params = req.allParams();
    const settings = await Settings.find({
      idUser: params.idUser
    }).intercept(_err => {
      return res.badRequest(
        {},
        {
          message: `There an error on DB`
        }
      );
    });
    return res.ok(settings);
  }
};
