/**
 * OauthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

global.uuidv3 = require('uuid/v3');
global.passValidator = require('password-validator');
global.jwt = require('jsonwebtoken');
global.base64url = require('base64-url');
global.request = require('request');

module.exports = {
  tokenInfo: async (req, res) => {
    return res.ok(req.userInfo);
  },
  logout: async (req, res) => {
    await Tokens.update({
      id: req.userInfo.tokenId
    })
      .set({
        deleted: true
      })
      .intercept(_err => {
        return res.badRequest(
          {},
          {
            message: `There an error on DB`
          }
        );
      });
    return res.ok();
  }
};
