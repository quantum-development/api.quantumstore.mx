/**
 * qrewardsApi
 *
 * @module      :: Helper
 * @description :: Simple helper to generate new token
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */

module.exports = {
  friendlyName: 'Get rewards form api qrewards',

  description: '',

  inputs: {
    digital_id: {
      type: 'number',
      required: true
    },
    digital_limit: {
      type: 'number',
      required: true
    },
    promo_id: {
      type: 'number',
      required: true
    },
    data: {
      type: 'json',
      required: true
    },
    demo: {
      type: 'number',
      required: false
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    const process = {
      client: sails.config.custom.reward_provider.client_slug,
      site_webservice: 1,
      digital_id: inputs.digital_id,
      digital_limit: inputs.digital_limit,
      wb_limit: inputs.digital_limit,
      promo_id: inputs.promo_id,
      rchrg_cellphone: '',
      rchrg_amount: '',
      rchrg_company: '',
      name: inputs.data.name,
      info: inputs.data.info,
      email: inputs.data.name,
      demo: inputs.demo
    };
    let success = false;
    try {
      success = request.post(
        {
          json: true,
          url: `${sails.config.custom.reward_provider.url}/sites/auth/webservice`,
          form: process,
          headers: {}
        },
        function(error, response, body) {
          if (body.data !== undefined && !body.data) {
            return body.user;
          }
          return false;
        }
      );
    } catch (error) {
      console.error('Error send-email', error);
      success = false;
    }
    return exits.success(success);
  }
};
