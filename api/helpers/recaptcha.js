module.exports = {
  friendlyName: 'ReCaptcha validation',
  description: '',
  inputs: {
    recaptchaResponse: {
      type: 'string',
      description: 'Recaptcha response request from frontend.',
      required: true
    },
    remoteAddress: {
      type: 'string',
      description: 'Remote Address.',
      required: false
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    let res = false;
    try {
      const verificationUrl =
        `${sails.config.custom.recaptcha.url}?secret=` +
        [
          `${sails.config.custom.recaptcha.secretKey}`,
          `response=${inputs.recaptchaResponse}`,
          `remoteip=${inputs.remoteAddress}`
        ].join('&');
      res = request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
          return true;
        }
        return false;
      });
    } catch (error) {
      console.error('Error recaptcha', error);
      res = false;
    }
    return exits.success(res);
  }
};
