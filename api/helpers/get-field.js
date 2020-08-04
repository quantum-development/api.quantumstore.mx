/**
 * validateField
 *
 * @module      :: Helper
 * @description :: Simple helper to get custom field
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
module.exports = {
  friendlyName: 'Get custom field',
  description: 'Get custom field from store microservices',
  inputs: {
    idStore: {
      type: 'string',
      description: 'store id',
      required: true
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    request.get(
      {
        url:
          sails.config.custom.stores.url +
          'registerscustomfields/' +
          inputs.idStore, //NOSONAR
        headers: {
          id: callId,
          app: sails.config.custom.app, // NOSONAR
          version: sails.config.custom.version // NOSONAR
        }
      },
      (error, response, body) => {
        let data = {
          success: false
        };
        if (body !== undefined) {
          body = JSON.parse(body);
          if (!body.data.cause) {
            data = {
              success: true,
              body: body.data
            };
          }
        }
        return exits.success(data);
      }
    );
  }
};
