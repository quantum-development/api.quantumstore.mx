const fetch = require("node-fetch");
/**
 * qrewardsApi
 *
 * @module      :: Helper
 * @description :: Simple helper to generate new token
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */

module.exports = {
  friendlyName: 'Get ike data',

  description: '',

  inputs: {
    data: {
      type: 'json',
      required: false
    }
  },

  exits: {},

  fn: async function(inputs, exits) {

   const accessToken = await fetch(`${sails.config.custom.ike_provider.authUrl}?grant_type=password`, {
      method: "POST",
      headers: {
        "Authorization": sails.config.custom.ike_provider.authBearer,
      },
    }).then((response) => response.json())
    .then((res) => {
      return res.access_token;
    })
    .catch(function(error) {
      throw 'error to ike response';
    });

    const insertAffi = await fetch(`${sails.config.custom.ike_provider.url}?Key-Id=IKE-020&key=hZt58XDDI4dFPuE2`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(inputs.data)
    }).then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch(function(error) {
      throw 'error to ike response';
    });
    console.log('IKE_API', accessToken, insertAffi);

    return exits.success(insertAffi);
  }
};
