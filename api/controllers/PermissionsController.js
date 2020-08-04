/**
 * PermissionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    const token = await Tokens.findOne({
      where: {
        token: req.body.token,
        userAgent: req.headers['user-agent'],
        deleted: false
      }
    })
      .populate('idUser')
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    const logs = {
      req: req.body,
      headers: req.headers
    };

    if (token) {
      let permissionsUser;
      if (req.headers.idstore !== '') {
        permissionsUser = await PermissionsView.find({
          idUser: token.idUser.id,
          url: req.body.path,
          method: req.body.method
        }).intercept(_err => {
          return res.badRequest(
            {},
            {
              message: `There an error on DB`
            }
          );
        });
      } else {
        permissionsUser = await PermissionsView.find({
          idUser: token.idUser.id,
          url: req.body.path,
          method: req.body.method,
          idStore: null
        }).intercept(_err => {
          return res.badRequest(
            {},
            {
              message: `There an error on DB`
            }
          );
        });
      }
      if (!permissionsUser.length) {
        return res.forbidden(logs, {});
      }
      const data = {
        idUser: token.idUser.id,
        id: req.headers.id
      };
      return res.ok(data);
    } else {
      return res.forbidden(logs, {});
    }
  },
  init: async (req, res) => {
    let pathRegex = req.body.path;
    let path = pathRegex.replace(/\/v[0-9]{1}/, '');
    res.status(200).json({
      status: 'init Log',
      data: path
    });
  }
};
