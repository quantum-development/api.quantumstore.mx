/**
 * generateToken
 *
 * @module      :: Helper
 * @description :: Simple helper to generate new token
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
const jwt = require('jsonwebtoken');
// const farmhash = require('farmhash');

module.exports = {
  friendlyName: 'Generate verification key',

  description: '',

  inputs: {
    user: {
      type: 'ref',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    // const passwordHash = farmhash.hash32(inputs.user.password);
    const payload = {
      user: inputs.user.id,
      username: inputs.user.username,
      // pwh: passwordHash,
      key: sails.config.custom.jwtKey
    };
    const token = jwt.sign(payload, sails.config.custom.jwtSecret, {
      expiresIn: '3d'
    });
    const verification_url = `${sails.config.custom.app.web}verify-email?token=${token}`;
    console.log(verification_url);
    const send = await sails.helpers.sendEmail(
      'email',
      {
        "From": "QuantumStore",
        "To": inputs.user.email,
        "NameTo": inputs.user.name,
        "Subject": "Bienvenido a QuantumStore",
        // "TextBody": "Hello dear Postmark user.",
        "HtmlBodyTemplate": `verification_email`,
        "Data": {
          "VERIFICATIONLINK": verification_url,
          "VERIFICATIONCODE": token,
          "VERIFICATIONPAGE": `${sails.config.custom.app.web}verify-email`,
          "USER_NAME": inputs.user.name,
          "USER_LASTNAME": inputs.user.lastName,
          "USER_EMAIL": inputs.user.email,
          "USER_USERNAME": inputs.user.username,
        }
        // "MessageStream": "outbound"
      },
      {

      }
    );

    // All done.
    return exits.success(token);
  }
};
