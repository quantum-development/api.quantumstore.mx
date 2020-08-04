/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findOne: async (req, res) => {
    let user = await Users.findOne({
      id: req.userInfo.id
    })
      .populate('roles')
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    return res.ok(user);
  }
};
