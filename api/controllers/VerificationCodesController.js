/**
 * VerificationCodesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  expired: async (req, res) => {
    const code = await VerificationCodes.update({
      id: req.body.id
    })
      .set({
        expired: 1
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
    return res.ok(code);
  }
};
