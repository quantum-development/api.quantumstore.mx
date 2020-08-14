/**
 * recaptcha
 *
 * @module      :: Helper
 * @description :: Simple helper to validate type field
 * @docs        :: https://sailsjs.com/documentation/concepts/helpers
 *
 */
const request = require('request');

module.exports = {
    friendlyName: 'Format welcome message',
    description: 'Return a personalized greeting based on the provided name.',


    inputs: {
        recaptchaResponse: {
            type: 'string',
            description: 'Recaptcha response request from frontend.',
            required: true
        },
        recaptchaUri: {
            type: 'string',
            description: 'Recaptcha response request from frontend.',
            required: true
        },
        secretKey: {
            type: 'string',
            description: 'Secret key.',
            required: true
        },
        remoteAddress: {
            type: 'string',
            description: 'Remote Address.',
            required: false
        },
    },
    fn: async function (inputs, exits) {
        // g-recaptcha-response is the key that browser will generate upon form submit.
        // if its blank or null means user has not selected the captcha, so return the error.
        if (inputs.recaptchaResponse === undefined || inputs.recaptchaResponse === '' || inputs.recaptchaResponse === null) {
            res = false;
        }
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = `${recaptchaUri}?secret=${secretKey}&response=${recaptchaResponse}&remoteip=${remoteAddress}`;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        res = await request(verificationUrl, function (error, response, body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if (body.success !== undefined && !body.success) {
                return false;
            }
            return true;
        });
        return exits.success(res);
    }

};