module.exports = {
  friendlyName: 'Expired verify code',
  description: 'On this helper a specific code expired one time used',
  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    await VerificationCodes.update({
      id: inputs.id
    })
      .set({
        expired: 1
      })
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    return exits.success(true);
  }
};
