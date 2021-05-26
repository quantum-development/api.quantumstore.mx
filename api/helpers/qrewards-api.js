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
        data: {
            type: 'json',
            required: false
        },
        promo_id: {
            type: 'number',
            required: false
        }
    },

    exits: {},

    fn: async function(inputs, exits) {
        const client = sails.config.custom.reward_provider.client_slug;
        const process = {
            demo: sails.config.custom.reward_provider.demo,
            client,
            site_webservice: "1",
            digital_id: inputs.digital_id,
            digital_limit: inputs.digital_limit,
            wb_limit: inputs.digital_limit,
            promo_id: inputs.promo_id,
            rchrg_cellphone: '',
            rchrg_amount: '',
            rchrg_company: '',
            ...inputs.data
        };

        const userData = await fetch(`${sails.config.custom.reward_provider.url}sites/auth/webservice`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(process)
            }).then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    return res.data;
                } else {
                    // throw res.error.description;
                    throw "Error API logging";
                }
            })
            .catch(function(error) {
                throw 'error to api response';

            });

        const rewards = await fetch(`${sails.config.custom.reward_provider.url}sites/download/webservice?client=${client}`, {
                method: "GET",
                headers: {
                    'X-API-KEY': userData.token
                }
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {

                    return res.data;
                } else {
                    throw "Error API getting reward";
                }
            })
            .catch(function(error) {
                console.error(error);
                throw error.data.error.description;
                // throw 'error to api response';
            });

        console.log('REWARDS_API', userData, rewards);

        return exits.success({
            user: userData,
            rewards
        });
    }
};